"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import webIcon from "@/assets/web-icon.png";
import mobileAppIcon from "@/assets/mobile-app.png";
import ecommerceIcon from "@/assets/e-com-icon.svg";
import saasPlatformIcon from "@/assets/saas-platform.png";
import customWebIcon from "@/assets/custom-web.png";
import customerPortalIcon from "@/assets/customer-portal.png";
import odooIcon from "@/assets/odoo.png";
import apiSystemIcon from "@/assets/api-system.png";
import aliWorkflowIcon from "@/assets/ali-workflow.png";

type DevelopmentService = {
  title: string;
  description: string;
  icon: StaticImageData | string;
};

const services: DevelopmentService[] = [
  {
    title: "Websites",
    description:
      "Fast, responsive websites built to strengthen your brand, engage users, and drive business growth.",
    icon: webIcon,
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile applications designed to deliver seamless experiences, strengthen customer engagement, and support business growth.",
    icon: mobileAppIcon,
  },
  {
    title: "E-Commerce Solutions",
    description:
      "Conversion-focused online stores built to deliver seamless shopping experiences and increase sales.",
    icon: ecommerceIcon,
  },
  {
    title: "SaaS Platforms",
    description:
      "Scalable software products designed with intuitive user experiences and long-term growth in mind.",
    icon: saasPlatformIcon,
  },
  {
    title: "Custom Web Applications",
    description:
      "Tailor-made solutions built around your unique workflows, processes, and business objectives.",
    icon: customWebIcon,
  },
  {
    title: "Customer Portals & Dashboards",
    description:
      "Track performance, uncover insights, and make informed decisions with powerful analytics, dashboards, and reporting.",
    icon: customerPortalIcon,
  },
  {
    title: "ODOO Implementation",
    description:
      "Implement and customize Odoo to manage your website, e-commerce, and business operations from one integrated platform.",
    icon: odooIcon,
  },
  {
    title: "API & System Integrations",
    description:
      "Connect your website or application with CRMs, ERPs, payment gateways, marketing platforms, and third-party services.",
    icon: apiSystemIcon,
  },
  {
    title: "AI Workflows & Agents",
    description:
      "Integrate AI capabilities, automations, APIs, and third-party systems to streamline operations, improve efficiency, and create smarter digital experiences.",
    icon: aliWorkflowIcon,
  },
];

/**
 * Glow origin per card — as if one accent circle sits in the center of the 3×3 grid.
 * Top row: light from bottom · Middle: from sides · Bottom: from top
 */
const hoverGlowAt = [
  "100% 100%", // top-left
  "50% 100%", // top-middle
  "0% 100%", // top-right
  "100% 50%", // mid-left
  "50% 50%", // mid-middle
  "0% 50%", // mid-right
  "100% 0%", // bottom-left
  "50% 0%", // bottom-middle
  "0% 0%", // bottom-right
] as const;

export default function DevelopmentMarketingSolutionsSection() {
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
            What We{" "}
            <span className="font-semibold text-[var(--service-accent,#FC7031)]">Deliver</span>
            <span className="text-[var(--service-accent,#FC7031)]">.</span>
          </h2>
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

                <p className="mt-4 flex-1 text-[16px] leading-[1.55] tracking-[-0.02em] text-white/65">
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
