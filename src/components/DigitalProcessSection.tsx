"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import understandIcon from "@/assets/understand-icon.png";
import strategizeIcon from "@/assets/srategize-icon.png";
import createIcon from "@/assets/create-icon.png";
import activateIcon from "@/assets/activate-icon.png";
import optimizeIcon from "@/assets/optimize-icon.png";
import tIcon from "@/assets/t-icon.png";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: StaticImageData;
};

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We immerse ourselves in your business, audience, competitors, and goals to uncover opportunities for meaningful growth.",
    icon: understandIcon,
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "We define the right channels, messaging, content pillars, and campaign roadmap to achieve your objectives.",
    icon: strategizeIcon,
  },
  {
    number: "03",
    title: "Create",
    description:
      "We produce compelling content, campaigns, and creative assets that capture attention and inspire action.",
    icon: createIcon,
  },
  {
    number: "04",
    title: "Activate",
    description:
      "We launch across the right mix of social media, SEO, influencer marketing, and paid channels to maximize reach and impact.",
    icon: activateIcon,
  },
  {
    number: "05",
    title: "Optimize",
    description:
      "We monitor performance, uncover insights, and continuously refine our approach to improve results and drive long-term growth.",
    icon: optimizeIcon,
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <article className="w-[340px] shrink-0 lg:w-[380px]">
      <span className="text-[18px] font-medium tracking-[-0.02em] text-[var(--service-accent,#9DF560)]">
        {step.number}
      </span>

      <div className="mt-3 flex items-center gap-4">
        <Image
          src={step.icon}
          alt=""
          width={48}
          height={48}
          className="h-11 w-11 shrink-0 object-contain lg:h-12 lg:w-12"
        />
        <h3 className="text-[23.11px] font-medium leading-tight tracking-[-0.03em] text-white">
          {step.title}
        </h3>
      </div>

      <p className="mt-4 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/65">
        {step.description}
      </p>
    </article>
  );
}

export default function DigitalProcessSection() {
  const marqueeSteps = [...steps, ...steps];

  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-35 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 45%, transparent 70%)",
        }}
      />

      <div className="container relative">
        <div className="mx-auto max-w-[900px] text-center">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            Every{" "}
            <span className="font-semibold text-[var(--service-accent,#9DF560)]">Great</span> brand
            starts from a{" "}
            <em className="font-normal italic text-[var(--service-accent,#9DF560)]">
              Clear Process.
            </em>
          </h2>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-transparent to-[#0A0A0C] lg:w-40"
          />

          <div className="relative h-12 overflow-hidden">
            <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/20" />
            <div className="absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 animate-process-icon">
              <Image
                src={tIcon}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>

          <div className="mt-10 overflow-hidden lg:mt-12">
            <div className="flex w-max animate-process-marquee gap-10 lg:gap-14">
              {marqueeSteps.map((step, index) => (
                <ProcessCard key={`${step.title}-${index}`} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
