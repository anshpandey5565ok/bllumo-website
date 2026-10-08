"use client";

import { Plane, Clock, CloudAlert } from "lucide-react";

interface Scenario {
  title: string;
  badge: string;
  description: string;
  plannedAdjustment: string;
  icon: React.ElementType;
}

const SCENARIOS: Scenario[] = [
  {
    title: "Travel & Transit Days",
    badge: "Environment Shift",
    description: "Regular workout or meal prep routines are disrupted while traveling.",
    plannedAdjustment:
      "Offers bodyweight hotel-room alternatives or brief airport movement sprints, automatically resuming standard routines upon return.",
    icon: Plane,
  },
  {
    title: "Unscheduled Meeting Spikes",
    badge: "Time Constraints",
    description: "A sudden late afternoon project emergency cuts available personal time by half.",
    plannedAdjustment:
      "Compresses daily focus targets into a concise 15-minute recap block without marking the entire day as failed.",
    icon: Clock,
  },
  {
    title: "Fatigue & Energy Slumps",
    badge: "Recovery Priority",
    description: "High cognitive fatigue after consecutive late work sessions.",
    plannedAdjustment:
      "Down-shifts evening study demands to passive audio review or encourages an early sleep window to protect long-term recovery.",
    icon: CloudAlert,
  },
];

export function Adaptation() {
  return (
    <section id="adaptation" className="py-20 md:py-28 relative border-t border-white/[0.08] bg-[#07090E] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Resilience By Design
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Built for messy weeks, not idealized spreadsheets.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            These illustrative scenarios describe a planning hypothesis: travel, meetings, and energy changes may require smaller next steps. They are proposed directions, not live product capabilities.
          </p>
        </div>

        {/* 3 Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SCENARIOS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="surface-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1 uppercase">
                    Proposed Adjustment
                  </span>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {card.plannedAdjustment}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-neutral-400 max-w-lg mx-auto">
            These examples illustrate our product roadmap and will be tested incrementally with early alpha users.
          </p>
        </div>
      </div>
    </section>
  );
}
