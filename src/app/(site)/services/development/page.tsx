import type { Metadata } from "next";
import DevelopmentClientLogosSection from "@/components/DevelopmentClientLogosSection";
import DevelopmentDifferenceSection from "@/components/DevelopmentDifferenceSection";
import DevelopmentFaqSection from "@/components/DevelopmentFaqSection";
import DevelopmentFeaturedProjectsSection from "@/components/DevelopmentFeaturedProjectsSection";
import DevelopmentFinalCtaSection from "@/components/DevelopmentFinalCtaSection";
import DevelopmentChallengesSection from "@/components/DevelopmentChallengesSection";
import DevelopmentGoalsCtaSection from "@/components/DevelopmentGoalsCtaSection";
import DevelopmentGoalsSection from "@/components/DevelopmentGoalsSection";
import DevelopmentHeroSection from "@/components/DevelopmentHeroSection";
import DevelopmentMarketingSolutionsSection from "@/components/DevelopmentMarketingSolutionsSection";
import DevelopmentProcessSection from "@/components/DevelopmentProcessSection";
import DevelopmentQuoteCtaSection from "@/components/DevelopmentQuoteCtaSection";
import DevelopmentTechMarqueeSection from "@/components/DevelopmentTechMarqueeSection";
import Industries from "@/components/Industries";
import { getHomePage } from "@/lib/home";
import shade4 from "@/assets/Shade-4.png";
import shade2 from "@/assets/Shade-2.png";
import blogShade from "@/assets/blog-shade.png";
import servicesShade from "@/assets/services-shade.png";

export const metadata: Metadata = {
  title: "Development Services | Tamatos",
  description:
    "From idea to production-ready product. Tamatos builds digital products that scale with your business.",
};

export const revalidate = 0;

const softFade = {
  right:
    "radial-gradient(ellipse 75% 70% at 20% 50%, #000 0%, #000 32%, transparent 72%)",
  leftFromRight:
    "radial-gradient(ellipse 75% 70% at 80% 50%, #000 0%, #000 32%, transparent 72%)",
};

export default async function DevelopmentPage() {
  const home = await getHomePage();

  return (
    <main
      className="relative"
      style={{
        overflowX: "clip",
        ["--service-accent" as string]: "#FC7031",
        ["--service-accent-rgb" as string]: "252, 112, 49",
      }}
    >
      {/* Page start — services-shade top right (intrinsic size) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={servicesShade.src}
        alt=""
        className="pointer-events-none absolute right-0 top-0 z-0 max-w-none select-none object-right-top"
        aria-hidden
      />

      <div className="relative z-10">
        <DevelopmentHeroSection />
      </div>

      {/* Challenges → FAQs — one wrapper, continuous soft shades (same as design) */}
      <div className="relative overflow-x-clip">
        <div
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
          aria-hidden
        >
          {/* Left — Challenges + Goals */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shade4.src}
            alt=""
            className="absolute left-[-6%] top-[2%] h-auto w-[min(58vw,720px)] max-w-none opacity-95"
            style={{
              WebkitMaskImage: softFade.right,
              maskImage: softFade.right,
            }}
          />

          {/* Right — Marketing Solutions */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogShade.src}
            alt=""
            className="absolute right-[-8%] top-[12%] h-auto w-[min(55vw,680px)] max-w-none opacity-60"
            style={{
              WebkitMaskImage: softFade.leftFromRight,
              maskImage: softFade.leftFromRight,
            }}
          />

          {/* Left — Process + Logos */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shade4.src}
            alt=""
            className="absolute left-[-6%] top-[28%] h-auto w-[min(58vw,720px)] max-w-none opacity-95"
            style={{
              WebkitMaskImage: softFade.right,
              maskImage: softFade.right,
            }}
          />

          {/* Right — Featured Projects */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogShade.src}
            alt=""
            className="absolute right-[-8%] top-[38%] h-auto w-[min(55vw,680px)] max-w-none opacity-60"
            style={{
              WebkitMaskImage: softFade.leftFromRight,
              maskImage: softFade.leftFromRight,
            }}
          />

          {/* Left — Industries + Quote CTA */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shade4.src}
            alt=""
            className="absolute left-[-8%] top-[58%] h-auto w-[min(56vw,700px)] max-w-none opacity-90"
            style={{
              WebkitMaskImage: softFade.right,
              maskImage: softFade.right,
            }}
          />

          {/* Soft right near Difference / Quote */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shade2.src}
            alt=""
            className="absolute right-[-6%] top-[52%] h-auto w-[min(42vw,520px)] max-w-none opacity-45"
            style={{
              WebkitMaskImage: softFade.leftFromRight,
              maskImage: softFade.leftFromRight,
            }}
          />

          {/* Right — Technologies + FAQs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogShade.src}
            alt=""
            className="absolute right-[-10%] bottom-[2%] h-auto w-[min(58vw,720px)] max-w-none opacity-65"
            style={{
              WebkitMaskImage: softFade.leftFromRight,
              maskImage: softFade.leftFromRight,
            }}
          />
        </div>

        <div className="relative z-10">
          <DevelopmentChallengesSection />
          <DevelopmentGoalsSection />
          <DevelopmentGoalsCtaSection />
          <DevelopmentMarketingSolutionsSection />
          <DevelopmentProcessSection />
          <DevelopmentClientLogosSection />
          <DevelopmentFeaturedProjectsSection />
          <DevelopmentDifferenceSection />
          <Industries data={home?.industries} />
          <DevelopmentQuoteCtaSection />
          <DevelopmentTechMarqueeSection />
          <DevelopmentFaqSection />
        </div>
      </div>

      <DevelopmentFinalCtaSection />
    </main>
  );
}
