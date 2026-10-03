"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#product-concept" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Vision", href: "#vision" },
    { label: "FAQ", href: "#faq" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#060709]/85 backdrop-blur-md border-b border-white/[0.06] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded-md"
          >
            {/* Minimalist Logo Mark */}
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.1] flex items-center justify-center p-1">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path
                  d="M32 50 C32 38, 44 32, 50 42 C56 52, 68 62, 68 50 C68 38, 56 32, 50 42 C44 52, 32 62, 32 50 Z"
                  stroke="#FFFFFF"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="50" cy="42" r="5" fill="#818CF8" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight text-white">
                Bllumo
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
                Pre-launch
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-neutral-400 hover:text-white transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="#waitlist"
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-lg transition-all duration-150 active:scale-[0.98]"
            >
              Join Waitlist
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#060709] px-4 py-4 space-y-2.5">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2 px-3 text-xs font-medium text-white bg-white/[0.1] rounded-lg border border-white/[0.1]"
            >
              Join the Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
