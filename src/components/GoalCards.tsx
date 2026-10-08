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
  CheckCircle2,
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
    title: "Health & Routine",
    category: "Exploration",
    icon: Heart,
    description: "Designing rest intervals and low-friction sleep hygiene frameworks around high-workload weeks.",
    conceptExample: "Pacing routines that scale down during peak deadline sprints.",
  },
  {
    title: "Fitness & Activity",
    category: "Exploration",
    icon: Dumbbell,
    description: "Structured movement plans that provide indoor alternatives when schedules or weather change.",
    conceptExample: "Fallback 20-minute movement sessions when regular workouts are cut short.",
  },
  {
    title: "Focus & Deep Work",
    category: "Phase 1 Hypothesis",
    icon: Target,
    description: "Time-blocking routines tailored to prime cognitive hours and protected focus windows.",
    conceptExample: "Morning distraction-free sprint blocks with realistic breaks.",
  },
  {
    title: "Skill Learning",
    category: "Exploration",
    icon: GraduationCap,
    description: "Self-paced study roadmaps broken into bite-sized modules that fit into small calendar gaps.",
    conceptExample: "15-minute conceptual reading blocks during daily commutes.",
  },
  {
    title: "Habit Formation",
    category: "Phase 1 Hypothesis",
    icon: Sparkles,
    description: "Anchor new habits to established routines, with reduced-effort fallbacks for busy days.",
    conceptExample: "Two-minute micro-habits designed to protect streak momentum.",
  },
  {
    title: "Financial Discipline",
    category: "Long-term Concept",
    icon: Wallet,
    description: "Budget allocations and savings frameworks aligned with personal lifestyle goals.",
    conceptExample: "Informational expense pacing models (not automated banking connections).",
  },
  {
    title: "Personal Projects",
    category: "Phase 1 Hypothesis",
    icon: Compass,
    description: "Turning open-ended creative and technical ambitions into sequential weekly milestones.",
    conceptExample: "Milestone breakdown for portfolio projects or writing goals.",
  },
  {
    title: "Custom Objectives",
    category: "Exploration",
    icon: Layers,
    description: "Freeform goals translated into structured routines through guided prompt decomposition.",
    conceptExample: "Scaffolding built around non-standard personal milestones.",
  },
];

export function GoalCards() {
  return (
    <section id="product-scope" className="py-20 md:py-28 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* First Release Scope Spotlight */}
        <div className="surface-card rounded-2xl p-6 sm:p-10 mb-16 border-indigo-500/20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300 uppercase tracking-wider mb-4">
              <span>First-Release Scope & Focus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Starting where daily plans break first: Focus, Habits, and Routine.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              Many productivity tools present rigid schedules that fall apart after the first unexpected delay. Bllumo&apos;s initial release focuses on high-agency individuals—professionals, students, and independent builders—who need realistic daily planning that adapts when meetings run late or energy drops.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08] text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Initial Audience
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Knowledge workers and self-directed learners managing variable weekly workloads.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Primary Problem
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Plan abandonment caused by inflexible calendars and accumulating overdue task backlogs.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  First Milestone
                </span>
                <p className="text-neutral-400 leading-relaxed">
                  Private alpha testing of the prompt-to-routine generator and real-time reschedule logic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Long-Term Domain Exploration Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Long-Term Platform Vision
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Broader domains under exploratory research.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            As the underlying architecture matures, we aim to extend personalized planning across additional life domains. The concepts below represent exploratory areas rather than currently operational integrations.
          </p>
        </div>

        {/* Grid of Explored Domains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GOAL_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            const isPhaseOne = domain.category === "Phase 1 Scope";
            return (
              <div
                key={domain.title}
                className={`surface-card rounded-xl p-5 flex flex-col justify-between transition-all ${
                  isPhaseOne ? "border-indigo-500/30 bg-indigo-950/10" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        isPhaseOne
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "text-neutral-400 bg-white/[0.04]"
                      }`}
                    >
                      {domain.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    {domain.title}
                  </h4>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {domain.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-neutral-400 block mb-0.5 uppercase">
                    Illustrative Example
                  </span>
                  <p className="text-xs text-neutral-300 italic">
                    &ldquo;{domain.conceptExample}&rdquo;
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Integration Boundary Notice */}
        <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center max-w-2xl mx-auto">
          <p className="text-xs text-neutral-400 leading-relaxed">
            <strong className="text-neutral-300">Important Architecture Note:</strong> Bllumo does not claim active connections to bank accounts, clinical health sensors, weather satellites, or third-party enterprise tools. Any future third-party syncs will be introduced transparently with opt-in user consent during subsequent development phases.
          </p>
        </div>
      </div>
    </section>
  );
}
