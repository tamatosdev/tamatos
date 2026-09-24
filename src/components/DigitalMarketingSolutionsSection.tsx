"use client";

import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import socialMediaIcon from "@/assets/social-media-marketing-icon.png";
import searchEngineIcon from "@/assets/Search-engine-icon.png";
import influencerIcon from "@/assets/Influencer-marketing-icon.png";
import emailWhatsappIcon from "@/assets/email-whatsapp-icon.png";
import contentStrategyIcon from "@/assets/content-strategy-icon.png";
import analyticsGrowthIcon from "@/assets/analytics-growth-icon.png";
import neonGreenArrow from "@/assets/neon-green-arrow.svg";

type DigitalService = {
  title: string;
  description: string;
  icon: StaticImageData;
};

const services: DigitalService[] = [
  {
    title: "Social Media Marketing",
    description:
      "Build a consistent and engaging presence with platform-specific strategies, content creation, and community management.",
    icon: socialMediaIcon,
  },
  {
    title: "Search Engine Optimization",
    description:
      "Increase your visibility, attract qualified traffic, and improve long-term search performance through technical, on-page, and content SEO.",
    icon: searchEngineIcon,
  },
  {
    title: "Influencer Marketing",
    description:
      "Partner with the right creators to build trust, expand your reach, and connect with audiences authentically.",
    icon: influencerIcon,
  },
  {
    title: "Email & WhatsApp Automation",
    description:
      "Automate personalized email and WhatsApp campaigns to engage your audience, nurture leads, and drive conversions.",
    icon: emailWhatsappIcon,
  },
  {
    title: "Content Creation and Strategy",
    description:
      "Create purposeful content that educates, engages, and supports your customers throughout their journey.",
    icon: contentStrategyIcon,
  },
  {
    title: "Analytics & Growth Optimization",
    description:
      "Track performance, uncover insights, and continuously optimize campaigns to maximize your return on investment.",
    icon: analyticsGrowthIcon,
  },
];

const hoverGlowAt = [
  "100% 100%",
  "50% 100%",
  "0% 100%",
  "100% 0%",
  "50% 0%",
  "0% 0%",
] as const;

export default function DigitalMarketingSolutionsSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
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
            <span className="font-semibold text-[var(--service-accent,#9DF560)]">
              Digital Marketing
            </span>{" "}
            Solutions Designed For Growth
            <span className="text-[var(--service-accent,#9DF560)]">.</span>
          </h2>

          <p className="mt-6 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/80">
            Whether you&apos;re building brand awareness, generating leads, or scaling your
            business, we deliver marketing solutions tailored to your goals.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/5 p-8 shadow-[inset_5.33px_4px_10px_0_rgba(255,255,255,0.1)] lg:p-9"
            >
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

                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 text-[18px] font-medium leading-none tracking-[-0.03em] text-white transition-colors duration-300 hover:text-white/80"
                >
                  Learn More
                  <Image
                    src={neonGreenArrow}
                    alt=""
                    width={20}
                    height={16}
                    className="h-4 w-5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
