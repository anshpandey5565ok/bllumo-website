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
  ArrowUpRight,
} from "lucide-react";

interface GoalDomain {
  title: string;
  category: string;
  icon: React.ElementType;
  description: string;
  conceptExample: string;
  accent: string;
}

const GOAL_DOMAINS: GoalDomain[] = [
  {
    title: "Health & Wellness",
    category: "Vitality",
    icon: Heart,
    description: "Holistic recovery, sleep calibration, and circadian rhythm alignment designed to keep your body resilient.",
    conceptExample: "Sleep & recovery pacing tailored to biometrics & busy work weeks.",
    accent: "from-rose-500/20 to-orange-500/10 text-rose-400 border-rose-500/20",
  },
  {
    title: "Fitness",
    category: "Performance",
    icon: Dumbbell,
    description: "Adaptive training progressions that calibrate volume and intensity based on daily energy, travel, and recovery.",
    conceptExample: "Session adjustments when fatigue or scheduling conflicts arise.",
    accent: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/20",
  },
  {
    title: "Productivity",
    category: "Focus & Execution",
    icon: Target,
    description: "Deep work orchestrations, contextual priority buffers, and asynchronous distraction shielding for cognitive clarity.",
    conceptExample: "Dynamic daily schedule protection based on your prime focus hours.",
    accent: "from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    title: "Learning",
    category: "Knowledge Mastery",
    icon: GraduationCap,
    description: "Spaced repetition, concept synthesis, and project-based mastery roadmaps customized to your learning velocity.",
    conceptExample: "Micro-modules engineered to fit into your commute or calendar gaps.",
    accent: "from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/20",
  },
  {
    title: "Habit Building",
    category: "Consistency",
    icon: Sparkles,
    description: "Micro-habits anchored to your existing routine, scaling naturally as consistency solidifies over time.",
    conceptExample: "Low-friction fallback versions for high-stress or hectic days.",
    accent: "from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    title: "Money Management",
    category: "Financial Intent",
    icon: Wallet,
    description: "Intentional cashflow allocation, savings buffers, and mindful spending boundaries aligned with your long-term goals.",
    conceptExample: "Paced envelope adjustments following temporary expense surges.",
    accent: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    title: "Lifestyle Goals",
    category: "Living Intentional",
    icon: Compass,
    description: "Balancing personal milestones, family commitments, travel adventures, and passions without feeling overburdened.",
    conceptExample: "Holistic travel blueprints that harmonize rest and experiences.",
    accent: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/20",
  },
  {
    title: "Personal Goals",
    category: "Individual Ambition",
    icon: Layers,
    description: "Any singular goal you set out to achieve. Bllumo asks the right questions and constructs a custom system.",
    conceptExample: "Custom scaffolding built around non-standard personal milestones.",
    accent: "from-fuchsia-500/20 to-pink-500/10 text-fuchsia-400 border-fuchsia-500/20",
  },
];

export function GoalCards() {
  return (
    <section id="goals" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 mb-3 block">
            ONE INTELLIGENT PLATFORM
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            One platform. Built around you.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Most apps start with features and expect people to adapt. Bllumo is being designed to start with the person—their goal, circumstances, preferences, and changing real-world context.
          </p>
        </div>

        {/* 8 Goal Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GOAL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.title}
                className="group relative p-6 rounded-2xl bg-[#0D111C]/80 border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 flex flex-col justify-between"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${domain.accent} border flex items-center justify-center transition-transform group-hover:scale-105`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {domain.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {domain.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] font-mono text-slate-400 block mb-1">
                    Planned Experience:
                  </span>
                  <p className="text-xs text-slate-300/80 italic">
                    &ldquo;{domain.conceptExample}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision Disclaimer Sub-note */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="font-semibold text-slate-300">Development Note:</span> Bllumo&apos;s long-term vision is to support multiple areas of everyday life through personalized AI experiences. Availability will vary as the platform develops.
          </p>
        </div>
      </div>
    </section>
  );
}
