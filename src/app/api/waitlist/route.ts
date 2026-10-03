import { NextRequest, NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/waitlist";

// Strict email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const { first_name, email, interest, consent, source, honeypot } = body;

    // Honeypot spam protection: if bot filled this hidden field, return silent success
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "You're on the list. Thanks for joining Bllumo.",
      });
    }

    // Validate first_name
    if (!first_name || typeof first_name !== "string" || first_name.trim().length < 1) {
      return NextResponse.json(
        { error: "Please enter your first name." },
        { status: 422 }
      );
    }

    if (first_name.trim().length > 80) {
      return NextResponse.json(
        { error: "Name is too long. Please keep it under 80 characters." },
        { status: 422 }
      );
    }

    // Validate email
    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 422 }
      );
    }

    // Validate consent
    if (consent !== true) {
      return NextResponse.json(
        { error: "You must agree to receive product and launch updates to join the waitlist." },
        { status: 422 }
      );
    }

    const result = await addWaitlistEntry({
      first_name: first_name.trim(),
      email: email.trim(),
      interest: typeof interest === "string" ? interest.trim() : undefined,
      consent: true,
      source: typeof source === "string" ? source.trim() : "website",
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to record waitlist entry" },
        { status: 500 }
      );
    }

    if (result.duplicate) {
      return NextResponse.json({
        success: true,
        duplicate: true,
        message:
          "You're already on the list! We have your email recorded and will keep you updated as we move toward launch.",
      });
    }

    return NextResponse.json({
      success: true,
      duplicate: false,
      message:
        "You're on the list. Thanks for joining Bllumo. We'll keep you updated as we move toward launch.",
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
