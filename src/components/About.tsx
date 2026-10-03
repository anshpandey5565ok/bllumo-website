"use client";

import { Building2, Compass, Cpu, Mail, Globe, MapPin } from "lucide-react";
import Link from "next/link";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0D111C]/60 border border-white/8 p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none -z-10" />

          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400 mb-3 block">
              ABOUT THE STARTUP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              Building adaptive personal AI.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              <p>
                Bllumo is an early-stage technology startup working on personalized AI systems designed around individual goals and changing real-world needs.
              </p>
              <p>
                We believe the next generation of software will increasingly adapt itself to the person using it—understanding objectives directly, orchestrating tailored daily experiences, and evolving alongside dynamic schedules.
              </p>
            </div>

            {/* Structured startup info matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Project Status
                </span>
                <span className="text-sm font-semibold text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Pre-launch / Under Development
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Jurisdiction & Origins
                </span>
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  India
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Direct Inquiries
                </span>
                <a
                  href="mailto:hello@bllumo.com"
                  className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  hello@bllumo.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
