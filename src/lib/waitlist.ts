import "server-only";
import crypto from "node:crypto";
import { rpc, storageMode } from "./storage";

export interface WaitlistEntry {
  id: string;
  first_name?: string;
  email: string;
  interest?: string;
  consent: boolean;
  consent_timestamp: string;
  consent_version: string;
  created_at: string;
  source: string;
  age_confirmed: boolean;
}

export function emailHash(email: string): string {
  const key = process.env.SUPPRESSION_SECRET;
  if (!key || key.length < 32) throw new Error("Suppression configuration unavailable");
  return crypto.createHmac("sha256", key).update(email.trim().toLowerCase()).digest("hex");
}

export async function getWaitlistEntries(): Promise<WaitlistEntry[]> {
  const entries: WaitlistEntry[] = [];
  let after: string | null = null;
  for (;;) {
    const batch: WaitlistEntry[] = await rpc<WaitlistEntry[]>("bllumo_list", { p_after: after });
    if (!Array.isArray(batch)) throw new Error("Invalid storage response");
    entries.push(...batch);
    if (batch.length === 0) break;
    const next: string = batch[batch.length - 1].id;
    if (next === after) throw new Error("Invalid storage cursor");
    after = next;
  }
  return entries.sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));
}

export async function addWaitlistEntry(params: {
  first_name?: string; email: string; interest?: string; consent: boolean; source?: string;
  age_confirmed: boolean;
}): Promise<void> {
  storageMode();
  const email = params.email.trim().toLowerCase();
  const now = new Date().toISOString();
  const outcome = await rpc<string>("bllumo_register", {
    p_entry: {
      id: crypto.randomUUID(), email, first_name: params.first_name || "",
      interest: params.interest || "General Interest", consent: params.consent,
      consent_timestamp: now, consent_version: "adult_waitlist_2026_10",
      created_at: now, source: params.source || "website", age_confirmed: params.age_confirmed,
    },
    p_email_hash: emailHash(email),
  });
  if (!["registered", "duplicate", "suppressed"].includes(outcome)) throw new Error("Invalid storage acknowledgement");
}

export async function deleteWaitlistEntry(email: string): Promise<void> {
  if (await rpc<boolean>("bllumo_delete", { p_email_hash: emailHash(email) }) !== true) throw new Error("Deletion not acknowledged");
}
