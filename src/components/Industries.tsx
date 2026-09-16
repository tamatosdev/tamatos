"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import industrialIcon from "@/assets/industrial-icon.svg";
import saasIcon from "@/assets/Saas-and-tech-icon.svg";
import ecommerceIcon from "@/assets/Ecommerce-icon.svg";
import foodIcon from "@/assets/food-icon.png";
import healthcareIcon from "@/assets/healthcare-icon.png";
import industryImage from "@/assets/industry-image.png";
import type { IndustriesData } from "@/lib/home";

type IndustryTab = {
  title: string;
  subtitle: string;
  description: string;
  icon: StaticImageData | string;
  image?: StaticImageData | string;
  imageAlt?: string;
};

const defaultIndustries: IndustryTab[] = [
  {
    title: "Industrial, Energy & Distribution",
    subtitle: "Manufacturing · Engineering · Logistics.",
    description:
      "We help industrial organizations simplify complex operations, connect critical systems, and build digital infrastructure that keeps business moving forward.",
    icon: industrialIcon,
    image: industryImage,
  },
  {
    title: "SaaS & Tech Startups",
    subtitle: "Product Design · Dashboards · Growth Systems.",
    description:
      "We partner with SaaS and tech teams to design clear products, scalable interfaces, and experiences that help users adopt, stay, and grow.",
    icon: saasIcon,
    image: industryImage,
  },
  {
    title: "Ecommerce & Consumer Retail",
    subtitle: "Storefronts · Conversion · Brand Experience.",
    description:
      "We build ecommerce experiences that look sharp, convert better, and keep your brand consistent from first click to checkout.",
    icon: ecommerceIcon,
    image: industryImage,
  },
  {
    title: "Food & Beverage / Hospitality",
    subtitle: "Branding · Ordering · Guest Experience.",
    description:
      "We help food, beverage, and hospitality brands create memorable digital touchpoints that drive discovery, orders, and loyalty.",
    icon: foodIcon,
    image: industryImage,
  },
  {
    title: "Healthcare, Pharma & Aesthetics",
    subtitle: "Trust · Clarity · Patient Experience.",
    description:
      "We design healthcare and aesthetics experiences that feel credible, clear, and human — so patients and clients know exactly what to do next.",
    icon: healthcareIcon,
    image: industryImage,
  },
];

function TabArrow({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 20 16"
      fill="none"
      aria-hidden
      className="shrink-0 transition-colors duration-300"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z"
        fill={active ? "#0A0A0C" : "currentColor"}
      />
    </svg>
  );
}

function Subtitle({ text }: { text: string }) {
  const cleaned = (text ?? "").replace(/\.$/, "").trim();
  const parts = cleaned.split(/\s*[·•]\s*/).filter(Boolean);

  return (
    <p
      className="font-medium leading-snug tracking-[-0.03em] text-white"
      style={{ fontSize: "clamp(17.78px, 1.6vw, 24.89px)" }}
    >
      {parts.map((part, index) => (
        <Fragment key={`${part}-${index}`}>
          {index > 0 ? <span className="text-[var(--service-accent,#9DF560)]"> · </span> : null}
          {part}
        </Fragment>
      ))}
      <span className="text-[var(--service-accent,#9DF560)]">.</span>
    </p>
  );
}

export default function IndustriesSection({ data }: { data?: IndustriesData }) {
  const subheading =
    data?.subheading ??
    "We partner with ambitious businesses across a diverse range of industries.";

  const industries: IndustryTab[] =
    data?.items?.length
      ? data.items.map((item) => ({
          title: item.title ?? "",
          subtitle: item.subtitle ?? "",
          description: item.description ?? "",
          icon: item.icon?.url || industrialIcon,
          image: item.image?.url || industryImage,
          imageAlt: item.image?.alt,
        }))
      : defaultIndustries;

  const [activeIndex, setActiveIndex] = useState(0);
  const active = industries[activeIndex] ?? industries[0];

  return (
    <section className="relative py-16 lg:py-28">
      <div className="container relative z-10">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            className="font-normal leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(28.44px, 3.13vw, 50.06px)" }}
          >
            Industries <span className="text-[var(--service-accent,#9DF560)]">We</span> Serve.
          </h2>
          <p className="mt-4 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/70 lg:mt-5 lg:text-[18px]">
            {subheading}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div className="flex flex-col justify-center">
            {industries.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`flex w-full items-center gap-4 border-b border-white/15 px-4 py-5 text-left transition-all duration-300 lg:gap-5 lg:px-5 lg:py-6 ${
                    isActive
                      ? "rounded-[16px] border-b-transparent bg-[var(--service-accent,#9DF560)] text-[#0A0A0C]"
                      : "text-white"
                  }`}
                >
                  {typeof item.icon === "string" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.icon}
                      alt=""
                      className={`h-8 w-8 shrink-0 object-contain lg:h-9 lg:w-9 ${
                        isActive ? "brightness-0" : ""
                      }`}
                    />
                  ) : (
                    <Image
                      src={item.icon}
                      alt=""
                      width={36}
                      height={36}
                      className={`h-8 w-8 shrink-0 object-contain lg:h-9 lg:w-9 ${
                        isActive ? "brightness-0" : ""
                      }`}
                    />
                  )}

                  <span
                    className="min-w-0 flex-1 font-medium leading-snug tracking-[-0.03em]"
                    style={{ fontSize: "clamp(18px, 1.25vw, 19.56px)" }}
                  >
                    {item.title}
                  </span>

                  <span className={isActive ? "text-[#0A0A0C]" : "text-white/70"}>
                    <TabArrow active={isActive} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[24px] border border-white/20 lg:min-h-[420px] lg:rounded-[28px]">
            {typeof active.image === "string" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.image}
                alt={active.imageAlt || active.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={active.image || industryImage}
                alt={active.imageAlt || active.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            )}

            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/30"
            />

            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-start p-7 lg:min-h-[420px] lg:p-10">
              <Subtitle text={active.subtitle} />
              <div className="mt-5 h-px w-1/2 bg-white/25 lg:mt-6" />
              <p className="mt-5 max-w-[480px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/85 lg:mt-6 lg:text-[18px]">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
