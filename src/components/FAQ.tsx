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
      "Bllumo is an AI platform currently under active development. Our goal is to build personalized planning systems that turn your goals, preferences, and practical constraints into adaptable routines.",
  },
  {
    question: "Is Bllumo available to the public now?",
    answer:
      "Not yet. Bllumo is currently preparing for private alpha cohorts. Joining the waitlist allows you to follow our development progress and receive potential early-access opportunities.",
  },
  {
    question: "What will the first release focus on?",
    answer:
      "Our initial release centers on daily routines, focus time shielding, and habit consistency. Broader life domains will be introduced incrementally as our architecture matures.",
  },
  {
    question: "Does joining the waitlist guarantee access or priority?",
    answer:
      "No. Joining the waitlist is free and does not guarantee an invitation, launch position, or priority placement. Invitations will be rolled out gradually to ensure system stability and thoughtful feedback.",
  },
  {
    question: "When is the public launch date?",
    answer:
      "No public launch date has been announced. We are prioritizing thoughtful engineering and alpha validation over rushed timelines.",
  },
  {
    question: "Will Bllumo be free?",
    answer:
      "Pricing and tier structures have not yet been finalized. We plan to explore a freemium model with core planning features accessible for individual users.",
  },
  {
    question: "How is my waitlist information handled?",
    answer: (
      <span>
        We collect only your email (and optional name/interest) strictly to communicate project progress and early-access invitations. We do not sell personal data. Review our{" "}
        <Link href="/privacy" className="text-neutral-200 underline underline-offset-2 hover:text-white">
          Privacy Policy
        </Link>{" "}
        for complete details.
      </span>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 relative border-t border-white/[0.08] bg-[#07090E] scroll-mt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 block font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-300">
            Clear, straightforward answers about Bllumo&apos;s development and early access.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 text-sm sm:text-base font-medium text-white hover:text-neutral-200 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-150 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-2 pb-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-xs text-neutral-400">
          Have an additional question? Reach out directly to{" "}
          <a
            href="mailto:hello@bllumo.com"
            className="text-neutral-200 hover:text-white underline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2 rounded"
          >
            hello@bllumo.com
          </a>
        </div>
      </div>
    </section>
  );
}
