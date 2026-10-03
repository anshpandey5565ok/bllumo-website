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
    title: "Travel & Relocation",
    badge: "Mobility",
    description: "Your normal routine may pause while traveling.",
    plannedAdjustment:
      "Bllumo could create a temporary travel-compatible version and return to the baseline plan afterward.",
    icon: Plane,
  },
  {
    title: "Schedule Changes",
    badge: "Time Constraints",
    description: "If a user's available time changes unexpectedly during high-workload weeks.",
    plannedAdjustment:
      "The experience could adjust rather than simply marking the plan as failed.",
    icon: Clock,
  },
  {
    title: "Unexpected Conditions",
    badge: "Context Shifts",
    description: "Weather disruptions, fatigue, or temporary environmental constraints.",
    plannedAdjustment:
      "Temporary constraints can result in temporary adaptations rather than unnecessary long-term changes.",
    icon: CloudAlert,
  },
];

export function Adaptation() {
  return (
    <section className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Real-World Resilience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Designed for real life, not perfect schedules.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Plans often fail because life does not remain constant. Travel happens. Schedules change. Weather changes. Priorities shift temporarily. Bllumo&apos;s long-term vision is to recognize those changes and adjust the active experience without unnecessarily abandoning the user&apos;s underlying goal.
          </p>
        </div>

        {/* 3 Minimal Cards */}
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

                  <p className="text-xs text-neutral-400 mb-4">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                    Planned Adaptation
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
          <p className="text-xs text-neutral-500 italic max-w-lg mx-auto">
            Capabilities reflect our developmental vision and will be introduced progressively in early access phases.
          </p>
        </div>
      </div>
    </section>
  );
}
