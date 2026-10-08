"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 relative text-center border-t border-white/[0.08] bg-[#07090E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 inline-block font-semibold">
          Personal AI · Under Development
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-6 max-w-3xl mx-auto">
          Your goals are personal. <br className="hidden sm:inline" />
          <span className="text-neutral-400">Your software should fit your life.</span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto mb-9 leading-relaxed">
          Follow our development milestones and receive early-access invitations as private testing begins.
        </p>

        <div className="flex justify-center">
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold text-black bg-white hover:bg-neutral-200 rounded-xl transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
          >
            <span>Join the waitlist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
