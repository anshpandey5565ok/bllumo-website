"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: "What is Bllumo?",
    answer:
      "Bllumo is an AI platform currently under development. Our goal is to create highly personalized experiences around an individual's goals, circumstances, and preferences.",
  },
  {
    question: "Is Bllumo available now?",
    answer:
      "Not yet. Bllumo is currently being developed. You can join the waitlist to receive launch and early-access updates.",
  },
  {
    question: "What can Bllumo help with?",
    answer:
      "Our long-term vision includes personalized experiences across areas such as health, fitness, productivity, learning, habits, money management, lifestyle, and other personal goals. Initial availability may be more limited as the platform develops.",
  },
  {
    question: "Is Bllumo a chatbot?",
    answer:
      "Bllumo's vision goes beyond conversational AI. We are building a system designed to understand a goal, gather relevant context, create a personalized plan or experience, and adapt it over time.",
  },
  {
    question: "When will Bllumo launch?",
    answer:
      "We have not announced a public launch date yet. Join the waitlist to receive updates as we finalize our private alpha and public beta milestones.",
  },
  {
    question: "Will Bllumo be free?",
    answer:
      "Pricing and plan details have not yet been finalized. Early waitlist members will receive priority onboarding opportunities and launch notifications.",
  },
  {
    question: "How will Bllumo use my waitlist information?",
    answer: (
      <span>
        We use waitlist information to manage early-access interest and communicate relevant product and launch updates. We do not sell personal data. See our{" "}
        <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        for full details.
      </span>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32 relative bg-[#0D111C]/30 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 mb-3 block">
            CLARITY & TRANSPARENCY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-300">
            Everything you need to know about Bllumo, our development progress, and how early access works.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl bg-[#070A12]/90 border border-white/8 hover:border-white/15 transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-7 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-slate-300 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-400 bg-cyan-500/10 border-cyan-500/30" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Questions note */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Have an additional question? Reach out to us at{" "}
          <a
            href="mailto:hello@bllumo.com"
            className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
          >
            hello@bllumo.com
          </a>
        </div>
      </div>
    </section>
  );
}
