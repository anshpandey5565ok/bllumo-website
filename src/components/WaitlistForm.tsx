"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from "lucide-react";

const INTEREST_OPTIONS = [
  "Health & wellness",
  "Fitness",
  "Productivity",
  "Learning",
  "Personal organization",
  "Habits",
  "Money management",
  "Something else",
];

export function WaitlistForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please agree to receive product and launch updates.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          interest: interest || "General Interest",
          consent: true,
          source: "homepage",
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to join the waitlist. Please try again.");
      }

      setIsDuplicate(Boolean(data.duplicate));
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="py-20 md:py-28 relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="surface-card rounded-2xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
              Early Access
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Help shape what&apos;s next.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
              Bllumo is currently under development. Join the waitlist to receive product updates, early-access opportunities, and launch information.
            </p>
          </div>

          {/* Form / Success State */}
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.1] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  You&apos;re on the list.
                </h3>
                <p className="text-xs text-neutral-300">
                  Thanks for joining Bllumo, <span className="text-white font-medium">{firstName}</span>. We&apos;ll keep you updated as we move toward launch.
                </p>
                {isDuplicate && (
                  <p className="text-xs text-neutral-400 bg-white/[0.02] border border-white/[0.06] rounded-lg p-2.5 max-w-sm mx-auto">
                    Note: Your email was already registered. We have refreshed your waitlist reservation.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFirstName("");
                  setEmail("");
                  setInterest("");
                  setConsent(false);
                }}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 pt-2"
              >
                Register another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
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
                />
              </div>

              {/* First Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="first_name" className="text-xs text-neutral-400 font-mono">
                    First Name *
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    required
                    placeholder="Alex"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#060709] border border-white/[0.08] text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email_address" className="text-xs text-neutral-400 font-mono">
                    Email Address *
                  </label>
                  <input
                    id="email_address"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#060709] border border-white/[0.08] text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
              </div>

              {/* Interest Selector */}
              <div className="space-y-1">
                <label htmlFor="interest" className="text-xs text-neutral-400 font-mono">
                  Primary Interest (Optional)
                </label>
                <select
                  id="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#060709] border border-white/[0.08] text-white text-xs focus:outline-none focus:border-white/30 transition-colors"
                >
                  <option value="" className="bg-[#0B0D14] text-neutral-400">
                    Select what you&apos;d like Bllumo to help with...
                  </option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0B0D14] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-[#060709] text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-[11px] text-neutral-400 leading-tight">
                    I agree to receive Bllumo product and launch updates. I understand that I can unsubscribe at any time. *
                  </span>
                </label>
              </div>

              {/* Legal Notice */}
              <p className="text-[10px] text-neutral-500 leading-normal">
                By joining, you agree to our{" "}
                <Link href="/privacy" className="text-neutral-400 hover:text-white underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-neutral-400 hover:text-white underline underline-offset-2">
                  Terms of Service
                </Link>.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black font-medium text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-[10px] text-neutral-500 font-mono">
                Minimal data: No passwords or financial credentials collected.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
