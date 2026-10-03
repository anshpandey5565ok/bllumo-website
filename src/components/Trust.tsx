"use client";

import { ShieldCheck, UserCheck, Scale, Lock } from "lucide-react";

export function Trust() {
  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "Privacy-conscious",
      description:
        "We aim to collect only the information necessary to provide and improve Bllumo's services. We do not sell personal data for monetary compensation and design for strict data minimization from day one.",
      badge: "Data Minimization",
      accent: "from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      icon: UserCheck,
      title: "User control",
      description:
        "Our goal is to give users meaningful control over their information and personalized experiences. You retain visibility and authority over what context the platform uses.",
      badge: "Empowerment",
      accent: "from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30",
    },
    {
      icon: Scale,
      title: "AI with boundaries",
      description:
        "Bllumo is intended to support users with information, planning, organization, and personalized experiences. It is not intended to replace qualified professionals where professional advice is required.",
      badge: "Ethical Scope",
      accent: "from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/30",
    },
  ];

  return (
    <section id="trust" className="py-20 md:py-28 relative bg-[#0D111C]/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 mb-3 block">
            PRINCIPLES & INTEGRITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Built with responsibility in mind.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            AI should be trustworthy, transparent, and grounded in realistic safeguards. Here is how we approach building Bllumo.
          </p>
        </div>

        {/* 3 Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-[#070A12]/90 border border-white/8 hover:border-white/20 p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.accent} border flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <span className="text-xs text-slate-400">
                    Transparent design standards
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Boundary Sub-card */}
        <div className="mt-10 p-5 rounded-2xl bg-white/[0.02] border border-white/5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Responsible AI notice:</strong> We use reasonable administrative, technical, and organizational measures designed to protect information. Bllumo does not claim unhackable or absolute security, and does not provide certified medical diagnosis or registered financial advisory services.
          </div>
        </div>
      </div>
    </section>
  );
}
