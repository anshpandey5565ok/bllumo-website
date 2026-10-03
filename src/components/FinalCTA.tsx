"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Background Animated Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/25 via-purple-600/25 to-cyan-500/25 blur-[130px] rounded-full pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-wider uppercase text-slate-300 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>THE NEXT GENERATION OF PERSONAL SOFTWARE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto">
          Your goals are personal. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Your software should be too.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
          Join the Bllumo waitlist and be among the first to see what we&apos;re building.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#waitlist"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/60 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all duration-200"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
