"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import brandStrategyIcon from "@/assets/Brand Strategy icon.png";
import brandIdentityIcon from "@/assets/Brand Identity.png";
import logoDesignIcon from "@/assets/logo Design.png";
import socialMediaDesignIcon from "@/assets/Social Media Design.png";
import printMarketingIcon from "@/assets/Print & Marketing Collateral.png";
import pitchDeckIcon from "@/assets/Pitch Deck Design.png";

type BrandingService = {
  title: string;
  description: string;
  icon: StaticImageData;
};

const services: BrandingService[] = [
  {
    title: "Brand Strategy",
    description:
      "We define your brand's purpose, positioning, and messaging to build a strong foundation for growth.",
    icon: brandStrategyIcon,
  },
  {
    title: "Brand Identity",
    description:
      "We create cohesive visual systems with colours, typography, and guidelines that make your brand recognizable.",
    icon: brandIdentityIcon,
  },
  {
    title: "Logo Design",
    description:
      "We design distinctive, memorable logos that capture your brand essence across every touchpoint.",
    icon: logoDesignIcon,
  },
  {
    title: "Social Media Design",
    description:
      "We craft scroll-stopping social assets and templates that keep your brand consistent across platforms.",
    icon: socialMediaDesignIcon,
  },
  {
    title: "Print & Marketing Collateral",
    description:
      "From business cards to brochures, we design polished print materials that leave a lasting impression.",
    icon: printMarketingIcon,
  },
  {
    title: "Pitch Deck Design",
    description:
      "We build compelling pitch decks that tell your story clearly and help you win investors and clients.",
    icon: pitchDeckIcon,
  },
];

/**
 * Glow origin per card — as if one var(--service-accent,#03E4AC) circle sits in the center of the 2×3 grid.
 * Top row: light comes from the bottom (toward center)
 * Bottom row: light comes from the top (toward center)
 */
const hoverGlowAt = [
  "100% 100%", // top-left      → bottom-right
  "50% 100%", // top-middle    → bottom-center
  "0% 100%", // top-right     → bottom-left
  "100% 0%", // bottom-left   → top-right
  "50% 0%", // bottom-middle → top-center
  "0% 0%", // bottom-right  → top-left
] as const;

export default function DesignBrandingSolutionsSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(139, 92, 246, 0.15) 45%, transparent 70%)",
        }}
      />

      <div className="container relative">
        <div className="max-w-[900px]">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            Holistic{" "}
            <span className="font-semibold text-[var(--service-accent,#03E4AC)]">Branding Solutions</span> To Help Your
            Business Stand Out
            <span className="text-[var(--service-accent,#03E4AC)]">.</span>
          </h2>

          <p className="mt-6 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/80">
            Whether you&apos;re launching a new business or redefining an existing one, we create
            cohesive brand experiences that build trust, improve recognition, and support long-term
            growth.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/5 p-8 shadow-[inset_5.33px_4px_10px_0_rgba(255,255,255,0.1)] lg:p-9"
            >
              {/* Individual hover shade — direction faces grid center */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse 130% 110% at ${hoverGlowAt[index]}, rgba(var(--service-accent-rgb), 0.65) 0%, rgba(var(--service-accent-rgb), 0.28) 42%, transparent 78%)`,
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <Image
                  src={service.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain lg:h-14 lg:w-14"
                />

                <h3 className="mt-6 text-[21.33px] font-medium leading-tight tracking-[-0.03em] text-white lg:text-[23.11px]">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/65">
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
