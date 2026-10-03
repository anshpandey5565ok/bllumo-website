"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CornerDownLeft, Sparkles, RefreshCw } from "lucide-react";

interface GoalConcept {
  id: string;
  name: string;
  input: string;
  understanding: string;
  generatedPlan: string;
  adaptation: {
    event: string;
    adjustment: string;
  };
}

const CONCEPTS: GoalConcept[] = [
  {
    id: "fitness",
    name: "Fitness",
    input: "I want to improve my stamina and build functional strength.",
    understanding: "Identified: 45 min weekday window, joint recovery constraints, outdoor preference.",
    generatedPlan: "Adaptive Cardio & Functional Movement System (4 sessions/wk with dynamic pacing)",
    adaptation: {
      event: "Heavy rain & weather drop at 6:30 AM",
      adjustment: "Auto-recalibrated to 30-min indoor mobility circuit. Maintained weekly target.",
    },
  },
  {
    id: "productivity",
    name: "Productivity",
    input: "I want to protect deep focus time and cut context switching.",
    understanding: "Identified: Peak morning cognitive energy, heavy afternoon meeting loads.",
    generatedPlan: "Context-Shielded Focus Blocks (9:00 AM – 11:00 AM async quiet protocol)",
    adaptation: {
      event: "Urgent stakeholder meeting booked at 10:00 AM",
      adjustment: "Intelligently shifted deep work sprint to 2:30 PM with distraction suppression.",
    },
  },
  {
    id: "habits",
    name: "Habits",
    input: "I want to read consistently and build a daily meditation habit.",
    understanding: "Identified: Evening fatigue, high motivation directly after morning coffee.",
    generatedPlan: "Micro-Habit Stacking (10 min reading + 5 min breathwork anchored to morning routine)",
    adaptation: {
      event: "Early flight & 5:00 AM departure",
      adjustment: "Switched to 5-min audio reflection during airport transit; preserved habit streak.",
    },
  },
];

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CONCEPTS[activeIdx];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] radial-spotlight pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Minimal Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-wide uppercase text-neutral-400 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>The Personal AI Platform — Coming Soon</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            AI that builds <br className="hidden sm:inline" />
            <span className="text-neutral-400">around your life.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-9">
            Bllumo is building a personalized AI platform that understands what you want to achieve, creates an experience around your needs, and adapts as your life changes.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href="#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-black bg-white hover:bg-neutral-200 rounded-xl transition-all duration-150 active:scale-[0.98]"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all duration-150"
            >
              See How Bllumo Works
            </Link>
          </div>

          <p className="text-xs text-neutral-500">
            Early access is currently being prepared. Join the waitlist for product updates and launch access.
          </p>
        </div>

        {/* Minimal Conceptual Product Mockup */}
        <div id="product-concept" className="mt-16 md:mt-20">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0C12] overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-600" />
                <span className="text-xs font-mono text-neutral-400">bllumo // goal-runtime</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                Product concept
              </span>
            </div>

            {/* Interactive Concept Switcher */}
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs text-neutral-400 font-mono mr-1">Select Goal:</span>
              {CONCEPTS.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActiveIdx(i)}
                  className={`text-xs px-3 py-1 rounded-md transition-all font-medium ${
                    activeIdx === i
                      ? "bg-white/[0.1] text-white border border-white/[0.12]"
                      : "text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Clean Pipeline Steps */}
            <div className="p-6 md:p-8 space-y-6">
              {/* 1. Goal Input */}
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  01 — User Objective
                </div>
                <div className="p-3.5 rounded-xl bg-[#060709] border border-white/[0.08] flex items-center justify-between text-sm text-neutral-200">
                  <span>&ldquo;{active.input}&rdquo;</span>
                  <CornerDownLeft className="w-3.5 h-3.5 text-neutral-500 shrink-0 ml-2" />
                </div>
              </div>

              {/* 2. Understanding */}
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  02 — Context & Understanding
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300">
                  {active.understanding}
                </div>
              </div>

              {/* 3 & 4. Plan & Adaptation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider">
                    03 — Personalized System
                  </div>
                  <p className="text-xs text-neutral-200 font-medium">
                    {active.generatedPlan}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 text-indigo-400" />
                    <span>04 — Real-Life Adaptation</span>
                  </div>
                  <div className="text-xs text-neutral-300 space-y-1">
                    <span className="text-neutral-400 block font-mono text-[11px]">Event: {active.adaptation.event}</span>
                    <p className="text-neutral-200 font-medium">{active.adaptation.adjustment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
