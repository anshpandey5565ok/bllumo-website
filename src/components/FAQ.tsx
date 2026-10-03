"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
      "We have not announced a public launch date yet. Join the waitlist to receive updates.",
  },
  {
    question: "Will Bllumo be free?",
    answer:
      "Pricing and plan details have not yet been finalized.",
  },
  {
    question: "How will Bllumo use my waitlist information?",
    answer: (
      <span>
        We use waitlist information to manage early-access interest and communicate relevant product and launch updates. See our{" "}
        <Link href="/privacy" className="text-neutral-300 underline underline-offset-2 hover:text-white">
          Privacy Policy
        </Link>{" "}
        for details.
      </span>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 relative border-t border-white/[0.06] bg-[#07090E]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-400">
            Common questions regarding Bllumo and the early access process.
          </p>
        </div>

        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-center justify-between gap-4 py-1 text-sm sm:text-base font-medium text-white hover:text-neutral-300 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-neutral-500">
          Have an additional question? Reach out to{" "}
          <a href="mailto:hello@bllumo.com" className="text-neutral-400 hover:text-white underline">
            hello@bllumo.com
          </a>
        </div>
      </div>
    </section>
  );
}
