import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Bllumo waitlist website detailing data minimization, storage practices, and user rights.",
  alternates: {
    canonical: "https://www.bllumo.com/privacy",
  },
  openGraph: {
    title: "Bllumo Privacy Policy",
    description: "Privacy practices, data handling, and user rights for the Bllumo waitlist.",
    url: "https://www.bllumo.com/privacy",
  },
};

const SECTIONS = [
  { id: "intro", title: "1. Introduction & Operator" },
  { id: "collect", title: "2. Information We Collect" },
  { id: "use", title: "3. Purposes of Processing" },
  { id: "bases", title: "4. Grounds for Processing" },
  { id: "storage", title: "5. Storage Infrastructure & Practices" },
  { id: "retention", title: "6. Data Retention" },
  { id: "security", title: "7. Security Safeguards & Limits" },
  { id: "cookies", title: "8. Cookies & Local Storage" },
  { id: "rights", title: "9. Your Rights & Deletion Procedures" },
  { id: "children", title: "10. Eligibility & Children's Privacy" },
  { id: "compliance", title: "11. Regulatory Status Notice" },
  { id: "contact", title: "12. Privacy Contact Information" },
];

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EDEDED] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bllumo</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="pb-8 border-b border-white/[0.08] mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
              Data Governance & Privacy
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              Last updated: {lastUpdated} • Applies to www.bllumo.com waitlist operations
            </p>
          </div>

          {/* Quick Overview Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
            <div className="surface-card rounded-xl p-5 border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-200 mb-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>What We Collect</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Email address (required), optional first name, optional focus interest category, and consent timestamp.
              </p>
            </div>

            <div className="surface-card rounded-xl p-5 border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-200 mb-2 font-semibold">
                <X className="w-4 h-4 text-rose-400" />
                <span>What We Never Collect</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                No passwords, payment cards, bank credentials, biometric data, sensor telemetry, or government IDs.
              </p>
            </div>

            <div className="surface-card rounded-xl p-5 border border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-200 mb-2 font-semibold">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Our Standard</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We never sell your personal information. You can unsubscribe or request data deletion upon verification.
              </p>
            </div>
          </div>

          {/* Main Content Layout with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of contents sidebar */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 p-5 rounded-xl border border-white/[0.08] bg-[#0A0C12] space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 pb-2 border-b border-white/[0.08] font-semibold">
                  Sections
                </div>
                <nav className="space-y-1 text-xs">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1 text-neutral-400 hover:text-white transition-colors truncate focus-visible:outline-2 focus-visible:outline-indigo-400 rounded"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Detailed Policy Text */}
            <article className="lg:col-span-8 max-w-2xl text-neutral-300 space-y-10 text-xs sm:text-sm leading-relaxed">
              {/* 1. Intro & Operator */}
              <section id="intro" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  1. Introduction & Operator Identity
                </h2>
                <p>
                  This Privacy Policy explains how Bllumo (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) handles personal data collected through the pre-launch waitlist website at <strong className="text-white">www.bllumo.com</strong>.
                </p>
                <p className="text-neutral-400">
                  The website is an early-stage project. Public operator and company details will be published after owner confirmation. We limit our data collection to the minimum information necessary to communicate development updates.
                </p>
              </section>

              {/* 2. Information We Collect */}
              <section id="collect" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  2. Information We Collect
                </h2>
                <p>
                  We deliberately minimize the information requested on our website:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-neutral-300">
                  <li><strong className="text-white">Email Address (Required):</strong> Used to contact you with development news and potential early-access testing invitations.</li>
                  <li><strong className="text-white">First Name (Optional):</strong> Used to personalize communications if provided.</li>
                  <li><strong className="text-white">Product Interest Category (Optional):</strong> Used to understand aggregate interest across conceptual planning domains.</li>
                  <li><strong className="text-white">Consent Metadata:</strong> Opt-in timestamp, consent policy version string, and submission source.</li>
                  <li><strong className="text-white">Technical Security Logs:</strong> IP addresses and request timestamps temporarily processed in-memory solely for rate limiting and abuse prevention.</li>
                </ul>
              </section>

              {/* 3. How We Use Information */}
              <section id="use" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  3. Purposes of Data Processing
                </h2>
                <p>
                  Data submitted to the waitlist is processed strictly for the following operational purposes:
                </p>
                <ul className="space-y-1.5 list-disc pl-5 text-neutral-300">
                  <li>Sending project updates, developmental milestones, and alpha availability news.</li>
                  <li>Coordinating early-access testing invitations.</li>
                  <li>Mitigating automated spam submissions and protecting service availability.</li>
                </ul>
              </section>

              {/* 4. Legal Grounds */}
              <section id="bases" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  4. Grounds for Processing
                </h2>
                <p>
                  Our processing of waitlist emails is grounded in your <strong className="text-white">explicit, affirmative consent</strong> provided when checking the opt-in box on the waitlist form. You may withdraw consent at any time. Processing of temporary network logs is grounded in our <strong className="text-white">legitimate interest</strong> to protect website availability against automated abuse.
                </p>
              </section>

              {/* 5. Storage Infrastructure & Practices */}
              <section id="storage" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  5. Storage Infrastructure & Practices
                </h2>
                <p>
                  We strive for complete transparency regarding how waitlist information is actually persisted:
                </p>
                <div className="surface-card rounded-xl p-4 border border-white/[0.08] space-y-2 text-xs">
                  <p><strong className="text-white">Production storage:</strong> Registrations are accepted only when the server can reach the configured Supabase database over HTTPS. The database is the authoritative store; a local file is never used as a production fallback.</p>
                  <p><strong className="text-white">Development storage:</strong> Local development can use a private development file under <code className="text-indigo-300">data/development</code>. That file is not a production record.</p>
                  <p><strong className="text-white">Hosting and database:</strong> Public responses currently identify Cloudflare in front of Vercel for the website. Waitlist data is intended for a separately configured Supabase project; its project, region, backup retention, and deletion workflow must be recorded and approved before registration opens. The current local environment has no production database configured.</p>
                </div>
              </section>

              {/* 6. Retention */}
              <section id="retention" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  6. Data Retention
                </h2>
                <p>
                  Waitlist registrations are retained according to the owner-approved retention schedule. A deletion request removes the active record, creates a hashed suppression entry to prevent re-import into future mailings, and is applied to active exports and operational stores. Backups follow the documented provider retention window and are not restored over a completed deletion without reapplying suppression.
                </p>
              </section>

              {/* 7. Security Safeguards & Limits */}
              <section id="security" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  7. Security Safeguards & Inherent Limits
                </h2>
                <p>
                  We implement practical technical controls including HTTPS transport encryption, Content Security Policies, origin validation, constant-time HMAC session tokenization for administrative tools, and input sanitization.
                </p>
                <p className="text-neutral-400">
                  While we take reasonable steps to safeguard data, no transmission over the internet or electronic storage infrastructure can guarantee absolute security against all unforeseen vulnerabilities. We minimize this risk by avoiding the collection of sensitive credentials, passwords, or financial details.
                </p>
              </section>

              {/* 8. Cookies & Local Storage */}
              <section id="cookies" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  8. Cookies & Local Storage
                </h2>
                <p>
                  We store a single preference key (<code className="text-indigo-300">bllumo_cookie_consent</code>) in your browser&apos;s local storage to remember your privacy choices. Optional performance analytics remain disabled by default and are only enabled if you affirmatively opt in. You can change your selection at any time using the Cookie Preferences link in the footer.
                </p>
              </section>

              {/* 9. Your Rights & Deletion Procedures */}
              <section id="rights" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  9. Your Rights & Deletion Procedures
                </h2>
                <p>
                  You have the right to request confirmation of whether your email is registered, request correction of entered details, or request full deletion of your record.
                </p>
                <div className="surface-card rounded-xl p-4 border border-white/[0.08] space-y-2 text-xs">
                  <p className="font-semibold text-white">How to Request Deletion:</p>
                  <p className="text-neutral-300">
                    Send an email to <a href="mailto:privacy@bllumo.com" className="text-indigo-300 underline">privacy@bllumo.com</a> from the email address registered on the waitlist with the subject line &ldquo;Data Deletion Request&rdquo;. After verifying email ownership and inbox delivery, the operator will remove the record from the active database, exports, and suppression-aware email workflow.
                  </p>
                </div>
              </section>

              {/* 10. Eligibility & Children's Privacy */}
              <section id="children" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  10. Age Eligibility & Children&apos;s Privacy
                </h2>
                <p>
                  The waitlist is intended only for people aged 18 or older. Registration is closed until this eligibility policy and the related privacy requirements have been approved by the owner and qualified reviewer. If a minor submitted information, please contact privacy@bllumo.com to request deletion.
                </p>
              </section>

              {/* 11. Regulatory Status Notice */}
              <section id="compliance" className="space-y-3 scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  11. Regulatory Status & Legal Review Notice
                </h2>
                <p>
                  This policy is formulated with reference to general data transparency principles and India&apos;s Digital Personal Data Protection Act (DPDPA), 2023. As Bllumo transitions toward commercial operation, our privacy documentation and technical workflows will undergo formal review by qualified legal counsel.
                </p>
              </section>

              {/* 12. Privacy Contact Information */}
              <section id="contact" className="surface-card rounded-xl p-5 border border-white/[0.08] space-y-2 scroll-mt-28">
                <h2 className="text-base font-bold text-white">12. Privacy Contact Channels</h2>
                <p className="text-neutral-300">
                  For privacy questions, access requests, or deletion inquiries:
                </p>
                <div className="space-y-1 text-xs text-neutral-300 pt-1">
                  <p><strong className="text-white">Privacy Inquiries:</strong> <a href="mailto:privacy@bllumo.com" className="text-indigo-300 underline">privacy@bllumo.com</a></p>
                  <p><strong className="text-white">General Inquiries:</strong> <a href="mailto:hello@bllumo.com" className="text-indigo-300 underline">hello@bllumo.com</a></p>
                  <p><strong className="text-white">Location:</strong> India</p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
