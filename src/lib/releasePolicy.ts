import "server-only";

// Approval flags record completed owner work; they do not perform or replace it.
export function publicReleasePolicy() {
  const reviewed = process.env.AGE_POLICY === "adults-18-plus" && process.env.LEGAL_REVIEW_APPROVED === "true";
  const inboxesVerified = process.env.CONTACT_INBOX_VERIFIED === "true" && process.env.PRIVACY_INBOX_VERIFIED === "true";
  const operator = process.env.PUBLIC_OPERATOR_NAME?.trim() || "";
  const databaseRegion = process.env.PUBLIC_DATABASE_REGION?.trim() || "";
  const backupRetention = process.env.PUBLIC_BACKUP_RETENTION?.trim() || "";
  const retention = process.env.PUBLIC_WAITLIST_RETENTION?.trim() || "";
  const ready = reviewed && inboxesVerified && Boolean(operator && databaseRegion && backupRetention && retention)
    && process.env.PRIVACY_OPERATIONS_APPROVED === "true";
  return { enabled: process.env.WAITLIST_ENABLED === "true" && ready, reviewed, inboxesVerified, operator, databaseRegion, backupRetention, retention };
}

export const eligibilityPending = "Waitlist registration is currently closed. Eligibility details will be published before registration opens.";
export const adultEligibility = "You must be at least 18 years old to join the waitlist. We do not offer registration for children or parental-consent registration.";
