"use client";

import { Mail, MapPin } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="surface-card rounded-2xl p-8 sm:p-10">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 block">
            Company
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Building adaptive personal AI.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8 max-w-2xl">
            <p>
              Bllumo is an early-stage technology startup working on personalized AI systems designed around individual goals and changing real-world needs.
            </p>
            <p>
              We believe the next generation of software will increasingly adapt itself to the person using it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] text-xs">
            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1">Status</span>
              <span className="text-white font-medium">Pre-launch / Under Development</span>
            </div>
            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1">Location</span>
              <span className="text-neutral-300">India</span>
            </div>
            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1">Inquiries</span>
              <a href="mailto:hello@bllumo.com" className="text-neutral-300 hover:text-white underline">
                hello@bllumo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
