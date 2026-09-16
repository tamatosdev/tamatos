"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import discoverIcon from "@/assets/Discover icon.png";
import defineIcon from "@/assets/Define icon.png";
import designIcon from "@/assets/Design icon.png";
import refineIcon from "@/assets/Refine icon.png";
import deliverIcon from "@/assets/Deliver icon.png";
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
    title: "Discover",
    description:
      "We begin by understanding your business, goals, audience, competitors, and market to uncover what makes your brand unique.",
    icon: discoverIcon,
  },
  {
    number: "02",
    title: "Define",
    description:
      "Together, we shape your brand strategy, positioning, messaging, and personality to create a strong foundation.",
    icon: defineIcon,
  },
  {
    number: "03",
    title: "Design",
    description:
      "With strategy in place, we craft a visual identity that reflects your brand and connects with your audience.",
    icon: designIcon,
  },
  {
    number: "04",
    title: "Refine",
    description:
      "We collaborate closely, gather feedback, and fine-tune every detail until the identity feels right.",
    icon: refineIcon,
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "We package everything into a comprehensive brand system and guidelines, ensuring consistency across every touchpoint.",
    icon: deliverIcon,
  },
];

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <article className="w-[340px] shrink-0 lg:w-[380px]">
      <span className="text-[18px] font-medium tracking-[-0.02em] text-[var(--service-accent,#03E4AC)]">
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

export default function DesignProcessSection() {
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
            Every <span className="font-semibold text-[var(--service-accent,#03E4AC)]">Great</span> brand starts from a{" "}
            <em className="font-normal italic text-[var(--service-accent,#03E4AC)]">Clear Process.</em>
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
