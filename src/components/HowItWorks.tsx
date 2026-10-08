"use client";

import { MessageSquarePlus, HelpCircle, Layers, SlidersHorizontal } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  description: string;
  example: string;
  icon: React.ElementType;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Express your objective naturally",
    description:
      "Start with your actual goal and current constraints rather than fitting your routine into predetermined forms or rigid schedules.",
    example: "“I want to build a consistent 30-minute morning workout routine without skipping sleep.”",
    icon: MessageSquarePlus,
  },
  {
    number: "02",
    title: "Clarify practical constraints",
    description:
      "The system gathers only the essential context: weekly availability, travel frequency, energy patterns, and previous roadblocks.",
    example: "Identifies early meeting schedules on Thursdays and sets low-effort fallbacks.",
    icon: HelpCircle,
  },
  {
    number: "03",
    title: "Generate an initial weekly plan",
    description:
      "Translates your objective into progressive weekly blocks with clear daily next actions and flexible pacing.",
    example: "Produces progressive schedule with alternating cardio and mobility focus.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Adjust as circumstances change",
    description:
      "When unforeseen meetings, fatigue, or travel disrupt the schedule, the plan recalibrates feasible alternatives to preserve momentum.",
    example: "Shifts a missed afternoon workout to a 15-minute evening stretch sequence.",
    icon: SlidersHorizontal,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative border-y border-white/[0.08] bg-[#07090E] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            From a personal goal to an adaptable plan
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            A practical four-stage process designed to eliminate planning friction and sustain consistency over time.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="surface-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-mono font-bold text-neutral-200">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Context Example
                  </span>
                  <p className="text-xs text-neutral-300 italic">
                    {step.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
