import type { Metadata } from "next";
import DesignBrandingSolutionsSection from "@/components/DesignBrandingSolutionsSection";
import DesignClientLogosSection from "@/components/DesignClientLogosSection";
import DesignDifferenceSection from "@/components/DesignDifferenceSection";
import DesignFaqSection from "@/components/DesignFaqSection";
import DesignFeaturedProjectsSection from "@/components/DesignFeaturedProjectsSection";
import DesignFinalCtaSection from "@/components/DesignFinalCtaSection";
import DesignHeroSection from "@/components/DesignHeroSection";
import DesignOverlookedCtaSection from "@/components/DesignOverlookedCtaSection";
import DesignProcessSection from "@/components/DesignProcessSection";
import DesignQuoteCtaSection from "@/components/DesignQuoteCtaSection";
import DesignStrategySection from "@/components/DesignStrategySection";
import DesignTechMarqueeSection from "@/components/DesignTechMarqueeSection";
import Industries from "@/components/Industries";
import { getHomePage } from "@/lib/home";
import shade4 from "@/assets/Shade-4.png";
import shade2 from "@/assets/Shade-2.png";
import blogShade from "@/assets/blog-shade.png";
import servicesShade from "@/assets/services-shade.png";

export const metadata: Metadata = {
  title: "Design Services | Tamatos",
  description:
    "From business idea to market-leading brand. Tamatos designs brands that people see, recognize, and remember.",
};

export const revalidate = 0;

const softFade = {
  right:
    "radial-gradient(ellipse 75% 70% at 20% 50%, #000 0%, #000 32%, transparent 72%)",
  leftFromRight:
    "radial-gradient(ellipse 75% 70% at 80% 50%, #000 0%, #000 32%, transparent 72%)",
};

export default async function DesignPage() {
  const home = await getHomePage();

  return (
    <main
      className="relative"
      style={{
        overflowX: "clip",
        ["--service-accent" as string]: "#03E4AC",
        ["--service-accent-rgb" as string]: "3, 228, 172",
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
        <DesignHeroSection />
        <DesignStrategySection />
        <DesignBrandingSolutionsSection />
        <DesignOverlookedCtaSection />
      </div>

      {/* Every Great → FAQs — one wrapper, continuous soft shades (no hard cuts) */}
      <div className="relative overflow-x-clip">
        <div
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
          aria-hidden
        >
          {/* Left — Process + Logos */}
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

          {/* Right — Featured Projects */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blogShade.src}
            alt=""
            className="absolute right-[-8%] top-[18%] h-auto w-[min(55vw,680px)] max-w-none opacity-60"
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
            className="absolute left-[-8%] top-[52%] h-auto w-[min(56vw,700px)] max-w-none opacity-90"
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
            className="absolute right-[-6%] top-[42%] h-auto w-[min(42vw,520px)] max-w-none opacity-45"
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
          <DesignProcessSection />
          <DesignClientLogosSection />
          <DesignFeaturedProjectsSection />
          <DesignDifferenceSection />
          <Industries data={home?.industries} />
          <DesignQuoteCtaSection />
          <DesignTechMarqueeSection />
          <DesignFaqSection />
        </div>
      </div>

      <DesignFinalCtaSection />
    </main>
  );
}
