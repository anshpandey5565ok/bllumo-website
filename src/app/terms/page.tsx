import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of the Bllumo pre-launch waitlist website and conceptual demonstrations.",
};

export default function TermsPage() {
  const lastUpdated = "October 2026";

  return (
    <div className="min-h-screen bg-[#060709] text-[#EDEDED] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
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

          {/* Header */}
          <div className="pb-8 border-b border-white/[0.06] mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
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
              <p className="text-neutral-400">
                By accessing this website or joining the waitlist, you agree to these Terms. If you disagree, please do not use the website or submit the waitlist form.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">2. About Bllumo & Pre-Launch Status</h2>
              <p className="text-neutral-400">
                Bllumo is currently an early-stage startup under development. Product functionality, workflows, and mockups described on this website represent our developmental vision, may change before release, and are not yet commercially available.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">3. Eligibility</h2>
              <p className="text-neutral-400">
                You must possess the legal capacity to accept these Terms. The website is not directed to individuals under 13 years of age.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">4. Waitlist Terms</h2>
              <p className="text-neutral-400">
                Joining the waitlist expresses interest in early access and product updates. Joining does not guarantee product access, a specific launch date, free service, particular features, or any position or priority. Bllumo may modify or discontinue the waitlist at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">5. Communications</h2>
              <p className="text-neutral-400">
                Users joining the waitlist consent to relevant Bllumo product communications and can unsubscribe at any time via the link in emails.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">6. Acceptable Use</h2>
              <p className="text-neutral-400">
                You agree not to attack the website, scrape it abusively, attempt unauthorized access, introduce malware, misuse forms, impersonate others, or violate applicable laws.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">7. Intellectual Property</h2>
              <p className="text-neutral-400">
                Bllumo branding, designs, website content, product concepts, graphics, copy, logos, and software are owned by Bllumo or applicable licensors. You may not reproduce them beyond normal personal browsing without written permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">8. Feedback</h2>
              <p className="text-neutral-400">
                If you voluntarily provide product suggestions, Bllumo may use that feedback to improve its products without obligation of compensation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">9. Third-Party Services</h2>
              <p className="text-neutral-400">
                The website relies on third-party hosting, database, email, and infrastructure services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">10. Future AI Services</h2>
              <p className="text-neutral-400">
                Descriptions of planned AI functionality are informational and may change before release.
              </p>
            </section>

            <section className="space-y-2 surface-card p-4 rounded-xl">
              <h2 className="text-base font-semibold text-white">11. Health Disclaimer</h2>
              <p className="text-neutral-400">
                Bllumo is not a medical provider and does not provide diagnosis, treatment, or emergency medical services. Content on this website is for general informational and planning support only.
              </p>
            </section>

            <section className="space-y-2 surface-card p-4 rounded-xl">
              <h2 className="text-base font-semibold text-white">12. Financial Disclaimer</h2>
              <p className="text-neutral-400">
                Bllumo is not a bank, broker, investment adviser, lender, or financial institution. Information provided through future services should not be considered personalized investment, tax, or legal advice.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">13. No Professional Relationship</h2>
              <p className="text-neutral-400">
                Accessing the website does not create a doctor-patient, adviser-client, attorney-client, fiduciary, or similar professional relationship.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">14. Disclaimer of Warranties</h2>
              <p className="text-neutral-400">
                To the extent permitted by law, the website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">15. Limitation of Liability</h2>
              <p className="text-neutral-400">
                To the fullest extent permitted by applicable law, Bllumo shall not be liable for any indirect, incidental, or consequential damages resulting from your use of this website.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-semibold text-white">16. Governing Law</h2>
              <p className="text-neutral-400">
                These Terms will be governed by the laws applicable to [LEGAL ENTITY/JURISDICTION], subject to mandatory consumer protection laws.
              </p>
            </section>

            <section className="space-y-2 p-4 rounded-xl surface-card">
              <h2 className="text-base font-semibold text-white">17. Legal Contact</h2>
              <div className="space-y-1 text-xs text-neutral-300">
                <p><strong className="text-white">Organization:</strong> Bllumo</p>
                <p><strong className="text-white">Legal Inquiries:</strong> <a href="mailto:legal@bllumo.com" className="text-neutral-200 underline">legal@bllumo.com</a></p>
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
