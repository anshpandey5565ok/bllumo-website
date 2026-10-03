"use client";

import Link from "next/link";
import { Sparkles, Heart, Shield, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  return (
    <footer className="border-t border-white/8 bg-[#04060C] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main Footer Links Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/8">
          {/* Column 1: Brand & Tagline (2 cols wide) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <path
                    d="M32 50 C32 38, 44 32, 50 42 C56 52, 68 62, 68 50 C68 38, 56 32, 50 42 C44 52, 32 62, 32 50 Z"
                    stroke="url(#footLogoGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="50" cy="42" r="5" fill="#06B6D4" />
                  <defs>
                    <linearGradient id="footLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Bllumo</span>
            </Link>

            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              AI that builds around your life. One intelligent platform. Personalized systems for every goal.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/8 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Currently under development • India</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
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
                  Platform Vision
                </Link>
              </li>
              <li>
                <Link href="#waitlist" className="hover:text-white transition-colors">
                  Join Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Bllumo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Inquiries
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

          {/* Column 4: Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
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
                  className="hover:text-white transition-colors text-left focus:outline-none"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-400 transition-colors text-xs flex items-center gap-1">
                  <span>Founder Access</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Safety Disclaimers */}
        <div className="py-8 space-y-4 text-xs text-slate-400 leading-relaxed border-b border-white/5">
          <p>
            <strong className="text-slate-300">Development Status:</strong> Bllumo is currently under development. Features described on this website represent our current product direction and may change before release.
          </p>
          <p>
            <strong className="text-slate-300">Health Disclaimer:</strong> Bllumo is not a medical provider and does not provide diagnosis, treatment, or emergency medical services. Content is for informational and organizational support only.
          </p>
          <p>
            <strong className="text-slate-300">Financial Disclaimer:</strong> Bllumo is not a bank, broker, investment adviser, lender, or financial institution. Information provided through future Bllumo services should not be considered personalized investment, tax, or legal advice unless explicitly provided by an appropriately qualified third party.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {currentYear} Bllumo. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Operated in India</span>
            <span>•</span>
            <a href="mailto:hello@bllumo.com" className="hover:text-slate-300 transition-colors">
              hello@bllumo.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
