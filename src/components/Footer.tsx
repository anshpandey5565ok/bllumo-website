"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#050608] text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Summary */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-5 h-5 rounded bg-white/[0.08] flex items-center justify-center p-0.5">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <path
                    d="M32 50 C32 38, 44 32, 50 42 C56 52, 68 62, 68 50 C68 38, 56 32, 50 42 C44 52, 32 62, 32 50 Z"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="42" r="6" fill="#818CF8" />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">Bllumo</span>
            </Link>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              AI that builds around your life. One intelligent platform. Personalized systems for every goal.
            </p>

            <div className="text-[11px] font-mono text-neutral-400">
              Currently under development • India
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#product-concept" className="hover:text-white transition-colors">
                  Product Concept
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#vision" className="hover:text-white transition-colors">
                  Vision
                </Link>
              </li>
              <li>
                <Link href="#waitlist" className="hover:text-white transition-colors">
                  Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#trust" className="hover:text-white transition-colors">
                  Responsible AI
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
              Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-500 hover:text-neutral-400 transition-colors">
                  Founder Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers */}
        <div className="py-6 space-y-2 text-[11px] text-neutral-400 leading-relaxed border-b border-white/[0.04]">
          <p>
            <strong className="text-neutral-300">Development Status:</strong> Bllumo is currently under development. Features described on this website represent our current product direction and may change before release.
          </p>
          <p>
            <strong className="text-neutral-300">Health:</strong> Bllumo is not a medical provider and does not provide diagnosis, treatment, or emergency medical services.
          </p>
          <p>
            <strong className="text-neutral-300">Finance:</strong> Bllumo is not a bank, broker, investment adviser, lender, or financial institution. Information provided through future Bllumo services should not be considered personalized investment, tax, or legal advice unless explicitly provided by an appropriately qualified third party.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <div>&copy; {currentYear} Bllumo. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Operated in India</span>
            <span>•</span>
            <a href="mailto:hello@bllumo.com" className="hover:text-neutral-300">
              hello@bllumo.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
