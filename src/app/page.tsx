import Banner from "@/components/Banner";
import AboutStrip from "@/components/AboutStrip";
import LogoMarquee from "@/components/LogoMarquee";
import CtaSection from "@/components/CtaSection";
import ServicesSection from "@/components/ServicesSection";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import BlogSection from "@/components/BlogSection";
import CaseStudySection from "@/components/CaseStudySection";
import Image from "next/image";
import textimage from "@/assets/text-image2.png";
import Asterisk from "@/assets/asteric.png";
import shade1 from "@/assets/shade-1.png";
import shade2 from "@/assets/Shade-2.png";
import teamstructure from "@/assets/team-structure.png";
import AwardsSection from "@/components/AwardsSection";
import ReviewTab from "@/components/ReviewTab";
import Industries from "@/components/Industries";
import CtaSection2 from "@/components/CtaSection2";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="full-shade">
        <AboutStrip />
        <LogoMarquee />

        {/* About / agency statement
            The shade images must live in a full-width wrapper (not inside .container)
            so their absolute positioning is relative to the page edge, not the 1360px box */}
        <section className="relative py-12 lg:py-24">
          {/* Left shade — full-width wrapper gives left:0 = page left edge */}
          <Image
            src={shade1}
            alt=""
            width={800}
            height={400}
            className="absolute pointer-events-none select-none hidden lg:block"
            style={{ left: 0, top: "-11%", zIndex: 0 }}
          />

          <div className="container relative" style={{ zIndex: 1 }}>
            <div className="flex flex-col lg:flex-row">
              {/* Empty left spacer — desktop only */}
              <div className="hidden lg:block lg:w-2/5" />

              {/* Content */}
              <div className="w-full lg:w-3/5">
                <h2
                  className="text-white font-medium leading-[1.2] tracking-[-0.04em] mb-6"
                  style={{ fontSize: "clamp(20px, 3.2vw, 46px)" }}
                >
                  <Image
                    src={Asterisk}
                    alt="*"
                    width={39}
                    height={41}
                    className="inline-block w-5 sm:w-7 lg:w-9.75 h-auto mr-2 sm:mr-5 lg:mr-25"
                    style={{ verticalAlign: "middle" }}
                  />
                  Tamatos is a design-led agency that combines bold branding,{" "}
                  <span className="text-white/70">
                    intuitive UX, &amp; clean code{" "}
                    <Image
                      src={textimage}
                      alt="*"
                      width={137}
                      height={54}
                      className="inline-block w-17.5 sm:w-23.75 lg:w-34.25 h-auto"
                      style={{ verticalAlign: "middle" }}
                    />{" "}
                    so your brand doesn&apos;t just look good. It performs.
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* Right shade — right:0 = page right edge */}
          <Image
            src={shade2}
            alt=""
            width={800}
            height={400}
            className="absolute pointer-events-none select-none hidden lg:block"
            style={{ right: 0, top: "90%", zIndex: 0 }}
          />
        </section>

        <CtaSection />

        {/* Numbers Section */}
        <section className="container py-12 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3">

            {/* Column 1 */}
            <div className="md:pr-12 lg:pr-16 pb-10 md:pb-0 border-b md:border-b-0 border-white/10">
              <p className="text-white font-normal leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)", letterSpacing: "-0.05em" }}>
                +200%
              </p>
              <p className="text-white font-medium mt-4 lg:mt-6 mb-3" style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em" }}>
                Avg. engagement uplift
              </p>
              <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "clamp(13px, 1vw, 16px)", letterSpacing: "-0.03em" }}>
                Flows redesigned to turn curious visitors into paying customers
              </p>
            </div>

            {/* Column 2 */}
            <div className="md:px-12 lg:px-16 pt-10 md:pt-0 pb-10 md:pb-0 border-b md:border-b-0 border-white/10">
              <p className="text-white font-normal leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)", letterSpacing: "-0.05em" }}>
                3.8×
              </p>
              <p className="text-white font-medium mt-4 lg:mt-6 mb-3" style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em" }}>
                Revenue growth after brand overhaul
              </p>
              <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "clamp(13px, 1vw, 16px)", letterSpacing: "-0.03em" }}>
                Identity systems that build instant trust and command attention
              </p>
            </div>

            {/* Column 3 */}
            <div className="md:pl-12 lg:pl-16 pt-10 md:pt-0">
              <p className="text-white font-normal leading-none" style={{ fontSize: "clamp(52px, 8vw, 120px)", letterSpacing: "-0.05em" }}>
                -40%
              </p>
              <p className="text-white font-medium mt-4 lg:mt-6 mb-3" style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em" }}>
                Drop-off rate reduced
              </p>
              <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "clamp(13px, 1vw, 16px)", letterSpacing: "-0.03em" }}>
                Smarter UX and onboarding that keeps users from walking away
              </p>
            </div>

          </div>
        </section>

        <ServicesSection />

        {/* Compare strip + scroll reveal */}
        <div className="relative overflow-hidden">
          <section className="container py-8 lg:py-16 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-0">

              <p
                className="text-white/70 font-normal leading-normal"
                style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}
              >
                Most agencies = Either design well OR market well
              </p>

              <div className="hidden sm:block self-stretch w-px mx-8 lg:mx-16" style={{ background: "#FFFFFF80" }} />

              <p
                className="text-white text-left sm:text-right font-medium"
                style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}
              >
                tamatos = Bridges Product + Growth
              </p>

            </div>
          </section>

          <ScrollTextReveal
            text="So, We don't just design pretty interfaces we build products that convert, scale, and grow."
            highlights={{ grow: "#9DF560" }}
          />
        </div>
      </div>

      <CaseStudySection />

      <section className="py-24">
  <div className="container mx-auto px-5">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <div>
    
        <Image
          src={teamstructure}
          alt="Our Team Structure"
          width={650}
          height={660}
          className="w-full rounded-[20px] object-cover"
        />
      </div>

      <div className="pl-3.5">

        <h2 className="text-[60px] leading-[1.1] font-medium tracking-[-0.03em]">
          Digital design experts <br />
          who<span className="text-[#9DF560] italic"> Fuel Growth.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">

          <div>
            <p className="text-[18px] leading-[1.5] text-white/80">
              Your digital design and development partner for high-impact
              results
            </p>
          </div>

          <div>
            <p className="text-[18px] leading-[1.5] text-white/80">
              A global team that understands your market, users, and how to
              make products win
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>

      <AwardsSection />
      <ReviewTab />
      <Industries />
      <BlogSection />
      <CtaSection2 />

    </main>
  );
}
