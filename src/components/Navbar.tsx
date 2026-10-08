"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

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
    { label: "Product", href: "/#product-concept" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Vision", href: "/#vision" },
    { label: "Investors", href: "/investors" },
    { label: "FAQ", href: "/#faq" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#060709]/90 backdrop-blur-md border-b border-white/[0.08] py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 text-white shrink-0 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded-md"
            aria-label="Bllumo Home"
          >
            <Logo size={26} showWordmark={true} />
            <span className="hidden sm:inline-flex text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/[0.08]">
              Pre-launch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-neutral-300 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/#waitlist"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-lg transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              Join Waitlist
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              type="button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden border-b border-white/[0.08] bg-[#060709]/95 backdrop-blur-xl px-4 py-4 space-y-2"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm text-neutral-200 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#waitlist"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 px-3 text-xs font-semibold text-white bg-indigo-600/30 hover:bg-indigo-600/40 rounded-lg border border-indigo-500/30 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              Join the Waitlist
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
