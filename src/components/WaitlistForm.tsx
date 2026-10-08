"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";

const INTEREST_OPTIONS = [
  "Focus & deep work routines",
  "Daily habit formation & consistency",
  "Adaptive fitness & movement pacing",
  "Personal projects & creative roadmaps",
  "Skill acquisition & structured learning",
  "General interest in personal AI",
];

export function WaitlistForm({ enabled }: { enabled: boolean }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; consent?: string; age?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    const errors: { email?: string; consent?: string; age?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!consent) {
      errors.consent = "Please confirm consent to receive email updates before joining.";
    }

    if (!ageConfirmed) {
      errors.age = "Please confirm that you are at least 18 years old.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim() || undefined,
          email: trimmedEmail,
          interest: interest || "General Interest",
          consent: true,
          age_confirmed: true,
          source: "homepage",
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to join the waitlist at this time. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setGeneralError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 relative scroll-mt-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="surface-card rounded-2xl p-6 sm:p-12 border border-white/[0.08] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
              Early Access Waitlist
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Get Bllumo development and launch updates.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg mx-auto">
              Join the waitlist to follow our progress and hear about possible early-access opportunities. Joining is free. It does not guarantee an invitation or a place in a release.
            </p>
          </div>

          {/* Submission Outcome / Form */}
          {!enabled ? (
            <div role="status" className="text-center py-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">Registration is temporarily closed.</h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                We are verifying storage, eligibility, privacy operations, and contact delivery before accepting registrations.
              </p>
            </div>
          ) : submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="text-center py-6 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  You&apos;re on the waitlist.
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest{firstName ? `, ${firstName}` : ""}. We have recorded your registration and will send updates as developmental milestones and alpha testing cohorts open.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFirstName("");
                    setEmail("");
                    setInterest("");
                    setConsent(false);
                    setAgeConfirmed(false);
                    setFieldErrors({});
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Register another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {generalError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{generalError}</span>
                </div>
              )}

              {/* Bot Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  aria-hidden="true"
                />
              </div>

              {/* First Name (Optional) & Email (Required) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="waitlist_first_name"
                    className="text-xs text-neutral-300 font-mono block font-medium"
                  >
                    First Name <span className="text-neutral-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="waitlist_first_name"
                    type="text"
                    placeholder="e.g. Alex"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#060709] border border-white/[0.1] text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="waitlist_email"
                    className="text-xs text-neutral-300 font-mono block font-medium"
                  >
                    Email Address <span className="text-indigo-400">*</span>
                  </label>
                  <input
                    id="waitlist_email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={fieldErrors.email ? "waitlist_email_error" : undefined}
                    placeholder="name@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-[#060709] border text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none transition-colors ${
                      fieldErrors.email
                        ? "border-rose-500/80 focus:ring-1 focus:ring-rose-500"
                        : "border-white/[0.1] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p
                      id="waitlist_email_error"
                      role="alert"
                      className="text-[11px] text-rose-300 pt-0.5"
                    >
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Interest Selector (Optional) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="waitlist_interest"
                  className="text-xs text-neutral-300 font-mono block font-medium"
                >
                  Product Interest <span className="text-neutral-500 font-normal">(Optional)</span>
                </label>
                <select
                  id="waitlist_interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#060709] border border-white/[0.1] text-white text-base sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                >
                  <option value="" className="bg-[#0B0D14] text-neutral-400">
                    Select an area of interest...
                  </option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B0D14] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Explicit Unchecked Consent Checkbox */}
              <div className="pt-2">
                <div className="flex items-start gap-3">
                  <input
                    id="waitlist_consent"
                    type="checkbox"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.consent)}
                    aria-describedby={fieldErrors.consent ? "waitlist_consent_error" : undefined}
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (fieldErrors.consent) {
                        setFieldErrors((prev) => ({ ...prev, consent: undefined }));
                      }
                    }}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#060709] text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
                  />
                  <label
                    htmlFor="waitlist_consent"
                    className="text-xs text-neutral-300 leading-relaxed cursor-pointer select-none"
                  >
                    I want to receive Bllumo development updates and early-access invitations by email. I can unsubscribe at any time. <span className="text-indigo-400">*</span>
                  </label>
                </div>
                {fieldErrors.consent && (
                  <p
                    id="waitlist_consent_error"
                    role="alert"
                    className="text-[11px] text-rose-300 pt-1 pl-7"
                  >
                    {fieldErrors.consent}
                  </p>
                )}
              </div>

              <div className="pt-1">
                <div className="flex items-start gap-3">
                  <input
                    id="waitlist_age"
                    type="checkbox"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.age)}
                    aria-describedby={fieldErrors.age ? "waitlist_age_error" : undefined}
                    checked={ageConfirmed}
                    onChange={(e) => {
                      setAgeConfirmed(e.target.checked);
                      if (fieldErrors.age) setFieldErrors((prev) => ({ ...prev, age: undefined }));
                    }}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#060709] text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
                  />
                  <label htmlFor="waitlist_age" className="text-xs text-neutral-300 leading-relaxed cursor-pointer select-none">
                    I confirm that I am at least 18 years old. <span className="text-indigo-400">*</span>
                  </label>
                </div>
                {fieldErrors.age && <p id="waitlist_age_error" role="alert" className="text-[11px] text-rose-300 pt-1 pl-7">{fieldErrors.age}</p>}
              </div>

              {/* Legal Notice */}
              <p className="text-xs text-neutral-400 leading-normal pt-1">
                By submitting, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-neutral-300 hover:text-white underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-neutral-300 hover:text-white underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Terms of Service
                </Link>.
              </p>

              {/* Submit Button (Comfortable touch target min 44px) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full min-h-[44px] py-3 px-5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Join the waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-xs text-neutral-400 font-mono">
                No passwords, credit cards, or sensitive personal data collected.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
