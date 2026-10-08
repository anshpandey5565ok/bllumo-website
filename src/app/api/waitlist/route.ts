import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/waitlist";
import { consumeRateLimit, isAllowedOrigin } from "@/lib/adminAuth";
import { publicReleasePolicy } from "@/lib/releasePolicy";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) return NextResponse.json({ error: "Forbidden: Request origin not authorized." }, { status: 403 });
    const retryAfter = await consumeRateLimit(req, "waitlist");
    if (retryAfter > 0) return NextResponse.json({ error: "Too many submission attempts. Please try again later." }, { status: 429, headers: { "Retry-After": String(retryAfter) } });
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    const { first_name, email, interest, consent, age_confirmed, source, honeypot } = body as Record<string, unknown>;
    if (honeypot && typeof honeypot === "string" && honeypot.trim()) return NextResponse.json({ success: true, message: "Thank you for your interest." });
    if (!publicReleasePolicy().enabled) return NextResponse.json({ error: "Waitlist registration is temporarily unavailable while storage, eligibility, and privacy operations are being verified." }, { status: 503 });
    const name = typeof first_name === "string" ? first_name.trim() : "";
    if (name.length > 80) return NextResponse.json({ error: "Name is too long." }, { status: 422 });
    if (typeof email !== "string" || email.trim().length > 254 || !EMAIL_REGEX.test(email.trim())) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 422 });
    if (consent !== true) return NextResponse.json({ error: "Please confirm consent to receive Bllumo updates." }, { status: 422 });
    if (age_confirmed !== true) return NextResponse.json({ error: "You must confirm that you are at least 18 years old." }, { status: 422 });
    await addWaitlistEntry({ first_name: name, email: email.trim(), interest: typeof interest === "string" ? interest.trim() : undefined, consent: true, age_confirmed: true, source: typeof source === "string" ? source.trim() : "website" });
    return NextResponse.json({ success: true, message: "Thank you for joining the waitlist! We have recorded your request." });
  } catch {
    console.error("Waitlist API error");
    return NextResponse.json({ error: "Unable to save your waitlist registration. Please try again." }, { status: 503 });
  }
}
