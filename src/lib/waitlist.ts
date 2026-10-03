import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface WaitlistEntry {
  id: string;
  first_name: string;
  email: string;
  interest?: string;
  consent: boolean;
  created_at: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");

// Ensure data folder and file exists
function ensureFileExists(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error creating waitlist data directory or file:", error);
  }
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  try {
    ensureFileExists();
    const rawData = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(rawData) as WaitlistEntry[];
  } catch (error) {
    console.error("Error reading waitlist file:", error);
    return [];
  }
}

export async function addWaitlistEntry(params: {
  first_name: string;
  email: string;
  interest?: string;
  consent: boolean;
  source?: string;
}): Promise<{ success: boolean; duplicate?: boolean; entry?: WaitlistEntry; error?: string }> {
  try {
    ensureFileExists();

    const normalizedEmail = params.email.trim().toLowerCase();
    const entries = await getWaitlistEntries();

    // Check for existing duplicate
    const existing = entries.find((e) => e.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return {
        success: true,
        duplicate: true,
        entry: existing,
      };
    }

    const newEntry: WaitlistEntry = {
      id: crypto.randomUUID(),
      first_name: params.first_name.trim(),
      email: normalizedEmail,
      interest: params.interest?.trim() || "General Access",
      consent: Boolean(params.consent),
      created_at: new Date().toISOString(),
      source: params.source || "waitlist_page",
    };

    // If Supabase is configured via environment variables, attempt insert
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify(newEntry),
        });
        if (!response.ok) {
          console.warn("Supabase insert responded with error:", await response.text());
        }
      } catch (err) {
        console.warn("Could not insert to Supabase, continuing with local store:", err);
      }
    }

    // Save locally
    entries.push(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    return {
      success: true,
      duplicate: false,
      entry: newEntry,
    };
  } catch (error) {
    console.error("Error saving waitlist entry:", error);
    return {
      success: false,
      error: "Unable to process waitlist request. Please try again.",
    };
  }
}
