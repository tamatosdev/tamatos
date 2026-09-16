"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How long does a branding project typically take?",
    answer:
      "Every project is different, but most branding engagements take between 4–8 weeks depending on the scope.",
  },
  {
    question: "Do you offer branding for startups and established businesses?",
    answer:
      "Yes. Whether you're launching a new venture or refreshing an existing brand, we tailor our approach to your stage of growth.",
  },
  {
    question: "Can you redesign our existing brand?",
    answer:
      "Absolutely. We help businesses modernize, reposition, and refresh their brands while preserving the equity they've already built.",
  },
  {
    question: "Will I receive brand guidelines?",
    answer:
      "Yes. Every branding project includes comprehensive brand guidelines to ensure consistency across all platforms and future communications.",
  },
  {
    question: "Can you also design our website after branding?",
    answer:
      "Yes. Branding often becomes the foundation for website design, UI/UX, marketing materials, and digital experiences.",
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
        {/* Thin arrow: shaft + V head (points down by default) */}
        <path
          d="M6 1.5V12.5M6 12.5L2.5 9M6 12.5L9.5 9"
          stroke={open ? "var(--service-accent,#03E4AC)" : "rgba(255,255,255,0.85)"}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function DesignFaqSection() {
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
            <span className="text-[var(--service-accent,#03E4AC)]">.</span>
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
                      <span className="text-[var(--service-accent,#03E4AC)]">Q. </span>
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
