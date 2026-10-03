"use client";

import {
  Heart,
  Dumbbell,
  Target,
  GraduationCap,
  Sparkles,
  Wallet,
  Compass,
  Layers,
} from "lucide-react";

interface GoalDomain {
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  conceptExample: string;
}

const GOAL_DOMAINS: GoalDomain[] = [
  {
    title: "Health & Wellness",
    category: "Vitality",
    icon: Heart,
    description: "Recovery pacing and circadian alignment designed around your biological rhythms.",
    conceptExample: "Sleep calibration tailored to high-workload weeks.",
  },
  {
    title: "Fitness",
    category: "Movement",
    icon: Dumbbell,
    description: "Progressive training systems that recalibrate based on energy, travel, and schedule.",
    conceptExample: "Session adjustments when fatigue or meetings arise.",
  },
  {
    title: "Productivity",
    category: "Focus",
    icon: Target,
    description: "Deep work orchestrations and distraction buffers for sustained cognitive clarity.",
    conceptExample: "Protected sprint blocks calibrated to your prime focus hours.",
  },
  {
    title: "Learning",
    category: "Mastery",
    icon: GraduationCap,
    description: "Spaced synthesis and progressive mastery roadmaps adapted to your available time.",
    conceptExample: "Micro-modules engineered for commute and calendar gaps.",
  },
  {
    title: "Habit Building",
    category: "Consistency",
    icon: Sparkles,
    description: "Micro-habits anchored to existing routines, scaling as consistency solidifies.",
    conceptExample: "Low-friction fallback versions for high-stress days.",
  },
  {
    title: "Money Management",
    category: "Intent",
    icon: Wallet,
    description: "Intentional cashflow allocations and savings buffers aligned with your lifestyle.",
    conceptExample: "Dynamic pacing after temporary expense surges.",
  },
  {
    title: "Lifestyle Goals",
    category: "Balance",
    icon: Compass,
    description: "Harmonizing personal milestones, travel commitments, and passions without overwhelm.",
    conceptExample: "Travel frameworks that preserve baseline health.",
  },
  {
    title: "Personal Goals",
    category: "Ambition",
    icon: Layers,
    description: "Custom objectives. Bllumo asks targeted questions and builds a personalized system.",
    conceptExample: "Custom scaffolding built around non-standard milestones.",
  },
];

export function GoalCards() {
  return (
    <section id="goals" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            One Intelligent Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            One platform. Built around you.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            Most apps start with features and expect people to adapt. Bllumo is being designed to start with the person—their goal, circumstances, preferences, and changing real-world context.
          </p>
        </div>

        {/* Unified Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GOAL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className="surface-card rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {domain.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1.5">
                    {domain.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5">
                    Planned Experience
                  </span>
                  <p className="text-xs text-neutral-300 italic">
                    &ldquo;{domain.conceptExample}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Development disclaimer notice */}
        <div className="mt-10 text-center">
          <p className="text-xs text-neutral-500 max-w-xl mx-auto">
            Bllumo&apos;s long-term vision is to support multiple areas of everyday life through personalized AI experiences. Availability will vary as the platform develops.
          </p>
        </div>
      </div>
    </section>
  );
}
