import "server-only";
import { NextRequest } from "next/server";
import crypto from "node:crypto";
import { isIP } from "node:net";
import { rpc } from "./storage";

export const SESSION_COOKIE_NAME = "bllumo_admin_session";
export const SESSION_DURATION_SECONDS = 7200;

export function authConfigured(): boolean {
  return [process.env.ADMIN_SECRET_KEY, process.env.ADMIN_SESSION_SECRET].every(s => Boolean(s && s.trim().length >= 32));
}

export function getClientIp(req: NextRequest): string {
  // Only trust the header Vercel overwrites, when running on Vercel.
  const value = process.env.VERCEL === "1" ? req.headers.get("x-vercel-forwarded-for")?.trim() : undefined;
  return value && isIP(value) ? value : "shared-network";
}

export async function consumeRateLimit(req: NextRequest, scope: "login" | "waitlist"): Promise<number> {
  const key = process.env.RATE_LIMIT_SECRET;
  if (!key || key.length < 32) throw new Error("Rate limit configuration unavailable");
  const digest = crypto.createHmac("sha256", key).update(getClientIp(req)).digest("hex");
  const result = await rpc<number>("bllumo_rate_limit", { p_key: `${scope}:${digest}`, p_limit: 5, p_window: scope === "login" ? 900 : 60 });
  if (!Number.isInteger(result) || result < 0) throw new Error("Invalid rate limit response");
  return result;
}

export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const allowed = process.env.APP_ORIGIN || (process.env.NODE_ENV !== "production" ? req.nextUrl.origin : "");
    return Boolean(allowed) && new URL(origin).origin === new URL(allowed).origin && origin === new URL(origin).origin;
  } catch { return false; }
}

export function verifyAdminPasskey(passkey: string): boolean {
  if (!authConfigured() || typeof passkey !== "string") return false;
  return crypto.timingSafeEqual(crypto.createHash("sha256").update(process.env.ADMIN_SECRET_KEY!).digest(), crypto.createHash("sha256").update(passkey).digest());
}

const tokenHash = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

export async function createSessionToken(): Promise<string> {
  if (!authConfigured()) throw new Error("Authentication unavailable");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + SESSION_DURATION_SECONDS, jti: crypto.randomBytes(32).toString("hex") })).toString("base64url");
  const token = `${payload}.${crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(payload).digest("base64url")}`;
  if (await rpc<boolean>("bllumo_session_create", { p_token_hash: tokenHash(token), p_expires: new Date((now + SESSION_DURATION_SECONDS) * 1000).toISOString() }) !== true) throw new Error("Session not persisted");
  return token;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  if (!authConfigured() || !token || token.length > 1024) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, signature] = parts;
  const expected = crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET!).update(payload).digest("base64url");
  if (Buffer.byteLength(signature) !== Buffer.byteLength(expected) || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const now = Math.floor(Date.now() / 1000);
    if (!Number.isInteger(data.exp) || !Number.isInteger(data.iat) || data.exp <= now || data.iat > now || data.exp - data.iat !== SESSION_DURATION_SECONDS || !/^[a-f0-9]{64}$/.test(data.jti)) return false;
  } catch { return false; }
  return await rpc<boolean>("bllumo_session_check", { p_token_hash: tokenHash(token) }) === true;
}

export function requestToken(req: NextRequest): string {
  return req.cookies.get(SESSION_COOKIE_NAME)?.value || req.headers.get("authorization")?.match(/^Bearer ([^\s]+)$/)?.[1] || "";
}

export async function isRequestAuthorized(req: NextRequest): Promise<boolean> {
  return verifySessionToken(requestToken(req));
}

export async function revokeSession(req: NextRequest): Promise<void> {
  if (await rpc<boolean>("bllumo_session_delete", { p_token_hash: tokenHash(requestToken(req)) }) !== true) throw new Error("Revocation not persisted");
}
