"use client";

import { ShieldCheck, UserCheck, Scale } from "lucide-react";

export function Trust() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Data Minimization",
      badge: "Principle",
      description:
        "We collect only the minimum information necessary to communicate project updates and facilitate early access. We do not sell your personal data.",
    },
    {
      icon: UserCheck,
      title: "User Agency & Portability",
      badge: "Control",
      description:
        "You retain direct control over your communications preferences and waitlist participation, with simple unsubscription and deletion mechanisms available at any time.",
    },
    {
      icon: Scale,
      title: "Responsible Boundaries",
      badge: "Safeguards",
      description:
        "Bllumo is an organizational and personal planning system. It is not designed or authorized to provide licensed medical, legal, or financial advisory services.",
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 relative border-t border-white/[0.08] bg-[#07090E] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
            Principles & Safeguards
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Built with realistic safeguards and clear boundaries.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            We ground our product development in verifiable security practices and clear functional scope.
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

                <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs text-neutral-400">
                  Documented in our public policies
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
