import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import footerShade1 from "@/assets/footer-shade1.png";
import WorkHeroVideo from "@/components/WorkHeroVideo";
import WorkAwardsSection from "@/components/WorkAwardsSection";
import WorkPortfolioSection from "@/components/WorkPortfolioSection";
import CtaSection2 from "@/components/CtaSection2";
import { getHomePage } from "@/lib/home";
import {
  getPortfolioIndustryTags,
  getPortfolios,
  getPortfolioServiceTags,
} from "@/lib/portfolio";

const WORK_HERO_VIDEO = "/videos/we.mp4";

export const metadata: Metadata = {
  title: "Works — Tamatos",
  description:
    "Explore how Tamatos transforms ideas into design success stories through bold branding, UX, and development.",
};

export default async function WorkPage() {
  const [home, portfolios, services, industries] = await Promise.all([
    getHomePage(),
    getPortfolios(),
    getPortfolioServiceTags(),
    getPortfolioIndustryTags(),
  ]);

  return (
    <main>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <Image
          src={footerShade1}
          alt=""
          className="absolute pointer-events-none select-none left-0 -top-[40%] z-0"
        />

        <div className="container relative" style={{ zIndex: 1 }}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-6 xl:gap-10">
            <div className="w-full lg:basis-[60%] lg:shrink-0">
              <div
                className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-white/70 font-medium mb-8 lg:mb-10"
                style={{
                  fontSize: "18px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #ffffff26",
                  boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
                }}
              >
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-white">Works</span>
              </div>

              <h1
                className="text-white font-medium leading-[1.05]"
                style={{ fontSize: "clamp(40px, 4.8vw, 80px)", letterSpacing: "-0.04em" }}
              >
                <span className="block">
                  We Transform{" "}
                  <em className="italic text-white/50 font-normal">Ideas</em>
                </span>
                <span className="block mt-1">
                  Into Design <span className="text-[#9DF560]">Success</span>
                </span>
                <span className="flex flex-wrap items-center gap-x-4 gap-y-3 mt-1">
                  <span className="text-[#9DF560]">Stories.</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300 shrink-0"
                    style={{ fontSize: "clamp(16px, 1.15vw, 22px)", padding: "16px 32px", letterSpacing: "-0.02em" }}
                  >
                    Tell Us About Your Project
                  </Link>
                </span>
              </h1>
            </div>

            <div className="w-full lg:basis-[40%] lg:shrink-0">
              <WorkHeroVideo src={WORK_HERO_VIDEO} />
            </div>
          </div>
        </div>
      </section>

      <WorkAwardsSection data={home?.awards} />

      <WorkPortfolioSection
        items={portfolios}
        services={services}
        industries={industries}
      />

      <div className="pt-8 lg:pt-16">
        <CtaSection2 data={home?.finalCta} />
      </div>
    </main>
  );
}
