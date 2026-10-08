import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import type { WaitlistEntry } from "./waitlist";

// Filesystem storage is development-only. Production always requires Supabase.
export function storageMode(): "supabase" | "development-file" {
  const mode = process.env.BLLUMO_STORAGE || (process.env.NODE_ENV === "production" ? "supabase" : "development-file");
  if (mode === "development-file" && process.env.NODE_ENV !== "production") return mode;
  if (mode !== "supabase" || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error("Durable storage is required");
  const url = new URL(process.env.SUPABASE_URL);
  const local = ["127.0.0.1", "localhost", "[::1]"].includes(url.hostname);
  if (url.username || url.password || url.search || url.hash || (url.protocol !== "https:" && !(local && url.protocol === "http:"))) throw new Error("Invalid database URL");
  return "supabase";
}

export async function rpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  if (storageMode() === "development-file") return localRpc(name, args) as Promise<T>;
  // No anon-key fallback, browser exposure, local mirror, or success on failed writes.
  const response = await fetch(`${process.env.SUPABASE_URL!.replace(/\/$/, "")}/rest/v1/rpc/${name}`, {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10000),
    headers: { "Content-Type": "application/json", apikey: process.env.SUPABASE_SERVICE_KEY!, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY!}` },
    body: JSON.stringify(args),
  });
  if (!response.ok) throw new Error("Durable storage unavailable");
  return response.json();
}

interface LocalState {
  version: 1;
  entries: (WaitlistEntry & { email_hash: string })[];
  suppressed: string[];
  sessions: Record<string, string>;
  rates: Record<string, { hits: number; expires: number }>;
}

async function localRpc(name: string, args: Record<string, unknown>): Promise<unknown> {
  // @turbopackIgnore: development-only filesystem path; production selects Supabase above.
  const directory = path.resolve(/* turbopackIgnore: true */ (process.env.BLLUMO_DATA_DIR || path.join(process.cwd(), "data", "development")));
  await fs.mkdir(directory, { recursive: true, mode: 0o700 });
  const file = path.join(directory, "state.json");
  const lockPath = `${file}.lock`;
  let lock;
  for (let attempt = 0; attempt < 100; attempt++) {
    try { lock = await fs.open(lockPath, "wx", 0o600); break; }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
  if (!lock) throw new Error("Development storage locked; check for interrupted writer");
  const temporary = `${file}.${crypto.randomUUID()}.tmp`;
  try {
    let state: LocalState;
    try { state = JSON.parse(await fs.readFile(file, "utf8")); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      state = { version: 1, entries: [], suppressed: [], sessions: {}, rates: {} };
    }
    if (state.version !== 1 || !Array.isArray(state.entries) || !Array.isArray(state.suppressed) || !state.sessions || !state.rates) throw new Error("Invalid development store");
    const now = Date.now();
    for (const [key, expiry] of Object.entries(state.sessions)) if (Date.parse(expiry) <= now) delete state.sessions[key];
    for (const [key, rate] of Object.entries(state.rates)) if (rate.expires <= now) delete state.rates[key];
    let result: unknown;
    const hash = String(args.p_email_hash || "");
    switch (name) {
      case "bllumo_register": {
        const entry = args.p_entry as WaitlistEntry;
        if (state.suppressed.includes(hash)) result = "suppressed";
        else if (state.entries.some(e => e.email === entry.email)) result = "duplicate";
        else { state.entries.push({ ...entry, email_hash: hash }); result = "registered"; }
        break;
      }
      case "bllumo_list":
        result = state.entries.filter(e => !state.suppressed.includes(e.email_hash) && (!args.p_after || e.id > String(args.p_after)))
          .sort((a, b) => a.id.localeCompare(b.id)).slice(0, 500).map(e => {
            const entry = { ...e } as Partial<typeof e>; delete entry.email_hash; return entry;
          }); break;
      case "bllumo_delete":
        if (!state.suppressed.includes(hash)) state.suppressed.push(hash);
        state.entries = state.entries.filter(e => e.email_hash !== hash);
        result = true; break;
      case "bllumo_session_create": state.sessions[String(args.p_token_hash)] = String(args.p_expires); result = true; break;
      case "bllumo_session_check": result = Boolean(state.sessions[String(args.p_token_hash)]); break;
      case "bllumo_session_delete": delete state.sessions[String(args.p_token_hash)]; result = true; break;
      case "bllumo_rate_limit": {
        const key = String(args.p_key);
        const rate = state.rates[key] || { hits: 0, expires: now + Number(args.p_window) * 1000 };
        rate.hits++;
        state.rates[key] = rate;
        result = rate.hits <= Number(args.p_limit) ? 0 : Math.max(1, Math.ceil((rate.expires - now) / 1000));
        break;
      }
      default: throw new Error("Unknown storage operation");
    }
    const handle = await fs.open(temporary, "wx", 0o600);
    try { await handle.writeFile(JSON.stringify(state)); await handle.sync(); } finally { await handle.close(); }
    await fs.rename(temporary, file);
    return result;
  } finally {
    await fs.rm(temporary, { force: true });
    await lock.close();
    await fs.unlink(lockPath);
  }
}
