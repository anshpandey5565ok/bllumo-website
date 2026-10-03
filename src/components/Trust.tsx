"use client";

import { ShieldCheck, UserCheck, Scale } from "lucide-react";

export function Trust() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Privacy-conscious",
      badge: "Minimization",
      description:
        "We aim to collect only the information necessary to provide and improve Bllumo's services. We do not sell personal data for monetary compensation.",
    },
    {
      icon: UserCheck,
      title: "User control",
      badge: "Authority",
      description:
        "Our goal is to give users meaningful control over their information and personalized experiences, with complete visibility into used context.",
    },
    {
      icon: Scale,
      title: "AI with boundaries",
      badge: "Scope",
      description:
        "Bllumo is intended to support users with planning and organization. It is not intended to replace qualified professionals where medical or financial advice is required.",
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#07090E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Built with responsibility in mind.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            AI should be trustworthy, transparent, and grounded in realistic safeguards.
          </p>
        </div>

        {/* 3 Minimal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="surface-card rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/[0.04] text-[11px] text-neutral-500">
                  Built on ethical standards
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
