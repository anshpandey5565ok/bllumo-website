"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleOpenCookiePreferences = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] text-neutral-300 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.08]">
          {/* Brand Summary */}
          <div className="md:col-span-2 space-y-3">
            <Link
              href="/"
              className="group inline-flex items-center text-white focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded-md"
            >
              <Logo size={24} showWordmark={true} />
            </Link>

            <p className="text-neutral-300 text-xs leading-relaxed max-w-sm">
              Bllumo is building an AI platform designed around your goals, preferences, and changing real-world needs.
            </p>

            <div className="text-xs font-mono text-neutral-400">
              Personal AI · In Development · Operated in India
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/#product-concept"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Product Concept
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/#vision"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/#waitlist"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/#about"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/#trust"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Responsible AI
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
              Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="text-neutral-400 hover:text-white transition-colors text-left focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimers */}
        <div className="py-6 space-y-2 text-xs text-neutral-400 leading-relaxed border-b border-white/[0.06]">
          <p>
            <strong className="text-neutral-200">Development Status:</strong> Bllumo is currently under active development. Features described on this website represent conceptual product directions and intended capabilities. They may change prior to release.
          </p>
          <p>
            <strong className="text-neutral-200">Health:</strong> Bllumo is not a medical provider and does not provide medical diagnosis, treatment, or clinical advice.
          </p>
          <p>
            <strong className="text-neutral-200">Finance:</strong> Bllumo is not a bank, broker, or financial adviser. Content is for planning and informational purposes only.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
          <div>&copy; {currentYear} Bllumo. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Operated in India</span>
            <span>•</span>
            <a
              href="mailto:hello@bllumo.com"
              className="text-neutral-300 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
            >
              hello@bllumo.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
