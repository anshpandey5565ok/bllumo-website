import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Scale, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of the Bllumo pre-launch waitlist website and conceptual demonstrations.",
};

export default function TermsPage() {
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
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              Legal Agreements
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-sm font-mono text-slate-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-invert max-w-none text-slate-300 space-y-8 text-sm sm:text-base leading-relaxed">
            {/* 1. Acceptance */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Bllumo website (bllumo.com) or submitting your details to the Bllumo waitlist, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms, please do not use our website or register for the waitlist.
              </p>
            </section>

            {/* 2. About Bllumo */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                2. About Bllumo & Pre-Launch Status
              </h2>
              <p>
                Bllumo is currently an early-stage technology startup project in active development. Product capabilities, concepts, workflows, interface mockups, and demonstrations presented on this website represent our current developmental vision and are subject to change. Bllumo services are not yet commercially available for general public release.
              </p>
            </section>

            {/* 3. Eligibility */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                3. Eligibility
              </h2>
              <p>
                You must possess the legal capacity to enter into binding agreements under applicable law. If you are under 18 or the age of majority in your jurisdiction, you may only access the website and join the waitlist with the consent and supervision of a parent or legal guardian. The website is not directed to individuals under 13 years of age.
              </p>
            </section>

            {/* 4. Waitlist Terms */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                4. Waitlist Registration & Availability
              </h2>
              <p>
                Joining the Bllumo waitlist expresses your interest in receiving development updates and prospective early-access invitations. Joining the waitlist does <strong>not</strong> guarantee:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Immediate or future access to any software product or feature.</li>
                <li>A specific commercial launch date or timeline.</li>
                <li>Free or discounted access to future paid services.</li>
                <li>The inclusion of any specific feature or functionality in future software releases.</li>
                <li>Any particular numeric queue position or priority, unless explicitly agreed in writing by Bllumo.</li>
              </ul>
              <p>
                Bllumo reserves the right to manage, modify, suspend, or discontinue the waitlist program at its sole discretion at any time without liability.
              </p>
            </section>

            {/* 5. Communications */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                5. Communications
              </h2>
              <p>
                By joining the waitlist and providing your email address, you consent to receive periodic communications regarding Bllumo product updates, development milestones, survey invitations, and launch news. You may opt out of promotional emails at any time using the unsubscribe link provided in every message.
              </p>
            </section>

            {/* 6. Acceptable Use */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                6. Acceptable Use
              </h2>
              <p>When interacting with this website, you agree not to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li>Deploy automated bots, spiders, or scrapers to excessively harvest content or flood submission forms.</li>
                <li>Probe, scan, or test the vulnerability of our systems or breach security mechanisms.</li>
                <li>Introduce viruses, worms, Trojan horses, or other malicious computer code.</li>
                <li>Submit false, fraudulent, or impersonated identity or contact details.</li>
                <li>Use the website in any manner that violates applicable municipal, national, or international laws.</li>
              </ul>
            </section>

            {/* 7. Intellectual Property */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                7. Intellectual Property Rights
              </h2>
              <p>
                All trademarks, service marks, logos, brand names, designs, software interfaces, copy, code, graphics, and product concepts displayed on this website are the proprietary intellectual property of Bllumo and its licensors. You may not copy, reproduce, distribute, or create derivative works from any part of this website without our prior written consent, except for standard personal browser viewing.
              </p>
            </section>

            {/* 8. User Feedback */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                8. Product Feedback & Suggestions
              </h2>
              <p>
                If you choose to submit comments, ideas, or feature suggestions regarding Bllumo, you acknowledge and agree that Bllumo may freely use, adapt, and incorporate such feedback into its platform without any obligation of compensation, attribution, or confidentiality to you. We do not claim ownership over any unintended confidential disclosures.
              </p>
            </section>

            {/* 9. Third-Party Services */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                9. Third-Party Infrastructure
              </h2>
              <p>
                This website is delivered using modern third-party cloud hosting, content delivery, database, and email infrastructure providers. We do not control and are not responsible for any intermittent interruptions caused by third-party provider outages.
              </p>
            </section>

            {/* 10. Future AI Services */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                10. Descriptions of Future AI Services
              </h2>
              <p>
                All descriptions of planned AI functionalities, adaptive behaviors, cross-domain intelligence, and scheduling systems are for informational and conceptual illustration only. Final product specifications may differ substantially upon commercial deployment.
              </p>
            </section>

            {/* 11. Health Disclaimer */}
            <section className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/8">
              <h2 className="text-xl font-bold text-white tracking-tight">
                11. Health & Medical Disclaimer
              </h2>
              <p className="text-sm">
                Bllumo is not a licensed healthcare provider, medical clinic, or medical device manufacturer. Content and conceptual features described on this website are strictly for personal organizational and general lifestyle planning purposes. Nothing on this website constitutes medical diagnosis, treatment advice, or emergency health management. Always consult a qualified physician or healthcare professional for medical concerns.
              </p>
            </section>

            {/* 12. Financial Disclaimer */}
            <section className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/8">
              <h2 className="text-xl font-bold text-white tracking-tight">
                12. Financial & Investment Disclaimer
              </h2>
              <p className="text-sm">
                Bllumo is not a bank, broker-dealer, investment advisor, tax consultant, or licensed financial institution. Nothing on this website or in our waitlist updates constitutes personalized financial, investment, accounting, tax, or legal advice. Any future money management features will be designed as organizational support tools, not fiduciary advisory services.
              </p>
            </section>

            {/* 13. No Professional Relationship */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                13. No Professional Relationship
              </h2>
              <p>
                Accessing this website, interacting with demonstrations, or joining the waitlist does not establish a doctor-patient, fiduciary, attorney-client, or other licensed professional relationship between you and Bllumo.
              </p>
            </section>

            {/* 14. Disclaimer of Warranties */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                14. Disclaimer of Warranties
              </h2>
              <p>
                To the maximum extent permitted by applicable law, this website and waitlist are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, statutory, or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            {/* 15. Limitation of Liability */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                15. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted under law, Bllumo and its founders, affiliates, and contractors shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from your access to or inability to access this website or participation in the waitlist.
              </p>
            </section>

            {/* 16. Indemnification */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                16. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless Bllumo and its team against any claims, losses, liabilities, and expenses arising out of your misuse of this website or violation of these Terms.
              </p>
            </section>

            {/* 17. Governing Law */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                17. Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms will be governed by the laws applicable to [LEGAL ENTITY/JURISDICTION], subject to mandatory consumer protection laws in your local jurisdiction.
              </p>
            </section>

            {/* 18. Changes & Contact */}
            <section className="space-y-3 p-6 rounded-2xl bg-white/[0.02] border border-white/8">
              <h2 className="text-xl font-bold text-white tracking-tight">
                18. Contact & Legal Inquiries
              </h2>
              <p>For questions concerning these Terms, contact our legal desk:</p>
              <div className="space-y-1 text-sm text-slate-300">
                <p><strong className="text-white">Organization:</strong> Bllumo</p>
                <p><strong className="text-white">Legal Inquiries:</strong> <a href="mailto:legal@bllumo.com" className="text-indigo-400 underline">legal@bllumo.com</a></p>
                <p><strong className="text-white">General Inquiries:</strong> <a href="mailto:hello@bllumo.com" className="text-indigo-400 underline">hello@bllumo.com</a></p>
                <p><strong className="text-white">Country:</strong> India</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
