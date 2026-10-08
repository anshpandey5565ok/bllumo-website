"use client";

import { ArrowRight, Check } from "lucide-react";

export function Personalization() {
  return (
    <section id="differentiation" className="py-20 md:py-28 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
            Product Problem Hypothesis
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Why rigid plans often lead to tool abandonment.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Our core working hypothesis is that people rarely abandon personal goals because of a lack of motivation—they abandon their planning tools when unforeseen schedule disruptions accumulate into insurmountable backlogs.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Software */}
          <div className="surface-card rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Conventional Task & Habit Planners
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Static Checklists & Backlog Accumulation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                A working hypothesis is that some task applications can turn missed items into overdue backlogs. Unexpected meetings or delays may then make the plan feel harder to resume; this scenario needs validation.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-400 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">•</span>
                  <span>Requires continuous manual rescheduling when routines are disrupted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">•</span>
                  <span>Treats missed 60-minute blocks as binary failures rather than offering shorter fallbacks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-500">•</span>
                  <span>Assumes consistent daily energy and static weekly calendars.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.08] text-xs font-mono text-neutral-400">
              <span className="text-[10px] text-neutral-400 block mb-2 uppercase font-semibold">Planning-friction hypothesis</span>
              <div className="flex items-center gap-2 text-neutral-300">
                <span>Initial Plan</span>
                <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
                <span className="text-amber-400/90">Interruption</span>
                <ArrowRight className="w-3 h-3 text-neutral-600 shrink-0" />
                <span className="text-rose-400/90">Overdue Fatigue</span>
              </div>
            </div>
          </div>

          {/* Bllumo System */}
          <div className="surface-card rounded-2xl p-7 border-indigo-500/30 flex flex-col justify-between bg-indigo-950/[0.08]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-2 font-semibold">
                Bllumo&apos;s Design Direction (Working Hypothesis)
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Constraint-Aware Replanning & Low-Effort Fallbacks
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Bllumo is exploring dynamic replanning that respects practical constraints. Instead of stacking overdue alerts, the platform aims to recalculate feasible next steps and introduce lower-friction fallback options to keep users progressing without guilt.
              </p>

              <ul className="space-y-2.5 text-xs text-neutral-300 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Generates low-friction fallback versions when full sessions are interrupted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Maintains underlying goal continuity rather than enforcing rigid daily quotas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Focuses attention on realistic single next actions.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.08] text-xs font-mono">
              <span className="text-[10px] text-neutral-400 block mb-2 uppercase font-semibold">Target Experience</span>
              <div className="flex flex-wrap items-center gap-1.5 text-neutral-200">
                <span>Interruption</span>
                <span className="text-neutral-500">&rarr;</span>
                <span className="text-indigo-300">Context Check</span>
                <span className="text-neutral-500">&rarr;</span>
                <span className="text-emerald-400 font-semibold">Feasible Fallback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
