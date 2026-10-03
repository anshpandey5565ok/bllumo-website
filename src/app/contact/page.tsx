import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Mail, Shield, Scale, MapPin, Sparkles, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Direct communication channels for Bllumo: General inquiries, privacy requests, and legal notices.",
};

export default function ContactPage() {
  const contactChannels = [
    {
      title: "General Inquiries",
      description: "For questions about Bllumo, partnership proposals, and early-access updates.",
      email: "hello@bllumo.com",
      icon: Mail,
      accent: "from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      title: "Privacy & Data Inquiries",
      description: "For questions regarding your waitlist data, rights, or deletion requests.",
      email: "privacy@bllumo.com",
      icon: Shield,
      accent: "from-cyan-500/20 to-teal-500/10 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Legal & Regulatory",
      description: "For regulatory inquiries, intellectual property notices, and terms feedback.",
      email: "legal@bllumo.com",
      icon: Scale,
      accent: "from-purple-500/20 to-violet-500/10 text-purple-400 border-purple-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bllumo</span>
            </Link>
          </div>

          <div className="pb-8 border-b border-white/10 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Direct Communication
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Contact Bllumo
            </h1>
            <p className="text-base text-slate-300 max-w-2xl leading-relaxed">
              We welcome dialogue with prospective early users, technology partners, and researchers interested in adaptive personal AI systems.
            </p>
          </div>

          {/* Contact Inquiries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactChannels.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="rounded-2xl bg-[#0D111C]/80 border border-white/8 hover:border-white/20 p-6 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.accent} border flex items-center justify-center mb-5`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">{c.description}</p>
                  </div>

                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors pt-4 border-t border-white/5"
                  >
                    <span>{c.email}</span>
                  </a>
                </div>
              );
            })}
          </div>

          {/* Operational Details Card */}
          <div className="rounded-2xl bg-[#0D111C]/60 border border-white/8 p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Operational & Verification Context</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 pt-2">
              <div>
                <span className="text-slate-400 block mb-0.5">Operated by:</span>
                <span className="font-semibold text-white">Bllumo</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Country:</span>
                <span className="font-semibold text-white">India</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Startup Status:</span>
                <span className="text-cyan-300 font-semibold">Pre-launch / Under Development</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Physical Address Notice:</span>
                <span className="text-slate-400">
                  Private residential founder addresses are safeguarded from public web listings. Formal registered business entity details will be published upon regulatory incorporation completion.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
