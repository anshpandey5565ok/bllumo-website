"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="py-24 md:py-32 relative text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 inline-block">
          Our Vision
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8">
          Software should adapt to people— <br className="hidden sm:inline" />
          <span className="text-neutral-400">not the other way around.</span>
        </h2>

        <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10">
          <p>
            Bllumo&apos;s vision is a future where people do not need dozens of disconnected applications for every objective. Instead, intelligent software can understand what someone wants to accomplish and create the right experience around them.
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm">
            We are starting step by step, building the intelligence and infrastructure needed to make that vision possible.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] rounded-xl transition-all"
          >
            <span>Join Bllumo Early</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
