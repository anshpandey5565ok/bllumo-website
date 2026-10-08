/* eslint-disable no-console */
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn, execFileSync } = require("node:child_process");

const root = path.resolve(__dirname, "..");
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "bllumo-readiness-"));
const secrets = {
  ADMIN_SECRET_KEY: "a".repeat(64),
  ADMIN_SESSION_SECRET: "b".repeat(64),
  SUPPRESSION_SECRET: "c".repeat(64),
  RATE_LIMIT_SECRET: "d".repeat(64),
};
const baseEnv = {
  ...process.env, ...secrets, NODE_ENV: "development", BLLUMO_STORAGE: "development-file",
  BLLUMO_DATA_DIR: dataDir, WAITLIST_ENABLED: "true", AGE_POLICY: "adults-18-plus",
  LEGAL_REVIEW_APPROVED: "true", PRIVACY_OPERATIONS_APPROVED: "true",
  CONTACT_INBOX_VERIFIED: "true", PRIVACY_INBOX_VERIFIED: "true", PUBLIC_OPERATOR_NAME: "test",
  PUBLIC_DATABASE_REGION: "test", PUBLIC_BACKUP_RETENTION: "test", PUBLIC_WAITLIST_RETENTION: "test",
  VERCEL: "1", NEXT_TELEMETRY_DISABLED: "1",
};
const children = [];
const logs = new Map();

function start(port, extra = {}) {
  const child = spawn(process.platform === "win32" ? "cmd.exe" : "npm", process.platform === "win32" ? ["/d", "/s", "/c", `npm run dev -- --port ${port}`] : ["run", "dev", "--", "--port", String(port)], {
    cwd: root, env: { ...baseEnv, ...extra, NEXT_DIST_DIR: `.next-readiness-${port}`, PORT: String(port), APP_ORIGIN: `http://localhost:${port}` },
    stdio: ["ignore", "pipe", "pipe"], windowsHide: true,
  });
  logs.set(child, "");
  child.stdout.on("data", chunk => logs.set(child, logs.get(child) + chunk.toString()));
  child.stderr.on("data", chunk => logs.set(child, logs.get(child) + chunk.toString()));
  children.push(child);
  return child;
}
async function stop(child) {
  if (!child || child.killed) return;
  if (process.platform === "win32") {
    try { execFileSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" }); } catch {}
  } else child.kill("SIGTERM");
  await new Promise(resolve => setTimeout(resolve, 350));
}
async function waitFor(port) {
  for (let i = 0; i < 80; i++) {
    try { const r = await fetch(`http://localhost:${port}/`); if (r.status < 500) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`server ${port} did not start`);
}
async function request(port, route, options = {}) {
  const response = await fetch(`http://localhost:${port}${route}`, options);
  return { response, text: await response.text() };
}
function jsonOptions(method, body, origin, ip) {
  return { method, headers: { "Content-Type": "application/json", Origin: origin, "x-vercel-forwarded-for": ip }, body: JSON.stringify(body) };
}
function cookieFrom(response) {
  const value = typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie()[0] : response.headers.get("set-cookie");
  return value ? value.split(";", 1)[0] : "";
}
function assert(condition, message) { if (!condition) throw new Error(message); }
function expiredToken() {
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ iat: now - 7201, exp: now - 1, jti: "e".repeat(64) })).toString("base64url");
  return `${payload}.${crypto.createHmac("sha256", secrets.ADMIN_SESSION_SECRET).update(payload).digest("base64url")}`;
}

(async () => {
  let a, b, c, d;
  try {
    a = start(3101); b = start(3102);
    await Promise.all([waitFor(3101), waitFor(3102)]);
    const batch = await Promise.all(Array.from({ length: 10 }, (_, i) => request(3101 + (i % 2), "/api/waitlist", jsonOptions("POST", {
      first_name: `Test ${i}`, email: `readiness-${Date.now()}-${i}@example.test`, interest: "test", consent: true, age_confirmed: true, source: "isolated-test",
    }, `http://localhost:${3101 + (i % 2)}`, `198.51.100.${i + 1}`))));
    assert(batch.every(item => item.response.status === 200), `concurrent submissions did not all succeed (${batch.map(item => item.response.status).join(",")})\n${logs.get(a)}\n${logs.get(b)}`);

    const duplicateEmail = `duplicate-${Date.now()}@example.test`;
    const first = await request(3101, "/api/waitlist", jsonOptions("POST", { email: duplicateEmail, consent: true, age_confirmed: true }, "http://localhost:3101", "198.51.100.200"));
    const second = await request(3102, "/api/waitlist", jsonOptions("POST", { email: duplicateEmail, consent: true, age_confirmed: true }, "http://localhost:3102", "198.51.100.201"));
    assert(first.response.status === 200 && second.response.status === 200, "duplicate requests did not return stable success responses");

    const login = await request(3101, "/api/admin/auth", jsonOptions("POST", { passkey: secrets.ADMIN_SECRET_KEY }, "http://localhost:3101", "198.51.100.210"));
    assert(login.response.status === 200, "admin login failed");
    const cookie = cookieFrom(login.response); assert(cookie, "session cookie was not issued");
    const authHeader = { Cookie: cookie };
    const listing = await request(3101, "/api/admin/waitlist", { headers: authHeader });
    const listingData = JSON.parse(listing.text);
    assert(listing.response.status === 200 && listingData.total === 11, "listing does not match concurrent and duplicate writes");
    const csv = await request(3101, "/api/admin/waitlist?format=csv", { headers: authHeader });
    assert(csv.response.status === 200 && csv.text.includes(duplicateEmail), "export does not match listing");
    const tampered = cookie.replace(/.$/, "x");
    assert((await request(3101, "/api/admin/waitlist", { headers: { Cookie: tampered } })).response.status === 401, "tampered cookie accepted");
    assert((await request(3101, "/api/admin/waitlist", { headers: { Cookie: `bllumo_admin_session=${expiredToken()}` } })).response.status === 401, "expired cookie accepted");
    assert((await request(3101, "/api/admin/auth", jsonOptions("POST", { passkey: secrets.ADMIN_SECRET_KEY }, "https://evil.example", "198.51.100.220"))).response.status === 403, "cross-origin login accepted");

    await stop(a); a = start(3101); await waitFor(3101);
    const relogin = await request(3101, "/api/admin/auth", jsonOptions("POST", { passkey: secrets.ADMIN_SECRET_KEY }, "http://localhost:3101", "198.51.100.211"));
    const replayCookie = cookieFrom(relogin.response); assert(replayCookie, "restart login failed");
    assert((await request(3101, "/api/admin/waitlist", { headers: { Cookie: replayCookie } })).response.status === 200, "entries did not survive restart");
    const logout = await request(3101, "/api/admin/auth", { method: "DELETE", headers: { ...authHeader, Origin: "http://localhost:3101" } });
    assert(logout.response.status === 200, "logout failed");
    assert((await request(3101, "/api/admin/waitlist", { headers: authHeader })).response.status === 401, "original cookie remained valid after logout");
    await stop(b); b = start(3102); await waitFor(3102);
    assert((await request(3102, "/api/admin/waitlist", { headers: { Cookie: replayCookie } })).response.status === 200, "session did not work across instances");
    const deletion = await request(3102, "/api/admin/waitlist", { ...jsonOptions("DELETE", { email: duplicateEmail }, "http://localhost:3102", "198.51.100.230"), headers: { ...jsonOptions("DELETE", { email: duplicateEmail }, "http://localhost:3102", "198.51.100.230").headers, Cookie: replayCookie } });
    assert(deletion.response.status === 200, "deletion failed");
    const afterDelete = await request(3102, "/api/admin/waitlist", { headers: { Cookie: replayCookie } });
    assert(!afterDelete.text.includes(duplicateEmail), "deleted registration remains in listing");
    const afterDeleteCsv = await request(3102, "/api/admin/waitlist?format=csv", { headers: { Cookie: replayCookie } });
    assert(!afterDeleteCsv.text.includes(duplicateEmail), "deleted registration remains in export");
    const suppressed = await request(3101, "/api/waitlist", jsonOptions("POST", { email: duplicateEmail, consent: true, age_confirmed: true }, "http://localhost:3101", "198.51.100.231"));
    assert(suppressed.response.status === 200, "suppressed duplicate did not receive stable response");

    const beforeFailure = JSON.parse((await request(3101, "/api/admin/waitlist", { headers: { Cookie: replayCookie } })).text).total;
    c = start(3103, { BLLUMO_STORAGE: "supabase", SUPABASE_URL: "https://invalid.invalid", SUPABASE_SERVICE_KEY: "test-key", APP_ORIGIN: "http://localhost:3103" });
    await waitFor(3103);
    const failure = await request(3103, "/api/waitlist", jsonOptions("POST", { email: `failure-${Date.now()}@example.test`, consent: true, age_confirmed: true }, "http://localhost:3103", "198.51.100.240"));
    assert(failure.response.status === 503, "database failure returned success");
    const afterFailure = JSON.parse((await request(3101, "/api/admin/waitlist", { headers: { Cookie: replayCookie } })).text).total;
    assert(afterFailure === beforeFailure, "database failure changed local data");
    d = start(3104, { ADMIN_SECRET_KEY: "", APP_ORIGIN: "http://localhost:3104" }); await waitFor(3104);
    const missing = await request(3104, "/api/admin/auth", jsonOptions("POST", { passkey: "anything" }, "http://localhost:3104", "198.51.100.250"));
    assert(missing.response.status === 503, "missing production auth secret did not fail closed");

    const rateStatuses = [];
    for (let i = 0; i < 6; i++) rateStatuses.push((await request(3101 + (i % 2), "/api/admin/auth", jsonOptions("POST", { passkey: "wrong" }, `http://localhost:${3101 + (i % 2)}`, "198.51.100.251"))).response.status);
    assert(rateStatuses.slice(0, 5).every(status => status === 401) && rateStatuses[5] === 429, "rate limiting did not share state across instances");
    assert(fs.existsSync(path.join(dataDir, "state.json")), "isolated test store was not created");
    assert(fs.readFileSync(path.join(root, "src/app/api/admin/auth/route.ts"), "utf8").includes('secure: process.env.NODE_ENV === "production"'), "secure cookie flag is not production-gated");
    console.log("PASS: restart, concurrent instances, duplicate protection, database failure, listing/export/deletion consistency, revocation replay, tampering, expiry, origin protection, missing-secret failure, secure-cookie code check, and shared rate limiting");
  } finally {
    await Promise.all(children.map(stop));
    [3101, 3102, 3103, 3104].forEach(port => fs.rmSync(path.join(root, `.next-readiness-${port}`), { recursive: true, force: true }));
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
})().catch(error => { console.error(`FAIL: ${error.message}`); process.exitCode = 1; });
