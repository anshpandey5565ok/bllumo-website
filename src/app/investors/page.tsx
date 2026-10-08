import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  Mail,
  Target,
  AlertCircle,
  Cpu,
  BarChart3,
  Users,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Milestone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Investor & Strategic Hypotheses",
  description:
    "Strategic hypotheses of Bllumo: Hypothesized target audience, problem formulation, product stage, differentiation, business model hypotheses, and development milestones.",
  alternates: {
    canonical: "https://www.bllumo.com/investors",
  },
  openGraph: {
    title: "Bllumo Strategic Hypotheses",
    description:
      "Strategic overview of Bllumo: Core problem hypothesis, initial audience target, and developmental roadmap.",
    url: "https://www.bllumo.com/investors",
  },
};

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main id="main-content" className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bllumo</span>
            </Link>
          </div>

          {/* Header */}
          <div className="pb-8 border-b border-white/[0.08] mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-4">
              <span>Strategic Briefing · Pre-Seed Hypotheses</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              Bllumo: Strategic Overview & Hypotheses
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              An unvarnished summary of our working hypotheses regarding customer demand, problem severity, product architecture, business models, and developmental milestones.
            </p>
          </div>

          {/* Core Content Grid */}
          <div className="space-y-10 text-neutral-300 text-xs sm:text-sm leading-relaxed">
            {/* 1. Initial Customer */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Target className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base sm:text-lg font-bold">1. Hypothesized Initial Customer Segment</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Our initial target hypothesis focuses on <strong className="text-white">knowledge workers, independent developers, and self-directed students</strong> who actively manage multiple competing priorities across project deadlines, skill acquisition, and personal routines.
              </p>
              <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.06] text-xs text-neutral-400 space-y-1">
                <span className="font-semibold text-neutral-200 block uppercase font-mono text-[11px]">Working Hypothesis Note</span>
                <p>
                  This target profile is an initial working hypothesis. Formal customer persona validation and demographic sizing will be refined as early waitlist participants are surveyed.
                </p>
              </div>
            </section>

            {/* 2. Problem Definition */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-lg font-bold">2. Working Problem Hypothesis</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                We hypothesize that conventional productivity applications fail when real-world schedule volatility breaks static calendar blocks, producing red overdue badges and cognitive fatigue that lead to rapid tool abandonment.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Rather than attributing failure to lack of user commitment, we hypothesize that personal planning tools require native constraint modeling that adapts gracefully to missed sessions.
              </p>
            </section>

            {/* 3. Product Stage & Architecture */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base sm:text-lg font-bold">3. Product Stage: Early Prototype & Alpha Preparation</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Bllumo is currently in early prototype development. The prompt decomposition and fallback scheduling mechanisms demonstrated on this site are illustrative product concepts rather than live production APIs.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-semibold text-white block mb-1">Current State</span>
                  <p className="text-neutral-400">Conceptual design prototypes, waitlist infrastructure, and runtime planning architecture.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-semibold text-white block mb-1">Target Next Step</span>
                  <p className="text-neutral-400">Closed private alpha with designated waitlist cohort to evaluate plan adherence.</p>
                </div>
              </div>
            </section>

            {/* 4. Evidence & Research */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-bold">4. Research Status & Verification Transparency</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                We do not claim completed large-scale empirical studies, randomized cohorts, or verified statistical retention benchmarks at this pre-launch stage.
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300 leading-relaxed space-y-1.5">
                <strong className="text-white block">Status of Empirical Evidence:</strong>
                <p className="text-neutral-400">
                  Our problem observations are informed by common challenges in task tracking and habit formation. Structured discovery interviews, formal user surveys, and quantifiable retention metrics will be gathered and published during the private alpha phase upon owner verification.
                </p>
              </div>
            </section>

            {/* 5. Team & Operating Context */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Users className="w-5 h-5 text-violet-400" />
                <h2 className="text-base sm:text-lg font-bold">5. Team & Operating Status</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Bllumo is an early-stage technology project. Public operator and company details are pending owner confirmation.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                Identity, company status, professional links, executive roles, and advisory appointments will be published only after confirmation.
              </p>
            </section>

            {/* 6. Differentiation Hypothesis */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base sm:text-lg font-bold">6. Core Differentiation (Working Hypotheses)</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Automatic rescheduling is widely available in existing tools. Bllumo hypothesizes differentiation around <strong className="text-white">constraint modeling and graceful fallback degradation</strong>:
              </p>
              <ul className="space-y-2 text-xs text-neutral-300 pl-4 list-disc">
                <li><strong className="text-white">Fallback alternatives:</strong> When scheduled blocks are disrupted, suggesting viable shorter variations instead of binary failure states.</li>
                <li><strong className="text-white">Forward replanning:</strong> Recalculating next steps without creating cumulative overdue guilt.</li>
                <li><strong className="text-white">Goal decomposition:</strong> Translating personal objectives into structured weekly actions.</li>
              </ul>
            </section>

            {/* 7. Business Model Hypothesis */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base sm:text-lg font-bold">7. Business Model (Hypothesis Under Evaluation)</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                We hypothesize a <strong className="text-white">freemium SaaS model</strong>, though no commercial pricing, tiers, or billing architectures have been finalized:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.06]">
                  <span className="font-semibold text-white block mb-1">Free Tier (Hypothesis)</span>
                  <p className="text-neutral-400">Core individual goal decomposition and manual routine pacing.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.06]">
                  <span className="font-semibold text-indigo-300 block mb-1">Pro Tier (Hypothesis)</span>
                  <p className="text-neutral-400">Automated dynamic replanning, multi-domain routines, and deeper context integration.</p>
                </div>
              </div>
            </section>

            {/* 8. Distribution Hypothesis */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base sm:text-lg font-bold">8. Distribution (Working Hypotheses)</h2>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                Distribution hypotheses focus on three exploratory channels:
              </p>
              <ol className="space-y-2 text-xs text-neutral-300 pl-4 list-decimal">
                <li><strong className="text-white">Curated waitlist onboarding:</strong> Controlled cohort testing with high-intent individuals.</li>
                <li><strong className="text-white">Shareable routine templates:</strong> Organic product discovery via user-generated routine frameworks.</li>
                <li><strong className="text-white">Transparent engineering documentation:</strong> Sharing technical progress on constraint-aware systems.</li>
              </ol>
            </section>

            {/* 9. Next Milestones */}
            <section className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2.5 text-white">
                <Milestone className="w-5 h-5 text-amber-400" />
                <h2 className="text-base sm:text-lg font-bold">9. Sequential Development Milestones (Roadmap)</h2>
              </div>
              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">Milestone 1</span>
                  <div>
                    <strong className="text-white block">Closed Private Alpha</strong>
                    <span className="text-neutral-400">Initial waitlist cohort testing to evaluate routine adherence and fallback usefulness.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">Milestone 2</span>
                  <div>
                    <strong className="text-white block">Constraint Solver Validation</strong>
                    <span className="text-neutral-400">Refining dynamic rescheduling algorithms based on qualitative cohort feedback.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-mono text-indigo-400 font-bold shrink-0">Milestone 3</span>
                  <div>
                    <strong className="text-white block">Public Beta Evaluation</strong>
                    <span className="text-neutral-400">Assessing broader release feasibility and testing monetization hypotheses.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Project Contact Action */}
            <div className="surface-card rounded-2xl p-8 border border-indigo-500/30 text-center space-y-4 bg-indigo-950/20">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Inquire About Strategic Collaboration
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                We welcome dialogue with advisors, researchers, and early partners interested in adaptive personal AI systems.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:hello@bllumo.com?subject=Strategic%20Inquiry%20-%20Bllumo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Project Inquiry (hello@bllumo.com)</span>
                </a>
              </div>
              <span className="text-[11px] text-neutral-400 block pt-1">
                Project communications channel
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
