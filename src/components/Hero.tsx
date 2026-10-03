"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Activity,
  Calendar,
  CloudRain,
  Brain,
  CheckCircle2,
  Sliders,
  RefreshCw,
  Compass,
  Zap,
} from "lucide-react";

interface GoalScenario {
  id: string;
  category: string;
  userPrompt: string;
  understanding: {
    context: string;
    constraints: string;
    cadence: string;
  };
  personalizedPlan: {
    title: string;
    focus: string;
    action: string;
  };
  adaptationEvent: {
    trigger: string;
    response: string;
    status: string;
  };
}

const DEMO_GOALS: GoalScenario[] = [
  {
    id: "fitness",
    category: "Fitness & Vitality",
    userPrompt: "I want to improve my endurance and build functional strength.",
    understanding: {
      context: "45 mins available on weekdays, preference for outdoor cardio",
      constraints: "Previous knee strain, irregular meeting schedules",
      cadence: "4 sessions weekly with progressive overload",
    },
    personalizedPlan: {
      title: "Adaptive Cardio & Mobility System",
      focus: "Aerobic base building + joint stability sequence",
      action: "Tuesday 7:00 AM: 5km low-heartrate tempo run",
    },
    adaptationEvent: {
      trigger: "Storm warning & torrential rain at 6:45 AM",
      response: "Dynamically adjusted to 35-min indoor kettlebell & mobility circuit without altering weekly endurance target.",
      status: "Adapted seamlessly",
    },
  },
  {
    id: "productivity",
    category: "Deep Productivity",
    userPrompt: "I want to protect deep focus time and stop context switching.",
    understanding: {
      context: "Creative knowledge work, high inbound Slack notifications",
      constraints: "Peak cognitive clarity between 9 AM and 12 PM",
      cadence: "Daily 90-minute protected sprint blocks",
    },
    personalizedPlan: {
      title: "Context-Shielded Flow Routine",
      focus: "Asynchronous communication batching + priority anchoring",
      action: "9:00 AM - 10:30 AM: Deep focus sprint on core roadmap",
    },
    adaptationEvent: {
      trigger: "Urgent emergency client review scheduled for 10:00 AM",
      response: "Preserved flow by carving out an afternoon deep work block at 2:30 PM with zero notification interruptions.",
      status: "Rescheduled intelligently",
    },
  },
  {
    id: "finance",
    category: "Financial Habit",
    userPrompt: "I want to build a disciplined emergency buffer and control impulsive spending.",
    understanding: {
      context: "Fixed monthly salary, irregular weekend dining expenses",
      constraints: "High fixed rent, desire to preserve social freedom",
      cadence: "Weekly discretionary envelope tracking",
    },
    personalizedPlan: {
      title: "Autonomous Cashflow Buffer",
      focus: "Rule-based milestone allocation + automated nudge triggers",
      action: "Auto-sweep 15% to high-yield reserve before discretionary spend",
    },
    adaptationEvent: {
      trigger: "Unplanned car repair expense of $320",
      response: "Recalibrated weekly dining allowance across the remaining two weeks to maintain the core monthly emergency reserve target.",
      status: "Budget rebalanced",
    },
  },
];

export function Hero() {
  const [activeGoalIndex, setActiveGoalIndex] = useState(0);
  const activeGoal = DEMO_GOALS[activeGoalIndex];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Radial Glow & Sub-grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] md:w-[1000px] md:h-[600px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold tracking-wider uppercase text-slate-300 backdrop-blur-md mb-6 shadow-sm hover:border-indigo-500/30 transition-colors">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="bg-gradient-to-r from-slate-200 via-indigo-200 to-cyan-300 bg-clip-text text-transparent font-medium">
              THE PERSONAL AI PLATFORM — COMING SOON
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
            AI that builds <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              around your life.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-slate-300/90 leading-relaxed font-normal max-w-2xl mb-9">
            Bllumo is building a personalized AI platform that understands what you want to achieve, creates an experience around your needs, and adapts as your life changes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-5">
            <Link
              href="#waitlist"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] transition-all duration-200"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <span>See How Bllumo Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          {/* Small sub-text */}
          <p className="text-xs text-slate-400 max-w-md">
            Early access is currently being prepared. Join the waitlist for product updates and launch access.
          </p>
        </div>

        {/* Abstract Product Concept Visual */}
        <div id="product-concept" className="mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="relative rounded-2xl md:rounded-3xl border border-white/10 bg-[#0D111C]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
            {/* Top Concept Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2">bllumo.orchestrator // personal-system</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Product concept
                </span>
              </div>
            </div>

            {/* Interactive Concept Switcher */}
            <div className="px-6 pt-5 pb-3 border-b border-white/5 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-2">
                Simulate Goal:
              </span>
              {DEMO_GOALS.map((goal, idx) => (
                <button
                  key={goal.id}
                  onClick={() => setActiveGoalIndex(idx)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    activeGoalIndex === idx
                      ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {goal.category}
                </button>
              ))}
            </div>

            {/* Pipeline Walkthrough Visual */}
            <div className="p-6 md:p-8 space-y-6">
              {/* 1. Goal Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  <Compass className="w-3.5 h-3.5" />
                  <span>1. User Objective</span>
                </div>
                <div className="p-4 rounded-xl bg-[#070A12] border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-sm md:text-base font-medium text-white italic">
                      &ldquo;{activeGoal.userPrompt}&rdquo;
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 hidden sm:inline font-mono">natural voice / text</span>
                </div>
              </div>

              {/* Connecting Flow indicator */}
              <div className="flex items-center justify-center">
                <div className="w-px h-6 bg-gradient-to-b from-indigo-500 to-purple-500" />
              </div>

              {/* 2. Understanding */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                  <Brain className="w-3.5 h-3.5" />
                  <span>2. Understanding & Context Extraction</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">Real-world Context</span>
                    <p className="text-xs text-slate-200">{activeGoal.understanding.context}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">Constraints & Bounds</span>
                    <p className="text-xs text-slate-200">{activeGoal.understanding.constraints}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] uppercase font-mono text-slate-400 block mb-1">Calibrated Cadence</span>
                    <p className="text-xs text-slate-200">{activeGoal.understanding.cadence}</p>
                  </div>
                </div>
              </div>

              {/* Connecting Flow indicator */}
              <div className="flex items-center justify-center">
                <div className="w-px h-6 bg-gradient-to-b from-purple-500 to-cyan-500" />
              </div>

              {/* 3 & 4. Plan & Dynamic Adaptation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 3. Personalized Plan */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/30 to-purple-950/20 border border-indigo-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-400" />
                      3. Personalized System
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Generated Plan
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{activeGoal.personalizedPlan.title}</h4>
                    <p className="text-xs text-slate-300 mb-2">{activeGoal.personalizedPlan.focus}</p>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-indigo-200 font-mono">
                      {activeGoal.personalizedPlan.action}
                    </div>
                  </div>
                </div>

                {/* 4. Adaptive Experience */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/30 to-slate-900/40 border border-cyan-500/30 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
                      4. Real-Life Adaptation
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                      {activeGoal.adaptationEvent.status}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1 font-medium">
                      <CloudRain className="w-3.5 h-3.5" />
                      <span>Context Shift: {activeGoal.adaptationEvent.trigger}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/40 border border-cyan-500/20 text-xs text-slate-200 leading-relaxed">
                      {activeGoal.adaptationEvent.response}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom flow badge */}
              <div className="pt-2 text-center">
                <span className="text-xs text-slate-400 italic">
                  Flow: Goal &rarr; Understanding &rarr; Personalized Plan &rarr; Continuous Real-World Adaptation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
