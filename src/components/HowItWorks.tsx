"use client";

import { MessageSquarePlus, HelpCircle, Layers, SlidersHorizontal, ArrowRight, CloudRain } from "lucide-react";

interface StepItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  examples: string[];
  icon: React.ElementType;
  badge: string;
}

const STEPS: StepItem[] = [
  {
    number: "01",
    title: "Tell Bllumo what you want",
    subtitle: "Starts with your objective, not software menus",
    description:
      "Bllumo begins with the user's actual objective rather than forcing them into a predefined workflow. Whether it is an ambitious fitness target or a complex lifestyle shift, you express it in your own words.",
    examples: [
      "“I want to lose weight in a sustainable way.”",
      "“I want to become more productive and regain focus.”",
      "“I want to manage my money better each month.”",
    ],
    icon: MessageSquarePlus,
    badge: "User Objective",
  },
  {
    number: "02",
    title: "Bllumo understands you",
    subtitle: "Targeted inquiry with zero unnecessary friction",
    description:
      "The platform is being designed to ask only the questions needed to understand the user's situation, preferences, constraints, and objective. No lengthy generic onboarding surveys or irrelevant data collection.",
    examples: [
      "Identifies time availability & energy rhythms",
      "Understands personal constraints & commitments",
      "Clarifies preferred pace and milestone markers",
    ],
    icon: HelpCircle,
    badge: "Smart Ingestion",
  },
  {
    number: "03",
    title: "Bllumo builds around you",
    subtitle: "Custom systems, recommendations, and custom UI",
    description:
      "Using the information provided, Bllumo creates a personalized plan, workflow, recommendations, and experience designed around the individual user.",
    examples: [
      "Generates an actionable, low-friction action plan",
      "Constructs tailored daily routines & check-ins",
      "Synthesizes custom tools needed for the goal",
    ],
    icon: Layers,
    badge: "Personalized Architecture",
  },
  {
    number: "04",
    title: "Bllumo adapts",
    subtitle: "Real life shifts without breaking your long-term goal",
    description:
      "Real life changes. Bllumo's vision is to adapt plans when circumstances change while keeping the user's underlying goal intact. When conditions shift, Bllumo recalibrates seamlessly.",
    examples: [
      "Heavy rain prevents outdoor cardio → adapts to an indoor routine",
      "Sudden meeting changes schedule → recalculates target window",
      "Travel pauses normal baseline → initiates temporary mobile protocol",
    ],
    icon: SlidersHorizontal,
    badge: "Dynamic Adaptation",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 relative bg-[#0D111C]/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3 block">
            THE ARCHITECTURE OF PERSONAL AI
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            From a goal to a personalized system
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See how Bllumo turns a simple ambition into an intelligent, continuously adapting operating layer for your life.
          </p>
        </div>

        {/* 4-Step Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 h-0.5 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 -z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="flex flex-col h-full rounded-2xl bg-[#070A12]/90 border border-white/8 p-6 lg:p-6 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-950/20"
                >
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-mono font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-2 font-semibold">
                    {step.badge}
                  </span>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed font-medium">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 flex-grow">
                    {step.description}
                  </p>

                  {/* Examples box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 mt-auto">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      {index === 0 ? "User Prompt Examples:" : index === 3 ? "Real-World Contexts:" : "How It Operates:"}
                    </span>
                    {step.examples.map((ex, i) => (
                      <div key={i} className="text-xs text-slate-300/90 leading-tight flex items-start gap-1.5">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
