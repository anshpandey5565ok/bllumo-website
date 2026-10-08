import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of the Bllumo pre-launch waitlist website and conceptual demonstrations.",
  alternates: {
    canonical: "https://www.bllumo.com/terms",
  },
  openGraph: {
    title: "Bllumo Terms of Service",
    description: "Terms of Service governing the pre-launch waitlist and informational concepts.",
    url: "https://www.bllumo.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="min-h-screen bg-[#070A12] text-[#EDEDED] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
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

          {/* Header */}
          <div className="pb-8 border-b border-white/[0.08] mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
              Legal Agreements
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              Last updated: {lastUpdated} • Pre-Launch Website & Waitlist
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">1. Acceptance of Terms</h2>
              <p className="text-neutral-300">
                By accessing this website (bllumo.com) or submitting an email to the Bllumo waitlist, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this website or submit the waitlist form.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">2. About Bllumo & Pre-Launch Development Status</h2>
              <p className="text-neutral-300">
                Bllumo is an early-stage technology project. Public operator and company details are pending owner confirmation. Features, workflows, mockups, and capabilities described on this website represent conceptual product directions under active research and development. They do not constitute a commercially available service or a binding promise of specific features.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">3. Eligibility</h2>
              <p className="text-neutral-300">
                You must be at least 18 years old to join the waitlist and possess the legal capacity to enter into these Terms under applicable law. The waitlist does not offer parental-consent registration.
              </p>
            </section>

            <section className="space-y-2 surface-card p-5 rounded-xl border border-white/[0.08]">
              <h2 className="text-base font-semibold text-white">4. Waitlist Terms & No Guarantee of Priority</h2>
              <p className="text-neutral-300 leading-relaxed">
                Joining the Bllumo waitlist is free of charge and serves solely to express interest in receiving development updates and potential early-access invitations. Joining does not guarantee product access, a specific launch date, free lifetime service, particular features, or any position or priority over other participants. Bllumo reserves the right to modify, pause, or discontinue the waitlist program at its discretion.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">5. Communications & Unsubscribing</h2>
              <p className="text-neutral-300">
                By opting in through the waitlist form, you consent to receive periodic emails regarding Bllumo&apos;s developmental progress, alpha testing, and launch news. You may withdraw this consent at any time by clicking the unsubscribe link included in our emails or by contacting privacy@bllumo.com.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">6. Acceptable Use</h2>
              <p className="text-neutral-300">
                You agree to use this website only for legitimate informational purposes. You agree not to attempt unauthorized access to administrative endpoints, probe system vulnerabilities, introduce malicious code, execute automated scraping or submission attacks, impersonate other individuals, or violate applicable local, national, or international laws.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">7. Intellectual Property</h2>
              <p className="text-neutral-300">
                All visual brand assets, trade names, logos, original graphics, site copy, UI concepts, and software code on this website are the intellectual property of Bllumo and its founders. You may not reproduce, modify, distribute, or publicly display these assets without prior written authorization.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">8. User Feedback</h2>
              <p className="text-neutral-300">
                If you voluntarily submit comments, suggestions, or design feedback regarding Bllumo, you grant us a perpetual, irrevocable, royalty-free license to use that feedback to improve the product and service without compensation or obligation to you.
              </p>
            </section>

            <section className="space-y-2 surface-card p-4 rounded-xl">
              <h2 className="text-base font-semibold text-white">9. Health Disclaimer</h2>
              <p className="text-neutral-400">
                Bllumo is not a licensed healthcare provider, medical clinic, or medical device. Any planned health, fitness, recovery, or sleep features are strictly for personal organizational support and general lifestyle tracking. They do not constitute clinical diagnosis, treatment, or emergency guidance. Always consult qualified health professionals for medical decisions.
              </p>
            </section>

            <section className="space-y-2 surface-card p-4 rounded-xl">
              <h2 className="text-base font-semibold text-white">10. Financial Disclaimer</h2>
              <p className="text-neutral-400">
                Bllumo is not a bank, registered broker-dealer, financial adviser, lender, or tax professional. Content on this website does not constitute financial, investment, or legal advice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">11. Disclaimer of Warranties</h2>
              <p className="text-neutral-400">
                To the fullest extent permitted by law, this website and waitlist service are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express, implied, or statutory.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">12. Limitation of Liability</h2>
              <p className="text-neutral-400">
                To the maximum extent permitted by applicable law, Bllumo and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or inability to use this website.
              </p>
            </section>

            <section className="space-y-2 surface-card p-5 rounded-xl border border-white/[0.08]">
              <h2 className="text-base font-semibold text-white">13. Governing Law & Dispute Resolution</h2>
              <p className="text-neutral-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of India, without regard to conflict of law principles, subject to any mandatory consumer protection regulations that cannot be derogated from under the laws of your residence. Any legal proceeding arising out of or related to these Terms or your use of the website shall be brought exclusively before the courts of competent jurisdiction in India.
              </p>
            </section>

            <section className="space-y-2 p-5 rounded-xl surface-card">
              <h2 className="text-base font-semibold text-white">14. Legal Contact Information</h2>
              <div className="space-y-1.5 text-xs text-neutral-300">
                <p><strong className="text-white">Operator:</strong> Bllumo project (public operator details pending confirmation)</p>
                <p><strong className="text-white">Corporate Status:</strong> Early-stage technology project; company status pending confirmation</p>
                <p><strong className="text-white">Operating Jurisdiction:</strong> Pending owner confirmation</p>
                <p>
                  <strong className="text-white">Legal Inquiries:</strong>{" "}
                  <a href="mailto:legal@bllumo.com" className="text-indigo-300 hover:text-white underline">
                    legal@bllumo.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
