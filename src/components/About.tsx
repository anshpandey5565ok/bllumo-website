"use client";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="surface-card rounded-2xl p-8 sm:p-10 border border-white/[0.08]">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 block font-semibold">
            Company & Team
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Building adaptive personal AI from India.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8 max-w-2xl">
            <p>
              Bllumo is an early-stage technology project exploring personal software that adapts dynamically to real-world schedule changes.
            </p>
            <p className="text-neutral-400">
              Rather than assuming uninterrupted linear time, our design direction centers on creating computational models of routines that degrade gracefully when unexpected events occur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08] text-xs">
            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1 uppercase">Project status</span>
              <span className="text-white font-medium block">Early-stage project</span>
              <span className="text-neutral-400 text-[11px]">Public operator details pending confirmation</span>
            </div>

            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1 uppercase">Status</span>
              <span className="text-emerald-400 font-medium block">Pre-launch</span>
              <span className="text-neutral-400 text-[11px]">Private Alpha In Preparation</span>
            </div>

            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1 uppercase">Location</span>
              <span className="text-neutral-300 font-medium block">India</span>
              <span className="text-neutral-400 text-[11px]">Company status pending confirmation</span>
            </div>

            <div>
              <span className="text-neutral-400 font-mono text-[11px] block mb-1 uppercase">General Inquiries</span>
              <a
                href="mailto:hello@bllumo.com"
                className="text-indigo-300 hover:text-indigo-200 underline font-medium block focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
              >
                hello@bllumo.com
              </a>
              <span className="text-neutral-400 text-[11px]">Primary Contact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
