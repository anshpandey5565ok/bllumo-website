"use client";

import { Plane, Clock, CloudAlert, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface AdaptationScenario {
  id: string;
  title: string;
  badge: string;
  icon: React.ElementType;
  situation: string;
  plannedAdaptation: string;
  outcome: string;
  color: string;
}

const ADAPTATION_SCENARIOS: AdaptationScenario[] = [
  {
    id: "travel",
    title: "Travel & Transit",
    badge: "Mobility Protocol",
    icon: Plane,
    situation: "You are traveling across time zones for four days with limited access to your usual equipment and kitchen.",
    plannedAdaptation:
      "Your normal routine may pause while traveling. Bllumo could create a temporary travel-compatible version and return to the baseline plan afterward.",
    outcome: "Goal continuity preserved with low-friction hotel-room habits.",
    color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: "schedule",
    title: "Schedule Disruption",
    badge: "Dynamic Recalibration",
    icon: Clock,
    situation: "An unexpected client sprint cuts your daily available personal window from 60 minutes down to 20 minutes.",
    plannedAdaptation:
      "If a user's available time changes, the experience could adjust rather than simply marking the plan as failed.",
    outcome: "Maintains momentum with high-leverage micro-actions instead of an aborted day.",
    color: "from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30",
  },
  {
    id: "unexpected",
    title: "Unexpected Conditions",
    badge: "Constraint Pacing",
    icon: CloudAlert,
    situation: "Severe weather, physical fatigue, or illness temporarily renders your normal routine unsuitable.",
    plannedAdaptation:
      "Temporary constraints can result in temporary adaptations rather than unnecessary long-term changes.",
    outcome: "Prioritizes recovery while protecting the long-term target from abandonment.",
    color: "from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/30",
  },
];

export function Adaptation() {
  return (
    <section className="py-20 md:py-32 relative bg-[#0D111C]/30 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3 block">
            RESILIENT INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Designed for real life, not perfect schedules.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Plans often fail because life does not remain constant. Travel happens. Schedules change. Weather changes. Priorities shift temporarily. Bllumo&apos;s long-term vision is to recognize those changes and adjust the active experience without unnecessarily abandoning the user&apos;s underlying goal.
          </p>
        </div>

        {/* 3 Real-Life Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADAPTATION_SCENARIOS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group relative rounded-2xl bg-[#070A12]/90 border border-white/8 hover:border-white/20 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} border flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {card.title}
                  </h3>

                  <div className="mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Life Event:
                    </span>
                    <p className="italic text-slate-300">{card.situation}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {card.plannedAdaptation}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{card.outcome}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pre-launch clarity notice */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400 max-w-xl mx-auto italic">
            Planned experiences illustrate our product vision. Actual capabilities will roll out incrementally during our early access roadmap.
          </p>
        </div>
      </div>
    </section>
  );
}
