"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CornerDownLeft, RefreshCw, Compass } from "lucide-react";

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
    id: "productivity",
    name: "Focus & Deep Work (Phase 1 Target)",
    input: "I want to protect deep focus blocks and cut mid-day context switching.",
    understanding: "Identified: Peak morning cognitive energy, heavy afternoon meeting schedules.",
    generatedPlan: "Context-Shielded Focus Blocks (9:00 AM – 11:00 AM uninterrupted quiet sprint protocol)",
    adaptation: {
      event: "Unplanned team check-in booked into morning block",
      adjustment: "Shifted deep work sprint to 2:30 PM with distraction suppression; preserved core daily deliverable.",
    },
  },
  {
    id: "habits",
    name: "Daily Micro-Habits (Phase 1 Target)",
    input: "I want to read consistently and build a 10-minute mindfulness routine.",
    understanding: "Identified: Late-evening screen fatigue, reliable motivation directly after morning coffee.",
    generatedPlan: "Micro-Habit Stacking (10 min reading + 5 min breathwork anchored to morning routine)",
    adaptation: {
      event: "Early transit departure at 5:30 AM",
      adjustment: "Offered 5-min audio reflection during commute; maintained habit streak without friction.",
    },
  },
  {
    id: "fitness",
    name: "Fitness Pacing (Exploratory)",
    input: "I want to improve stamina and functional strength without burning out.",
    understanding: "Identified: 40-minute weekday availability, desk-work posture fatigue, outdoor trail preference.",
    generatedPlan: "Adaptive Cardio & Functional Movement System (4 sessions/wk with dynamic pacing)",
    adaptation: {
      event: "Heavy rain & sudden temperature drop at 6:30 AM",
      adjustment: "Recalibrated to 30-min indoor mobility circuit. Maintained weekly movement volume without guilt.",
    },
  },
];

export function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = CONCEPTS[activeIdx];

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIdx: number | null = null;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIdx = (index + 1) % CONCEPTS.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIdx = (index - 1 + CONCEPTS.length) % CONCEPTS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIdx = CONCEPTS.length - 1;
    }

    if (nextIdx !== null) {
      setActiveIdx(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle radial spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] radial-spotlight pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-wide uppercase text-neutral-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>PERSONAL AI · IN DEVELOPMENT</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Turn personal goals <br className="hidden sm:inline" />
            <span className="text-neutral-400">into plans that fit your life.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-9">
            Bllumo is building an AI platform that turns your goals, preferences, and practical constraints into personalized plans. Our aim is to help you adjust those plans as your circumstances change.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <Link
              href="/#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-white hover:bg-neutral-200 rounded-xl transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              <span>Join the waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#product-concept"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] rounded-xl transition-all duration-150 focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              <span>Explore the product concept</span>
            </Link>
          </div>

          {/* Helper Copy */}
          <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
            The product is under development. Sign up for development updates and possible early-access invitations. No public launch date has been announced.
          </p>
        </div>

        {/* Conceptual Product Mockup */}
        <div id="product-concept" className="mt-16 md:mt-20 scroll-mt-28">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0C12] overflow-hidden shadow-2xl">
            {/* Top Toolbar */}
            <div className="px-5 py-3.5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-neutral-300">bllumo // goal-runtime</span>
              </div>
              <span className="text-[11px] font-mono text-amber-300/90 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20 inline-block self-start sm:self-auto">
                Illustrative product concept · Not a live AI session
              </span>
            </div>

            {/* Accessible Interactive Concept Switcher with roving tabindex & arrow nav */}
            <div
              role="tablist"
              aria-label="Product concept examples"
              className="px-5 py-3 border-b border-white/[0.08] flex flex-wrap items-center gap-2 bg-black/20"
            >
              <span className="text-xs text-neutral-400 font-mono mr-1">Select Concept:</span>
              {CONCEPTS.map((c, i) => {
                const isSelected = activeIdx === i;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`concept-tab-${c.id}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`concept-panel-${c.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActiveIdx(i)}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    type="button"
                    className={`text-xs px-3.5 py-1.5 rounded-lg transition-all font-medium focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 ${
                      isSelected
                        ? "bg-white/[0.14] text-white border border-white/[0.2] shadow-sm font-semibold"
                        : "text-neutral-400 hover:text-neutral-200 bg-white/[0.02] border border-transparent"
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>

            {/* Pipeline Panel with tabindex=0 and aria-live announcement */}
            <div
              id={`concept-panel-${active.id}`}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`concept-tab-${active.id}`}
              aria-live="polite"
              className="p-6 md:p-8 space-y-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500/50"
            >
              {/* 1. Goal Input */}
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  01 — User Objective & Constraints
                </div>
                <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.08] flex items-center justify-between text-sm text-neutral-200">
                  <span>&ldquo;{active.input}&rdquo;</span>
                  <CornerDownLeft className="w-4 h-4 text-neutral-400 shrink-0 ml-3" />
                </div>
              </div>

              {/* 2. Understanding */}
              <div>
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  02 — Context & Constraint Modeling
                </div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-neutral-300 leading-relaxed">
                  {active.understanding}
                </div>
              </div>

              {/* 3 & 4. Plan & Adaptation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-[11px] font-mono text-indigo-300 uppercase tracking-wider font-semibold">
                    03 — Generated Action Structure
                  </div>
                  <p className="text-xs text-neutral-200 font-medium leading-relaxed">
                    {active.generatedPlan}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                  <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                    <RefreshCw className="w-3 h-3 text-indigo-400" />
                    <span>04 — Real-Life Adaptation Example</span>
                  </div>
                  <div className="text-xs text-neutral-300 space-y-1 leading-relaxed">
                    <span className="text-neutral-400 block font-mono text-[11px]">
                      Trigger: {active.adaptation.event}
                    </span>
                    <p className="text-neutral-200 font-medium">
                      {active.adaptation.adjustment}
                    </p>
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
