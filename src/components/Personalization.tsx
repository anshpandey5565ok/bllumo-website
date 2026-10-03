"use client";

import { ArrowRight } from "lucide-react";

export function Personalization() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Not another one-size-fits-all AI experience.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Conventional apps expect people to conform to their menus. Bllumo is engineered to adapt directly to the human being.
          </p>
        </div>

        {/* Side-by-side comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Software */}
          <div className="surface-card rounded-2xl p-7 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Conventional Software
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Rigid Interfaces & Fixed Workflows
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Traditional software gives thousands of users essentially the same interface, workflow, and recommendations. When real-world disruptions occur, the rigid software marks plans as failed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.06] text-xs font-mono text-neutral-400">
              <span className="text-[10px] text-neutral-400 block mb-2 uppercase">Workflow</span>
              <div className="flex items-center gap-2 text-neutral-300">
                <span>User</span>
                <ArrowRight className="w-3 h-3 text-neutral-600" />
                <span className="text-neutral-400">Fixed Features</span>
                <ArrowRight className="w-3 h-3 text-neutral-600" />
                <span className="text-neutral-500">Fixed Experience</span>
              </div>
            </div>
          </div>

          {/* Bllumo System */}
          <div className="surface-card rounded-2xl p-7 border-neutral-700/60 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 mb-2">
                Bllumo Personalization
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Dynamic Systems Generated Around You
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Bllumo is being built around adaptive personalization—understanding what an individual needs and generating an experience appropriate for that person and goal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.08] text-xs font-mono">
              <span className="text-[10px] text-neutral-400 block mb-2 uppercase">Pipeline</span>
              <div className="flex flex-wrap items-center gap-1.5 text-neutral-200">
                <span>User</span>
                <span className="text-neutral-600">&rarr;</span>
                <span className="text-neutral-300">Goal</span>
                <span className="text-neutral-600">&rarr;</span>
                <span className="text-neutral-300">Understanding</span>
                <span className="text-neutral-600">&rarr;</span>
                <span className="text-indigo-300 font-medium">Adaptive UI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
