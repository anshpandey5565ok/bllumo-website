import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, Check, X, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Bllumo waitlist website detailing data collection, processing, and user rights.",
};

const SECTIONS = [
  { id: "intro", title: "1. Introduction" },
  { id: "collect", title: "2. Information We Collect" },
  { id: "provided", title: "3. Information You Provide" },
  { id: "automated", title: "4. Automated Information" },
  { id: "use", title: "5. How We Use Information" },
  { id: "bases", title: "6. Legal Bases" },
  { id: "email", title: "7. Email Communications" },
  { id: "cookies", title: "8. Cookies & Storage" },
  { id: "sharing", title: "9. How Information Is Shared" },
  { id: "retention", title: "10. Data Retention" },
  { id: "security", title: "11. Data Security" },
  { id: "transfers", title: "12. International Transfers" },
  { id: "rights", title: "13. Your Rights" },
  { id: "children", title: "14. Children's Privacy" },
  { id: "links", title: "15. Third-Party Links" },
  { id: "changes", title: "16. Policy Changes" },
  { id: "contact", title: "17. Contact Information" },
];

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="min-h-screen bg-[#060709] text-[#EDEDED] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bllumo</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="pb-8 border-b border-white/[0.06] mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
              Legal & Privacy
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              Last updated: {lastUpdated} • Applies to Bllumo Waitlist Website
            </p>
          </div>

          {/* Quick Overview Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="surface-card rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 mb-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>What We Collect</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                First name, email address, optional focus interest category, and voluntary feedback submissions.
              </p>
            </div>

            <div className="surface-card rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 mb-2">
                <X className="w-4 h-4 text-rose-400" />
                <span>What We Never Collect</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No financial passwords, bank accounts, medical records, government IDs, or sensitive credentials.
              </p>
            </div>

            <div className="surface-card rounded-xl p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 mb-2">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Our Core Promise</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We do not sell your personal information for monetary compensation. You can unsubscribe at any time.
              </p>
            </div>
          </div>

          {/* Content with Sidebar TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Sticky Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 p-5 rounded-xl border border-white/[0.06] bg-[#0A0C12] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 pb-2 border-b border-white/[0.06]">
                  Table of Contents
                </div>
                <nav className="space-y-1 text-xs">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1 text-neutral-400 hover:text-white transition-colors truncate"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Detailed Policy Text */}
            <article className="lg:col-span-8 max-w-2xl text-neutral-300 space-y-10 text-xs sm:text-sm leading-relaxed">
              {/* 1. Introduction */}
              <section id="intro" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  1. Introduction
                </h2>
                <p>
                  Bllumo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects user privacy. This Privacy Policy describes how information is collected, processed, and safeguarded when you visit our website (bllumo.com) and participate in our pre-launch waitlist.
                </p>
                <p>
                  Bllumo is currently an early-stage startup developing an adaptive personal AI platform. This policy is explicitly tailored to the current informational website and waitlist operations.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="collect" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  2. Information We Collect
                </h2>
                <p>We strictly limit collection to essential waitlist data:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li><strong className="text-neutral-200">Voluntarily provided contact data:</strong> Your first name and email address submitted via the waitlist form.</li>
                  <li><strong className="text-neutral-200">Product interest preference:</strong> Optional focus categories (such as Health, Fitness, Productivity, Learning, Habits, or Money Management).</li>
                  <li><strong className="text-neutral-200">User communications:</strong> Messages or feedback voluntarily sent to our team via email.</li>
                  <li><strong className="text-neutral-200">Basic technical telemetry:</strong> If analytics are enabled, aggregated browser type, device type, approximate geographic region, and interaction timestamps.</li>
                </ul>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-neutral-300">
                  <strong>Explicit exclusion of sensitive data:</strong> The current waitlist website does not intentionally request or store sensitive financial, medical, biometric, password, or government-ID information.
                </div>
              </section>

              {/* 3. Information Users Provide */}
              <section id="provided" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  3. Information Users Provide
                </h2>
                <p>
                  When you sign up for early access, you voluntarily submit your name and email address. Providing this data is optional, but required if you wish to receive waitlist confirmations, product announcements, and private beta invitations.
                </p>
              </section>

              {/* 4. Automatically Collected Information */}
              <section id="automated" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  4. Automatically Collected Information
                </h2>
                <p>
                  Standard server logs automatically record technical connection data for network stability and security auditing. If enabled, privacy-conscious analytics tools may observe aggregated interaction trends. Optional non-essential telemetry is loaded only in accordance with your cookie consent choices.
                </p>
              </section>

              {/* 5. How We Use Information */}
              <section id="use" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  5. How We Use Information
                </h2>
                <p>We process information solely for legitimate operational purposes:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li>Operating and managing early-access waitlist reservations.</li>
                  <li>Delivering product announcements, development milestones, and testing invites.</li>
                  <li>Responding to support inquiries and direct feedback.</li>
                  <li>Analyzing aggregated regional demand to prioritize development.</li>
                  <li>Mitigating automated spam submissions and malicious network attacks.</li>
                  <li>Complying with statutory legal obligations.</li>
                </ul>
              </section>

              {/* 6. Legal Bases */}
              <section id="bases" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  6. Legal Bases for Processing
                </h2>
                <p>Depending on your jurisdiction, our legal bases include:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li><strong className="text-neutral-200">Consent:</strong> Where you have expressly opted in to receive Bllumo waitlist communications.</li>
                  <li><strong className="text-neutral-200">Legitimate Interests:</strong> Securing the website from abuse and assessing aggregate interest.</li>
                  <li><strong className="text-neutral-200">Legal Obligations:</strong> Retaining records where mandatory by law.</li>
                </ul>
              </section>

              {/* 7. Email Communications */}
              <section id="email" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  7. Email Communications & Opt-Out
                </h2>
                <p>
                  You may unsubscribe from waitlist updates at any time by clicking the unsubscribe link present in all automated emails or by contacting <a href="mailto:privacy@bllumo.com" className="text-neutral-200 underline">privacy@bllumo.com</a>.
                </p>
              </section>

              {/* 8. Cookies and Analytics */}
              <section id="cookies" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  8. Cookies and Storage
                </h2>
                <p>
                  We categorize storage into:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li><strong className="text-neutral-200">Essential Cookies:</strong> Required for site operation, form validation, and recording cookie consent preferences.</li>
                  <li><strong className="text-neutral-200">Optional Analytics:</strong> Activated only upon affirmative user consent via our Cookie Preferences dialog.</li>
                </ul>
              </section>

              {/* 9. How Information Is Shared */}
              <section id="sharing" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  9. How Information Is Shared
                </h2>
                <p>
                  <strong className="text-white">Bllumo does not sell personal information for money.</strong> We share data only with necessary infrastructure providers under strict confidentiality agreements:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li>Cloud hosting and content delivery networks.</li>
                  <li>Database storage providers (such as Supabase or managed PostgreSQL).</li>
                  <li>Transactional email transmission services.</li>
                </ul>
              </section>

              {/* 10. Data Retention */}
              <section id="retention" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  10. Data Retention
                </h2>
                <p>
                  We retain waitlist data only as long as reasonably necessary to manage early access, fulfill product updates, or satisfy statutory recordkeeping requirements. Upon request, your data will be securely purged.
                </p>
              </section>

              {/* 11. Data Security */}
              <section id="security" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  11. Data Security
                </h2>
                <p>
                  We implement reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, or alteration. All web communications utilize HTTPS/TLS encryption. However, no internet transmission is ever completely immune to risks.
                </p>
              </section>

              {/* 12. International Data Transfers */}
              <section id="transfers" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  12. International Data Transfers
                </h2>
                <p>
                  Bllumo is coordinated in India, and our third-party infrastructure providers operate secure data centers internationally. Where cross-border transfers occur, appropriate legal safeguards are applied.
                </p>
              </section>

              {/* 13. User Rights */}
              <section id="rights" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  13. Your Rights
                </h2>
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li>Request access to the personal data we hold about you.</li>
                  <li>Request correction of inaccurate details.</li>
                  <li>Request permanent deletion of your waitlist record.</li>
                  <li>Withdraw previously granted consent at any time.</li>
                </ul>
                <p>
                  To exercise your rights, email <a href="mailto:privacy@bllumo.com" className="text-neutral-200 underline">privacy@bllumo.com</a>.
                </p>
              </section>

              {/* 14. Children */}
              <section id="children" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  14. Children&apos;s Privacy
                </h2>
                <p>
                  The waitlist website is not intended for children under 13 (or under 16 where required by local statute). We do not knowingly collect personal data from minors.
                </p>
              </section>

              {/* 15. Third-Party Links */}
              <section id="links" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  15. Third-Party Links
                </h2>
                <p>
                  We are not responsible for the privacy policies, notices, or operational practices of any third-party websites linked from our pages.
                </p>
              </section>

              {/* 16. Changes */}
              <section id="changes" className="space-y-3 scroll-mt-28">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  16. Policy Updates
                </h2>
                <p>
                  This Privacy Policy may be updated periodically to reflect organizational and legal developments. The updated date will always be indicated at the top of this page.
                </p>
              </section>

              {/* 17. Contact */}
              <section id="contact" className="space-y-3 p-6 rounded-xl surface-card scroll-mt-28">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  17. Contact Information
                </h2>
                <div className="space-y-1 text-xs text-neutral-300">
                  <p><strong className="text-white">Organization:</strong> Bllumo</p>
                  <p><strong className="text-white">Privacy Inquiries:</strong> <a href="mailto:privacy@bllumo.com" className="text-neutral-200 underline">privacy@bllumo.com</a></p>
                  <p><strong className="text-white">Country:</strong> India</p>
                </div>
              </section>

              <div className="pt-6 border-t border-white/[0.06] text-xs text-neutral-400 italic">
                This website privacy policy applies to the current Bllumo website and waitlist. Future Bllumo products may have additional or updated privacy terms.
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
