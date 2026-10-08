import { NextRequest, NextResponse } from "next/server";
import { deleteWaitlistEntry, getWaitlistEntries } from "@/lib/waitlist";
import { isAllowedOrigin, isRequestAuthorized } from "@/lib/adminAuth";

/**
 * Escapes fields to prevent CSV formula injection (e.g. cells starting with =, +, -, @)
 */
function sanitizeCsvCell(value: string): string {
  let cleaned = value.replace(/"/g, '""');
  if (/^[=+\-@\t\r]/.test(cleaned)) {
    cleaned = `'${cleaned}`;
  }
  return `"${cleaned}"`;
}

export async function GET(req: NextRequest) {
  let authorized = false;
  try { authorized = await isRequestAuthorized(req); }
  catch { return NextResponse.json({ error: "Authentication service unavailable." }, { status: 503 }); }
  if (!authorized) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid administrator session required." },
      {
        status: 401,
        headers: {
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      }
    );
  }

  let entries;
  try {
    entries = await getWaitlistEntries();
  } catch {
    return NextResponse.json({ error: "Durable storage unavailable." }, { status: 503 });
  }
  const format = req.nextUrl.searchParams.get("format");

  if (format === "csv") {
    // Generate CSV string safely
    const headers = ["ID", "First Name", "Email", "Interest Category", "Consent", "Created At", "Source"];
    const rows = entries.map((e) => [
      sanitizeCsvCell(e.id),
      sanitizeCsvCell(e.first_name || ""),
      sanitizeCsvCell(e.email),
      sanitizeCsvCell(e.interest || "General"),
      e.consent ? "Yes" : "No",
      sanitizeCsvCell(e.created_at),
      sanitizeCsvCell(e.source || "website"),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="bllumo_waitlist.csv"',
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
      },
    });
  }

  // Summary statistics
  const total = entries.length;
  const interestBreakdown: Record<string, number> = {};
  entries.forEach((e) => {
    const key = e.interest || "Unspecified";
    interestBreakdown[key] = (interestBreakdown[key] || 0) + 1;
  });

  return NextResponse.json(
    {
      total,
      interestBreakdown,
      entries: [...entries].reverse(), // most recent first
    },
    {
      headers: {
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
      },
    }
  );
}

export async function DELETE(req: NextRequest) {
  let authorized = false;
  try { authorized = await isRequestAuthorized(req); }
  catch { return NextResponse.json({ error: "Authentication service unavailable." }, { status: 503 }); }
  if (!authorized) return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  if (!isAllowedOrigin(req)) return NextResponse.json({ error: "Forbidden: Request origin not authorized." }, { status: 403 });
  const body = await req.json().catch(() => null);
  const email = body && typeof body === "object" && typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email.trim() : "";
  if (!email) return NextResponse.json({ error: "Email address required." }, { status: 422 });
  try {
    await deleteWaitlistEntry(email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Durable storage unavailable." }, { status: 503 });
  }
}
