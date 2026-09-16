"use client";

import { useState } from "react";

const cards = [
  {
    number: "01",
    title: "Strategy Before Execution",
    description:
      "Every campaign begins with a clear understanding of your business goals not just a content calendar.",
  },
  {
    number: "02",
    title: "Creativity That Performs",
    description:
      "We combine creative thinking with marketing strategy to produce work that captures attention and inspires action.",
  },
  {
    number: "03",
    title: "Data-Driven Decisions",
    description:
      "Every decision is guided by insights, testing, and measurable performance—not assumptions.",
  },
  {
    number: "04",
    title: "Built to Last",
    description: "We leverage AI where it creates genuine value...",
  },
];

export default function DigitalDifferenceSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <div className="max-w-[720px]">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            The <span className="text-[var(--service-accent,#9DF560)]">Tamatos</span>{" "}
            <em className="font-normal italic text-white/45">Difference</em>
            <span className="text-white/45">.</span>
          </h2>
          <p className="mt-5 text-[18px] leading-[1.5] tracking-[-0.02em] text-white/55 lg:text-[17.78px]">
            We Don&apos;t Just Market Brands. We Build Growth Engines.
          </p>
        </div>

        <div
          className="mt-12 flex flex-col gap-3 lg:mt-16 lg:h-[460px] lg:flex-row lg:gap-4"
          onMouseLeave={() => setActive(0)}
        >
          {cards.map((card, index) => {
            const isActive = active === index;

            return (
              <button
                key={card.number}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-pressed={isActive}
                className={`flex min-h-[280px] min-w-0 flex-col justify-between rounded-[24px] p-6 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0 lg:rounded-[28px] lg:p-8 ${
                  isActive
                    ? "border border-transparent bg-[var(--service-accent,#9DF560)] text-[#0A0A0C] lg:flex-[1.45_1_0%]"
                    : "border border-white/12 bg-white/[0.02] text-white lg:flex-[1_1_0%]"
                }`}
              >
                <span
                  className={`font-medium leading-[1.25] tracking-[-0.03em] ${
                    isActive ? "text-[#0A0A0C]" : "text-white"
                  }`}
                  style={{ fontSize: "clamp(18px, 1.15vw, 18px)" }}
                >
                  {card.title}
                </span>

                <div className="mt-10 flex min-w-0 flex-1 flex-col justify-end gap-5 lg:mt-0 lg:gap-6">
                  <span
                    className={`font-medium leading-none tracking-[-0.05em] ${
                      isActive ? "text-[#0A0A0C]" : "text-white"
                    }`}
                    style={{ fontSize: "clamp(56.89px, 7vw, 99.56px)" }}
                  >
                    {card.number}
                  </span>

                  <p
                    className={`min-w-0 text-[18px] leading-[1.45] tracking-[-0.02em] lg:text-[18px] ${
                      isActive
                        ? "max-w-[300px] text-[#0A0A0C]/90"
                        : "line-clamp-2 overflow-hidden text-ellipsis text-white/70"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
