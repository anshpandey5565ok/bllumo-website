"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Vision() {
  return (
    <section id="vision" className="py-24 md:py-32 relative text-center scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6 inline-block">
          Long-Term Vision
        </span>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8">
          Personal software that bends to your reality, <br className="hidden sm:inline" />
          <span className="text-neutral-400">rather than demanding you bend to it.</span>
        </h2>

        <div className="space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10">
          <p>
            Today, people jump between dozens of rigid single-purpose apps for tasks, fitness, habits, and schedules—only to burn out on manual maintenance. Our long-term vision is a unified personal AI system that understands your overarching priorities and dynamically adapts your daily structure.
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm">
            We are pursuing this methodically: validating the core planning engine first through private alpha cohorts before expanding into deeper multimodal integrations.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.14] rounded-xl transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
          >
            <span>Join the Waitlist</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
