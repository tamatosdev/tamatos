export const revalidate = 0;

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
import AwardsSection from "@/components/AwardsSection";
import ReviewTab from "@/components/ReviewTab";
import Industries from "@/components/Industries";
import CtaSection2 from "@/components/CtaSection2";
import footerShade1 from "@/assets/footer-shade1.png";
import footerShade2 from "@/assets/footer-shade2.png";
import circleShade from "@/assets/circle-shade.png";
import circleShade2 from "@/assets/circle-shade2.png";
import bigShade from "@/assets/big-shade.png";
import TeamOrbits from "@/components/Teamorbit";
import { getHomePage } from "@/lib/home";
import { buildJsonLd, buildPageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata() {
  const home = await getHomePage();
  return buildPageMetadata(home?.seo);
}

export default async function Home() {
  const home = await getHomePage();

  const agencyMain =
    home?.agencyStatement?.mainText ??
    "Tamatos is a design-led agency that combines bold branding,";
  const agencyDim =
    home?.agencyStatement?.dimText ??
    "intuitive UX, & clean code so your brand doesn't just look good. It performs.";
  const agencyInlineImage = home?.agencyStatement?.inlineImage?.url;

  const stats = home?.stats?.items?.length
    ? home.stats.items
    : [
        { value: "+200%", title: "Avg. engagement uplift", description: "Flows redesigned to turn curious visitors into paying customers" },
        { value: "3.8×", title: "Revenue growth after brand overhaul", description: "Identity systems that build instant trust and command attention" },
        { value: "-40%", title: "Drop-off rate reduced", description: "Smarter UX and onboarding that keeps users from walking away" },
      ];

  const compareLeft = home?.compareStrip?.leftText ?? "Most agencies = Either design well OR market well";
  const compareRight = home?.compareStrip?.rightText ?? "tamatos = Bridges Product + Growth";

  const teamHeadingLine1 = home?.team?.headingLine1 ?? "Digital Design Experts";
  const teamHeadingAccent = home?.team?.headingAccent ?? "Fuel Growth.";
  const teamCol1 = home?.team?.column1Text ?? "Your digital design and development partner for high-impact results";
  const teamCol2 = home?.team?.column2Text ?? "A global team that understands your market, users, and how to make products win";

  const jsonLd = buildJsonLd(home?.seo);

  return (
    <main style={{ overflowX: "clip" }}>
      <JsonLd data={jsonLd} />
      <Banner data={home?.hero} />
      <div className="full-shade relative">
        <Image
          src={bigShade}
          alt=""
          className="absolute pointer-events-none select-none left-1/2 top-[80%] sm:top-[80%] md:top-[60%] lg:top-1/2"
          style={{ transform: "translate(-50%, -50%)", zIndex: 0 }}
        />
        <AboutStrip data={home?.aboutStrip} />
        <div className="relative">
          <Image
            src={shade1}
            alt=""
            width={749}
            height={1961}
            className="block lg:hidden absolute pointer-events-none select-none w-48 opacity-90"
            style={{ left: 0, bottom: 0, zIndex: 0 }}
          />
          <LogoMarquee data={home?.logoMarquee} />
        </div>

        <section className="relative py-12 lg:py-24">
          <Image
            src={shade2}
            alt=""
            width={893}
            height={1961}
            className="block lg:hidden absolute pointer-events-none select-none w-52 opacity-100"
            style={{ right: 0, bottom: "5%", zIndex: 0 }}
          />
          <Image
            src={shade1}
            alt=""
            width={800}
            height={400}
            className="hidden lg:block absolute pointer-events-none select-none w-200 opacity-100"
            style={{ left: 0, bottom: "0%", zIndex: 0 }}
          />

          <div className="container relative" style={{ zIndex: 1 }}>
            <div className="flex flex-col lg:flex-row">
              <div className="hidden lg:block lg:w-2/5" />
              <div className="w-full lg:w-3/5">
                <h2
                  className="text-white font-medium leading-[1.4] tracking-[-0.04em] mb-6"
                  style={{ fontSize: "clamp(22px, 2.5vw, 46px)" }}
                >
                  <Image
                    src={Asterisk}
                    alt="*"
                    width={39}
                    height={41}
                    className="inline-block w-5 sm:w-7 lg:w-9.75 h-auto mr-2 sm:mr-5 lg:mr-25"
                    style={{ verticalAlign: "middle" }}
                  />
                  {agencyMain}{" "}
                  <span className="text-white/70">
                    {agencyDim}{" "}
                    {agencyInlineImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={agencyInlineImage}
                        alt={home?.agencyStatement?.inlineImage?.alt ?? ""}
                        className="inline-block w-17.5 sm:w-23.75 lg:w-34.25 h-auto"
                        style={{ verticalAlign: "middle" }}
                      />
                    ) : (
                      <Image
                        src={textimage}
                        alt="*"
                        width={137}
                        height={51}
                        className="inline-block w-17.5 sm:w-23.75 lg:w-34.25 h-auto"
                        style={{ verticalAlign: "middle" }}
                      />
                    )}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <Image
            src={shade2}
            alt=""
            width={800}
            height={400}
            className="hidden lg:block absolute pointer-events-none select-none w-200 opacity-100"
            style={{ right: 0, top: "-100%", zIndex: 0 }}
          />
        </section>

        <CtaSection data={home?.ctaSection} />

        <section className="container py-12 lg:py-24 relative">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.title ?? index}
                className={`${index === 0 ? "md:pr-6 lg:pr-16 pb-10 md:pb-0" : ""} ${index === 1 ? "md:px-6 lg:px-16 pt-10 md:pt-0 pb-10 md:pb-0" : ""} ${index === 2 ? "md:pl-6 lg:pl-16 pt-10 md:pt-0" : ""}`}
              >
                <p className="text-white font-normal leading-none" style={{ fontSize: "clamp(64px, 6.2vw, 120px)", letterSpacing: "-0.05em" }}>
                  {stat.value}
                </p>
                <p className="text-white font-medium mt-4 lg:mt-6 mb-3" style={{ fontSize: "clamp(18px, 1.2vw, 22px)", letterSpacing: "-0.03em" }}>
                  {stat.title}
                </p>
                <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "clamp(16px, 1vw, 16px)", letterSpacing: "-0.03em" }}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <ServicesSection data={home?.services} />

        <div className="relative overflow-hidden">
          <section className="container py-8 lg:py-16 relative z-10">
            <div className="flex items-start sm:items-center justify-between gap-5 sm:gap-0">
              <p className="text-white/70 font-normal leading-normal" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}>
                {compareLeft}
              </p>
              <div className="hidden sm:block self-stretch w-px mx-8 lg:mx-16" style={{ background: "#FFFFFF80" }} />
              <p className="text-white text-left sm:text-right font-medium" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}>
                {compareRight}
              </p>
            </div>
          </section>
          <ScrollTextReveal data={home?.scrollReveal} />
        </div>
      </div>

      <div className="relative">
        <Image src={circleShade} alt="" className="case-shade absolute pointer-events-none select-none" style={{ left: 0, bottom: 0, zIndex: 0 }} />
        <div className="relative" style={{ zIndex: 1 }}>
          <CaseStudySection items={home?.caseStudies?.items} />
        </div>
      </div>

      <section className="relative py-14 lg:py-24">
        <Image src={footerShade1} alt="" className="absolute pointer-events-none select-none" style={{ left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 0 }} />
        <Image
          src={footerShade2}
          alt=""
          className="absolute pointer-events-none select-none right-0 top-[-15%] lg:top-[50%]"
          style={{ transform: "translateY(-50%)", zIndex: 0 }}
        />
        <div className="container relative" style={{ zIndex: 1 }}>
          <div className="block lg:hidden mb-6">
            <h2 className="leading-[1.1] font-medium tracking-[-0.03em]" style={{ fontSize: "clamp(32px, 3.3vw, 60px)" }}>
              {teamHeadingLine1} <br />
              who<span className="text-[#9DF560] italic"> {teamHeadingAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <TeamOrbits members={home?.team?.members} />
            </div>
            <div className="pl-3.5">
              <h2 className="hidden lg:block leading-[1.1] font-medium tracking-[-0.03em]" style={{ fontSize: "clamp(32px, 3.3vw, 60px)" }}>
                {teamHeadingLine1} <br />
                who<span className="text-[#9DF560] italic"> {teamHeadingAccent}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 lg:pt-10">
                <div>
                  <p className="text-[18px] leading-[1.5] text-white/80">{teamCol1}</p>
                </div>
                <div>
                  <p className="text-[18px] leading-[1.5] text-white/80">{teamCol2}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AwardsSection data={home?.awards} />
      <ReviewTab data={home?.reviews} />
      <div className="relative overflow-hidden">
        <Image src={circleShade2} alt="" className="absolute pointer-events-none select-none" style={{ left: 0, top: "80%", transform: "translateY(-50%)", zIndex: 0 }} />
        <div className="relative" style={{ zIndex: 1 }}>
          <Industries data={home?.industries} />
          <BlogSection data={home?.blogSection} />
          <CtaSection2 data={home?.finalCta} />
        </div>
      </div>
    </main>
  );
}
