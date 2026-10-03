import { NextRequest, NextResponse } from "next/server";
import { getWaitlistEntries } from "@/lib/waitlist";

const DEFAULT_DEV_KEY = "bllumo-founder-2026";

function isAuthorized(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY || DEFAULT_DEV_KEY;
  const authHeader = req.headers.get("authorization");
  const customHeader = req.headers.get("x-admin-key");
  const queryKey = req.nextUrl.searchParams.get("key");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "").trim();
    if (token === adminKey) return true;
  }

  if (customHeader && customHeader.trim() === adminKey) {
    return true;
  }

  if (queryKey && queryKey.trim() === adminKey) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: "Unauthorized access. Valid admin key required." },
      { status: 401 }
    );
  }

  const entries = await getWaitlistEntries();
  const format = req.nextUrl.searchParams.get("format");

  if (format === "csv") {
    // Generate CSV string
    const headers = ["ID", "First Name", "Email", "Interest Category", "Consent", "Created At", "Source"];
    const rows = entries.map((e) => [
      `"${e.id}"`,
      `"${e.first_name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${(e.interest || "General").replace(/"/g, '""')}"`,
      e.consent ? "Yes" : "No",
      `"${e.created_at}"`,
      `"${(e.source || "website").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="bllumo_waitlist.csv"',
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

  return NextResponse.json({
    total,
    interestBreakdown,
    entries: entries.reverse(), // most recent first
  });
}
