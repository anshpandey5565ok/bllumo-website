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
    title: "Tell Bllumo what you want",
    description:
      "Bllumo begins with your actual objective rather than forcing you into a predefined workflow. Whether fitness, habits, or productivity, express it naturally.",
    example: "“I want to lose weight sustainably while traveling frequently.”",
    icon: MessageSquarePlus,
  },
  {
    number: "02",
    title: "Bllumo understands you",
    description:
      "The platform is being designed to ask only the questions needed to understand your situation, preferences, constraints, and objective.",
    example: "Understands energy rhythms, weekly calendar limits, and previous constraints.",
    icon: HelpCircle,
  },
  {
    number: "03",
    title: "Bllumo builds around you",
    description:
      "Using your context, Bllumo generates a personalized plan, workflow, recommendations, and custom interface designed around your life.",
    example: "Constructs tailored daily routines with low-friction entry barriers.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Bllumo adapts",
    description:
      "Real life changes. Bllumo's vision is to adapt plans when circumstances change while keeping the user's underlying goal intact.",
    example: "Weather disrupts outdoor running → seamlessly shifts to an indoor mobility circuit.",
    icon: SlidersHorizontal,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 relative border-y border-white/[0.06] bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            From a goal to a personalized system
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            A continuous loop of understanding, generation, and dynamic adaptation designed to keep you moving forward.
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
                    <span className="text-xl font-mono font-bold text-neutral-300">
                      {step.number}
                    </span>
                    <div className="w-7 h-7 rounded-md bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                    Example Context
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
