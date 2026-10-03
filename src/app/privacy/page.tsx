import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Bllumo waitlist website detailing data collection, processing, and user rights.",
};

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bllumo</span>
            </Link>
          </div>

          {/* Header */}
          <div className="pb-8 border-b border-white/10 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              Legal & Data Protection
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-sm font-mono text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Policy Document Content */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
            {/* 1. Introduction */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Introduction
              </h2>
              <p>
                Bllumo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your personal privacy. This Privacy Policy describes how we collect, use, and safeguard personal information when you visit our website (currently located at bllumo.com) and when you voluntarily submit your information to join our pre-launch waitlist.
              </p>
              <p>
                Bllumo is currently an early-stage startup developing an adaptive personal AI platform. This policy is specifically scoped to the current pre-launch informational website and waitlist operations.
              </p>
            </section>

            {/* 2. Information We Collect */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2. Information We Collect
              </h2>
              <p>
                We adhere to strict data minimization principles. Through this website, we collect only the information reasonably required to coordinate our early access rollout:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Contact details:</strong> Your first name and your email address when voluntarily submitted through our waitlist form.</li>
                <li><strong className="text-white">Product interest preferences:</strong> The optional goal or focus category you select (such as Fitness, Productivity, Health & Wellness, Learning, Money Management, etc.).</li>
                <li><strong className="text-white">Communications:</strong> Any correspondence or questions you send directly to our email addresses.</li>
                <li><strong className="text-white">Basic technical telemetry:</strong> If analytics are enabled, basic aggregated information such as browser type, device type, approximate geographic region, referring URL, and interaction timestamps.</li>
              </ul>
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs sm:text-sm text-indigo-200">
                <strong>Explicit exclusion of sensitive data:</strong> The current Bllumo waitlist website does <em>not</em> intentionally request, require, or collect sensitive financial account credentials, medical records or diagnostic files, passwords, national identification numbers, or government-issued IDs. Please do not submit any sensitive personal data through our waitlist forms.
              </div>
            </section>

            {/* 3. Information Users Provide */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Information Users Provide
              </h2>
              <p>
                When you choose to register for early access, you affirmatively provide your name, email, and preferred focus category. Submission is entirely voluntary; you are under no statutory obligation to supply this data, but it is necessary if you wish to receive waitlist confirmations, product development updates, or private alpha/beta invitations.
              </p>
            </section>

            {/* 4. Automatically Collected Information */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                4. Automatically Collected Information
              </h2>
              <p>
                When you navigate our website, our hosting infrastructure automatically records standard server access logs for technical operation, security defense, and server health. If enabled, we may use privacy-conscious analytics tools to observe anonymized interaction trends (such as page views or scroll depth). Optional non-essential telemetry is loaded only in accordance with your cookie consent selections.
              </p>
            </section>

            {/* 5. How We Use Information */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                5. How We Use Information
              </h2>
              <p>We process the personal information we collect exclusively for the following purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>To administer, record, and verify your place on the Bllumo early-access waitlist.</li>
                <li>To dispatch product announcements, development milestones, and invitations to participate in private preview tests.</li>
                <li>To respond to direct feedback, inquiries, or support requests initiated by you.</li>
                <li>To analyze aggregated geographic and category demand so we can prioritize platform features.</li>
                <li>To detect, prevent, and mitigate fraudulent registrations, automated bot submissions, and malicious attacks.</li>
                <li>To comply with applicable legal, accounting, and regulatory obligations.</li>
              </ul>
            </section>

            {/* 6. Legal Bases */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                6. Legal Bases for Processing
              </h2>
              <p>
                Depending on your country of residence (such as the European Economic Area, United Kingdom, or India), our legal bases for processing your information include:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Consent:</strong> Where you have expressly agreed to receive Bllumo waitlist communications and product updates. You may withdraw consent at any time.</li>
                <li><strong className="text-white">Legitimate Interests:</strong> To protect our website from spam, investigate security incidents, and understand high-level product interest.</li>
                <li><strong className="text-white">Legal Obligations:</strong> Where disclosure or retention is necessary to comply with applicable statutory requirements.</li>
              </ul>
            </section>

            {/* 7. Email Communications */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                7. Email Communications & Unsubscribe
              </h2>
              <p>
                Every automated waitlist update we send contains an accessible unsubscribe link. You may opt out of future emails at any time by clicking the unsubscribe link or by emailing <a href="mailto:privacy@bllumo.com" className="text-indigo-400 underline">privacy@bllumo.com</a> with your request.
              </p>
            </section>

            {/* 8. Cookies and Analytics */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                8. Cookies and Local Storage
              </h2>
              <p>
                We categorize cookies and browser storage into:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong className="text-white">Strictly Necessary:</strong> Essential for the site to function, secure form submissions, and remember your cookie preferences. These do not require opt-in consent.</li>
                <li><strong className="text-white">Analytics / Performance:</strong> If enabled, used to measure anonymous traffic patterns. These are activated only upon your explicit choice in our Cookie Preferences banner.</li>
              </ul>
              <p>
                You can adjust your choices at any moment via the Cookie Preferences link in the footer.
              </p>
            </section>

            {/* 9. How Information Is Shared */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                9. How Information Is Shared
              </h2>
              <p>
                <strong className="text-white">Bllumo does not sell personal information for money.</strong> We do not rent or monetize your email address with third-party advertisers.
              </p>
              <p>
                We may share information only with trusted technical service providers who assist us in operating this website, subject to strict confidentiality agreements:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Cloud hosting and content delivery providers (such as Vercel or cloud VPS).</li>
                <li>Database and storage infrastructure providers (such as Supabase or managed PostgreSQL).</li>
                <li>Transactional email delivery services (such as Resend or SendGrid).</li>
                <li>Privacy-focused web analytics services if enabled.</li>
              </ul>
            </section>

            {/* 10. Data Retention */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                10. Data Retention
              </h2>
              <p>
                We retain your waitlist information only for as long as reasonably necessary to fulfill the purposes described in this policy, including managing the pre-launch waitlist, offering onboarding access to the Bllumo platform, or satisfying statutory recordkeeping requirements. When data is no longer required or upon your request for deletion, we securely delete or anonymize it.
              </p>
            </section>

            {/* 11. Data Security */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                11. Data Security
              </h2>
              <p>
                We use reasonable administrative, technical, and organizational measures designed to protect information against accidental loss, unauthorized access, destruction, and alteration. All web communications are encrypted in transit via standard HTTPS/TLS protocols. However, no internet transmission or electronic storage method can guarantee absolute security.
              </p>
            </section>

            {/* 12. International Data Transfers */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                12. International Data Transfers
              </h2>
              <p>
                Bllumo is managed from India. Our infrastructure and third-party service providers operate globally (including data centers in the United States and Europe). If personal data is transferred across international boundaries, we ensure that appropriate safeguards are maintained in accordance with applicable data protection laws.
              </p>
            </section>

            {/* 13. User Rights */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                13. User Rights
              </h2>
              <p>
                Depending on your jurisdiction, you may have statutory rights regarding your personal data, including:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>The right to confirm whether we process your personal data and to request access to a copy of it.</li>
                <li>The right to correct inaccurate or outdated information.</li>
                <li>The right to request deletion of your personal data from our waitlist directory.</li>
                <li>The right to restrict or object to certain processing activities.</li>
                <li>The right to receive your data in a portable, structured format.</li>
                <li>The right to withdraw your consent at any time without affecting prior lawful processing.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at <a href="mailto:privacy@bllumo.com" className="text-indigo-400 underline">privacy@bllumo.com</a>.
              </p>
            </section>

            {/* 14. Children */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                14. Children&apos;s Privacy
              </h2>
              <p>
                This waitlist is not intended for or directed at children under the age of 13 (or under 16 where required by local jurisdiction). We do not knowingly collect personal information from children. If you become aware that a minor has provided us with personal information, please notify us so we may promptly delete the data. Because future Bllumo services may have distinct eligibility guidelines, those terms will be established separately at commercial launch.
              </p>
            </section>

            {/* 15. Third-Party Links */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                15. Third-Party Links
              </h2>
              <p>
                Our website may contain links to external third-party services or social profiles. We have no control over and assume no responsibility for the privacy practices, policies, or content of any third-party websites.
              </p>
            </section>

            {/* 16. Changes */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                16. Changes to this Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. Any modifications will be posted to this page with an updated &ldquo;Last updated&rdquo; timestamp.
              </p>
            </section>

            {/* 17. Contact */}
            <section className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/8">
              <h2 className="text-xl font-bold text-white tracking-tight">
                17. Contact Information
              </h2>
              <p>If you have questions, concerns, or requests regarding this Privacy Policy, please reach out to us:</p>
              <div className="space-y-1 text-sm text-slate-300">
                <p><strong className="text-white">Organization:</strong> Bllumo</p>
                <p><strong className="text-white">Privacy Inquiries:</strong> <a href="mailto:privacy@bllumo.com" className="text-indigo-400 underline">privacy@bllumo.com</a></p>
                <p><strong className="text-white">General Inquiries:</strong> <a href="mailto:hello@bllumo.com" className="text-indigo-400 underline">hello@bllumo.com</a></p>
                <p><strong className="text-white">Country:</strong> India</p>
              </div>
            </section>

            {/* Required Ending Disclaimer */}
            <div className="pt-6 border-t border-white/10 text-xs text-slate-400 italic">
              This website privacy policy applies to the current Bllumo website and waitlist. Future Bllumo products may have additional or updated privacy terms.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
