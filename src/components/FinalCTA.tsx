"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 relative text-center border-t border-white/[0.06] bg-[#07090E]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 inline-block">
          The Next Generation of Personal Software
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.12] mb-6 max-w-3xl mx-auto">
          Your goals are personal. <br className="hidden sm:inline" />
          <span className="text-neutral-400">Your software should be too.</span>
        </h2>

        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-9">
          Join the Bllumo waitlist and be among the first to see what we&apos;re building.
        </p>

        <div className="flex justify-center">
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium text-black bg-white hover:bg-neutral-200 rounded-xl transition-all active:scale-[0.98]"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
