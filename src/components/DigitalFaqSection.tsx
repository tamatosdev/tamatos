"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What digital marketing services do you offer?",
    answer:
      "We provide social media marketing, SEO, influencer marketing, performance marketing, content strategy, and growth optimization tailored to your business objectives.",
  },
  {
    question: "Do you create the content as well?",
    answer:
      "Yes. From strategy and copywriting to design, photography, video production, and campaign execution, we can manage the entire content creation process.",
  },
  {
    question: "Which social media platforms do you manage?",
    answer:
      "We develop strategies for platforms including Instagram, Facebook, LinkedIn, TikTok, YouTube, and others based on where your audience is most active.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "It depends on the service. Paid campaigns can generate results quickly, while SEO and organic marketing typically deliver stronger long-term growth over time.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track meaningful business metrics such as reach, engagement, website traffic, leads, conversions, and return on investment to continuously improve campaign performance.",
  },
];

function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10"
      aria-hidden
    >
      <svg
        width="12"
        height="16"
        viewBox="0 0 12 16"
        fill="none"
        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      >
        <path
          d="M6 1.5V12.5M6 12.5L2.5 9M6 12.5L9.5 9"
          stroke={open ? "var(--service-accent,#9DF560)" : "rgba(255,255,255,0.85)"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function DigitalFaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            Frequently{" "}
            <em className="font-normal italic text-white/45">Asked</em>{" "}
            Questions
            <span className="text-[var(--service-accent,#9DF560)]">.</span>
          </h2>

          <div>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-white/12 first:border-t first:border-white/12"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-5 py-6 text-left lg:py-7"
                  >
                    <span
                      className="pr-2 font-medium leading-[1.35] tracking-[-0.03em] text-white"
                      style={{ fontSize: "clamp(18px, 1.2vw, 18px)" }}
                    >
                      <span className="text-[var(--service-accent,#9DF560)]">Q. </span>
                      {faq.question}
                    </span>
                    <FaqToggleIcon open={isOpen} />
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[560px] pb-6 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/55 lg:pb-7">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
