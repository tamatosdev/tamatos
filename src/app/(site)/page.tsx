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
import Link from "next/link";
import Asterisk from "@/assets/asteric.png";
import shade1 from "@/assets/shade-1.png";
import shade2 from "@/assets/Shade-2.png";
import teamIcon from "@/assets/team-icon.png";
import bracesIcon from "@/assets/3rd-bracket.png";
import ideaIcon from "@/assets/ai-idea.png";
import buttonTamatos from "@/assets/button-tamatos.svg";
import StatsSection from "@/components/StatsSection";
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
import type { StaticImageData } from "next/image";

const agencyHighlights: {
  icon: StaticImageData;
  title: string;
  description: string;
}[] = [
  {
    icon: teamIcon,
    title: "Have one team that gets the bigger picture",
    description: "Hiring system with immediate start.",
  },
  {
    icon: bracesIcon,
    title: "Build digital that means something",
    description: "Websites and products designed around people, purpose and performance.",
  },
  {
    icon: ideaIcon,
    title: "Think beyond the brief",
    description: "We challenge the expectation to find ideas that actually move your brand forward.",
  },
];

export async function generateMetadata() {
  const home = await getHomePage();
  return buildPageMetadata(home?.seo);
}

export default async function Home() {
  const home = await getHomePage();

  const compareLeft = home?.compareStrip?.leftText ?? "Most agencies = Either design well OR market well";
  const compareRight = home?.compareStrip?.rightText ?? "tamatos = Bridges Product + Growth";

  const teamRoles =
    home?.team?.rolesText ??
    "Strategists. Designers. Developers. Brand thinkers. SEO nerds.";
  const teamBody =
    home?.team?.bodyText ??
    "We work together because the best ideas usually happen somewhere between what a business needs, what people want and what technology can make possible.";
  const teamButtonHref = home?.team?.button?.href ?? "/about";

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

        <section className="relative py-12 lg:py-24" data-aos-skip>
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
              <div className="hidden lg:block lg:w-1/4" />
              <div className="w-full lg:w-3/4">
                <h2
                  className="text-white font-medium leading-[1.15] tracking-[-0.04em] ml-0 lg:ml-[5.5rem]"
                  style={{ fontSize: "clamp(25px, 3.2vw, 49.78px)" }}
                  data-aos="fade-up"
                  data-aos-duration="900"
                >
                  <span className="block">
                    <em className="italic text-white/50 font-normal">Tamatos</em> Is Your{" "}
                    <span className="text-[#9DF560]">Go-To</span> Agency
                  </span>
                  <Image
                    src={Asterisk}
                    alt="*"
                    width={52}
                    height={52}
                    className="inline-block w-6 sm:w-8 lg:w-10 h-auto mr-2 sm:mr-3"
                    style={{ verticalAlign: "middle" }}
                  />
                  If You Want To
                </h2>

                <ul className="mt-10 lg:mt-14 flex flex-col">
                  {agencyHighlights.map((item, index) => (
                    <li
                      key={item.title}
                      className={`flex items-start gap-4 sm:gap-5 py-6 lg:py-7 ${
                        index < agencyHighlights.length - 1 ? "border-b border-white/15" : ""
                      }`}
                      data-aos="fade-left"
                      data-aos-duration="1000"
                      data-aos-delay={150 + index * 220}
                      data-aos-easing="ease-out-cubic"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="shrink-0 w-7 h-7 object-contain mt-0.5"
                      />
                      <div className="min-w-0">
                        <p
                          className="text-white font-medium leading-[1.35]"
                          style={{ fontSize: "clamp(16px, 1.4vw, 21.33px)", letterSpacing: "-0.03em" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-white/50 font-normal leading-[1.5] mt-1.5"
                          style={{ fontSize: "clamp(16px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
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

        <StatsSection data={home?.stats} />

        <ServicesSection data={home?.services} />

        <div className="relative overflow-hidden">
          <section className="container py-8 lg:py-16 relative z-10">
            <div className="flex items-start sm:items-center justify-between gap-5 sm:gap-0">
              <p className="text-white/70 font-normal leading-normal" style={{ fontSize: "clamp(18px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}>
                {compareLeft}
              </p>
              <div className="hidden sm:block self-stretch w-px mx-8 lg:mx-16" style={{ background: "#FFFFFF80" }} />
              <p className="text-white text-left sm:text-right font-medium" style={{ fontSize: "clamp(18px, 1.2vw, 18px)", letterSpacing: "-0.03em", maxWidth: "min(100%, 250px)" }}>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <TeamOrbits members={home?.team?.members} />
            </div>
            <div className="pl-0 lg:pl-3.5">
              <h2
                className="font-normal leading-[1.12] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(28.44px, 3.3vw, 50.06px)" }}
              >
                Team of People Who Like Making{" "}
                <span className="text-[#9DF560]">Complicated</span> Things{" "}
                <em className="font-normal italic text-white/50">Simpler.</em>
              </h2>

              <p className="mt-5 max-w-[520px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/70 lg:mt-6">
                {teamRoles} {teamBody}
              </p>

              <Link
                href={teamButtonHref}
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#1D17E0] px-7 py-3.5 text-[18px] font-medium leading-none tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-white hover:text-[#0A0A0C] lg:mt-10 lg:gap-3 lg:px-8 lg:py-4 lg:text-[18px]"
              >
                Meet
                <Image
                  src={buttonTamatos}
                  alt="tamatos"
                  width={98}
                  height={14}
                  className="h-[12px] w-auto transition-[filter] duration-300 lg:h-[14px] group-hover:brightness-0"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AwardsSection data={home?.awards} />
      <div className="relative">
        <Image
          src={circleShade2}
          alt=""
          className="pointer-events-none absolute left-0 z-0 select-none w-full max-w-none"
          style={{ top: "220px" }}
        />
        <div className="relative z-[1]">
          <ReviewTab data={home?.reviews} />
          <Industries data={home?.industries} />
          <BlogSection data={home?.blogSection} />
          <CtaSection2 data={home?.finalCta} />
        </div>
      </div>
    </main>
  );
}
