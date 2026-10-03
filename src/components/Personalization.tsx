"use client";

import { ArrowRight, ArrowDown, Lock, Unlock, Sparkles, Check, X } from "lucide-react";

export function Personalization() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-wider uppercase text-purple-400 mb-3 block">
            PARADIGM SHIFT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Not another one-size-fits-all AI experience.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Most software forces millions of different human beings through identical checkboxes, rigid funnels, and static menus. Bllumo flips the equation.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Software Card */}
          <div className="rounded-3xl bg-[#0D111C]/60 border border-white/8 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs font-semibold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  Conventional Software
                </div>
                <span className="text-xs font-mono text-slate-400">Static Paradigm</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Rigid Features & Forced Routines
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Traditional software gives thousands of users essentially the same interface, workflow, and recommendations. You are forced to conform your life to the software developer&apos;s rigid assumptions.
              </p>

              {/* Traditional Flow Diagram */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 font-mono text-xs">
                <span className="text-slate-400 text-[11px] uppercase tracking-wider block font-sans font-semibold">
                  Conventional Workflow:
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-300 text-center">
                  <div className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/5">
                    User
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <ArrowDown className="w-4 h-4 text-slate-400 sm:hidden" />
                  <div className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    Fixed Features
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <ArrowDown className="w-4 h-4 text-slate-400 sm:hidden" />
                  <div className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/5 text-slate-400">
                    Fixed Experience
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mt-8 pt-6 border-t border-white/5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0" />
                <span>One generic interface replicated across millions of users</span>
              </li>
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Breaks down whenever your schedule or environment changes</span>
              </li>
              <li className="flex items-center gap-2.5">
                <X className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Treats missed tasks as personal failures rather than dynamic signals</span>
              </li>
            </ul>
          </div>

          {/* Bllumo Adaptive Personalization Card */}
          <div className="rounded-3xl bg-gradient-to-b from-[#13192B] to-[#0A0E1A] border border-indigo-500/30 p-8 md:p-10 flex flex-col justify-between relative shadow-2xl shadow-indigo-950/40">
            {/* Subtle highlight orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Bllumo Adaptive Personalization
                </div>
                <span className="text-xs font-mono text-cyan-400">Dynamic Operating Layer</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Systems Generated Around Your Life
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Bllumo is being built around adaptive personalization—understanding what an individual needs and generating an experience appropriate for that person and goal.
              </p>

              {/* Bllumo Flow Diagram */}
              <div className="p-5 rounded-2xl bg-black/60 border border-indigo-500/30 space-y-3 font-mono text-xs">
                <span className="text-indigo-300 text-[11px] uppercase tracking-wider block font-sans font-semibold">
                  Bllumo Pipeline:
                </span>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-200 text-center">
                  <div className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                    User
                  </div>
                  <span className="text-indigo-400">&rarr;</span>
                  <div className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 text-xs">
                    Goal
                  </div>
                  <span className="text-purple-400">&rarr;</span>
                  <div className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs">
                    Understanding
                  </div>
                  <span className="text-cyan-400">&rarr;</span>
                  <div className="w-full sm:w-auto px-2.5 py-2 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 text-xs font-bold">
                    Adaptive UI
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-3 mt-8 pt-6 border-t border-indigo-500/20 text-xs sm:text-sm text-slate-200 relative z-10">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Generates custom workflows suited specifically to your daily reality</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Continuously recalibrates without requiring manual micromanagement</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Protects your long-term objective even during unpredictable disruptions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
