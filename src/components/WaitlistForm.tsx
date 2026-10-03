"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle, Sparkles, UserCheck, Shield } from "lucide-react";

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
  const [honeypot, setHoneypot] = useState(""); // Bot honeypot

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic frontend checks
    if (!firstName.trim()) {
      setErrorMessage("Please enter your first name.");
      return;
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please check the box to agree to product and launch updates.");
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
          source: "homepage_early_access",
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
    <section id="waitlist" className="py-20 md:py-32 relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0D111C]/90 border border-white/10 p-8 sm:p-12 md:p-14 shadow-2xl shadow-black/80 relative backdrop-blur-2xl">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              EARLY ACCESS INVITATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Help shape what&apos;s next.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Bllumo is currently under development. Join the waitlist to receive product updates, early-access opportunities, and launch information.
            </p>
          </div>

          {/* Form or Success State */}
          {submitted ? (
            <div className="max-w-xl mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">
                  You&apos;re on the list.
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Thanks for joining Bllumo, <span className="text-white font-semibold">{firstName}</span>. We&apos;ll keep you updated as we move toward launch.
                </p>
                {isDuplicate && (
                  <p className="text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 rounded-lg p-2.5 max-w-md mx-auto">
                    Note: Your email was already registered in our early access directory. We have confirmed your reservation!
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-md mx-auto text-xs text-slate-400">
                <span>Confirmation sent to: </span>
                <span className="font-mono text-slate-200">{email}</span>
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
                className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
              >
                Register another email address
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6" noValidate>
              {/* Error banner */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_url">Do not fill this field</label>
                <input
                  type="text"
                  id="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* First Name */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="first_name" className="text-xs font-semibold text-slate-200">
                  First name <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="first_name"
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email_address" className="text-xs font-semibold text-slate-200">
                  Email address <span className="text-indigo-400">*</span>
                </label>
                <input
                  id="email_address"
                  type="email"
                  inputMode="email"
                  required
                  placeholder="alex@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Product Interest (Optional) */}
              <div className="space-y-2 text-left">
                <label htmlFor="product_interest" className="text-xs font-semibold text-slate-200">
                  What would you most like Bllumo to help you with? <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  id="product_interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394A3B8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.25rem",
                  }}
                >
                  <option value="" className="bg-[#070A12] text-slate-400">
                    Select a focus area...
                  </option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#070A12] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2 text-left">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-[#070A12] text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-transparent transition cursor-pointer"
                  />
                  <span className="text-xs text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                    I agree to receive Bllumo product and launch updates. I understand that I can unsubscribe at any time. <span className="text-indigo-400">*</span>
                  </span>
                </label>
              </div>

              {/* Legal Note */}
              <p className="text-[11px] text-slate-400 text-left leading-normal">
                By joining, you agree to our{" "}
                <Link href="/privacy" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="text-indigo-300 hover:text-indigo-200 underline underline-offset-2">
                  Terms of Service
                </Link>.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Reserving your spot...</span>
                  </>
                ) : (
                  <>
                    <span>Join the Waitlist</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Security & Minimal Data Guarantee */}
              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Strict data minimization: No passwords or financial credentials ever requested.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
