"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-purple-950/30 to-[#070A12] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Small label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold tracking-widest uppercase text-indigo-300 mb-8">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          OUR VISION
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-8 max-w-4xl mx-auto">
          Software should adapt to people— <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            not the other way around.
          </span>
        </h2>

        {/* Paragraphs */}
        <div className="space-y-6 text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
          <p>
            Bllumo&apos;s vision is a future where people do not need dozens of disconnected applications for every objective. Instead, intelligent software can understand what someone wants to accomplish and create the right experience around them.
          </p>
          <p className="text-slate-400 text-sm sm:text-base">
            We are starting step by step, building the intelligence and infrastructure needed to make that vision possible.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all duration-200"
          >
            <span>Join Bllumo Early</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
