import { NextRequest, NextResponse } from "next/server";
import { consumeRateLimit, isAllowedOrigin, verifyAdminPasskey, createSessionToken, isRequestAuthorized, revokeSession, authConfigured, SESSION_COOKIE_NAME, SESSION_DURATION_SECONDS } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) return NextResponse.json({ error: "Forbidden: Request origin not authorized." }, { status: 403 });
    if (!authConfigured()) return NextResponse.json({ error: "Administrator authentication is temporarily unavailable." }, { status: 503 });
    const retryAfter = await consumeRateLimit(req, "login");
    if (retryAfter > 0) return NextResponse.json({ error: `Too many failed login attempts. Please try again in ${retryAfter} seconds.` }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object" || typeof (body as { passkey?: unknown }).passkey !== "string") return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    if (!verifyAdminPasskey((body as { passkey: string }).passkey)) return NextResponse.json({ error: "Invalid administrator credentials." }, { status: 401 });
    const token = await createSessionToken();
    const response = NextResponse.json({ success: true, message: "Authentication successful." });
    response.cookies.set({ name: SESSION_COOKIE_NAME, value: token, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_DURATION_SECONDS });
    return response;
  } catch {
    console.error("Admin authentication error");
    return NextResponse.json({ error: "Authentication service unavailable." }, { status: 503 });
  }
}

export async function GET(req: NextRequest) {
  try { return NextResponse.json({ authenticated: await isRequestAuthorized(req) }); }
  catch { return NextResponse.json({ authenticated: false }); }
}

export async function DELETE(req: NextRequest) {
  if (!isAllowedOrigin(req)) return NextResponse.json({ error: "Forbidden: Request origin not authorized." }, { status: 403 });
  try { await revokeSession(req); }
  catch { return NextResponse.json({ error: "Sign-out could not be persisted." }, { status: 503 }); }
  const response = NextResponse.json({ success: true, message: "Signed out successfully." });
  response.cookies.set({ name: SESSION_COOKIE_NAME, value: "", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
