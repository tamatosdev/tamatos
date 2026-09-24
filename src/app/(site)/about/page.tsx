import Image from "next/image";
import Link from "next/link";
import aboutHeader1 from "@/assets/about-header-1.png";
import aboutHeader2 from "@/assets/about-header-2.png";
import footerShade1 from "@/assets/footer-shade1.png";
import AboutMarquee from "@/components/AboutMarquee";
import ClientLogos from "@/components/ClientLogos";
import lightGreenBox from "@/assets/lighr-green-box.png";
import darkGreenBox from "@/assets/dark-green-box.png";
import orangeBox from "@/assets/orange box.png";
import blueBg from "@/assets/blue-bg.png";
import creativeIcon from "@/assets/creative-icon.png";
import developmentIcon from "@/assets/development-icon.png";
import webDesignIcon from "@/assets/web-design-icon.png";
import thinkIcon from "@/assets/think-icon.png";
import Asterisk from "@/assets/asteric.png";
import pill2 from "@/assets/pill2.png";
import TeamSection from "@/components/TeamSection";
import ReviewTab from "@/components/ReviewTab";
import BlogSection from "@/components/BlogSection";
import CtaSection2 from "@/components/CtaSection2";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import CaseStudySection from "@/components/CaseStudySection";
import BodyBgOnView from "@/components/BodyBgOnView";
import arrowShade2 from "@/assets/arrow-shade2.png";
import shade4 from "@/assets/Shade-4.png";
import shade2 from "@/assets/Shade-2.png";
import blogShade from "@/assets/blog-shade.png";

export default function AboutPage() {
  return (
    <main style={{ overflowX: "clip" }}>

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-0 overflow-hidden">

        {/* Footer shade 1 — top-left, outside container */}
        <Image
          src={footerShade1}
          alt=""
          className="absolute pointer-events-none select-none"
          style={{ left: 0, top: 0, zIndex: 0 }}
        />

        <div className="container relative" style={{ zIndex: 1 }}>

          {/* Breadcrumb */}
          <div className="">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[16px] sm:text-[18px] text-white/70 font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #ffffff26",
                boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
              }}
            >
              <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white">About Us</span>
            </div>
          </div>

          {/* Heading + Images wrapper */}
          <div className="relative mt-8 lg:mt-0 lg:flex lg:items-center lg:min-h-[clamp(280px,32vw,440px)]">

            {/* Heading — natural wrap on mobile; desktop line breaks preserved */}
            <div className="relative flex-1" style={{ zIndex: 3 }}>
              <h1
                className="text-white font-medium leading-[1.15] lg:leading-[1.1]"
                style={{ fontSize: "clamp(26px, 4.8vw, 71.11px)", letterSpacing: "-0.04em" }}
              >
                <span className="lg:block">
                  We Bring{" "}
                  <em className="italic font-normal text-white/50">Strategy, Creativity</em>
                </span>{" "}
                <span className="lg:block">
                  <em className="italic font-normal text-white/50">&amp; Technology</em> Together To Build
                </span>{" "}
                <span className="lg:block">Digital Products That</span>{" "}
                <span className="mt-1 flex flex-wrap items-center gap-4 lg:mt-0 lg:gap-6">
                  <span>
                    Perform
                    <span className="text-[#9DF560]">.</span>
                  </span>
                  <Link
                    href="/contact"
                    className="hidden lg:inline-flex items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300"
                    style={{ fontSize: "18px", padding: "18px 40px", letterSpacing: "-0.02em" }}
                  >
                    Start a Project
                  </Link>
                </span>
              </h1>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300 lg:hidden"
                style={{ fontSize: "18px", padding: "12px 28px", letterSpacing: "-0.02em" }}
              >
                Start a Project
              </Link>
            </div>

            {/* Images — desktop: absolute right */}
            <div className="hidden lg:block absolute inset-y-0 right-0 pointer-events-none select-none" style={{ zIndex: 2, width: "45%" }}>
              <div
                className="absolute rounded-[20px] overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(160px, 17vw, 260px)",
                  height: "clamp(200px, 22vw, 340px)",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-60%) rotate(7deg)",
                }}
              >
                <Image src={aboutHeader2} alt="" className="w-full h-full object-cover" priority />
              </div>
              <div
                className="absolute rounded-[20px] overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(160px, 17vw, 260px)",
                  height: "clamp(200px, 22vw, 340px)",
                  right: "clamp(120px, 12vw, 200px)",
                  top: "50%",
                  transform: "translateY(-40%) rotate(-3deg)",
                }}
              >
                <Image src={aboutHeader1} alt="" className="w-full h-full object-cover" priority />
              </div>
            </div>
          </div>

          {/* Mobile images */}
          <div className="relative mx-auto mt-10 flex h-[220px] w-full max-w-[300px] items-start justify-center lg:hidden">
            <div
              className="absolute overflow-hidden rounded-[18px] shadow-2xl"
              style={{
                width: "148px",
                height: "186px",
                left: "52%",
                top: "0",
                transform: "rotate(7deg)",
                zIndex: 1,
              }}
            >
              <Image src={aboutHeader2} alt="" className="h-full w-full object-cover" priority />
            </div>
            <div
              className="absolute overflow-hidden rounded-[18px] shadow-2xl"
              style={{
                width: "148px",
                height: "186px",
                left: "8%",
                top: "28px",
                transform: "rotate(-3deg)",
                zIndex: 2,
              }}
            >
              <Image src={aboutHeader1} alt="" className="h-full w-full object-cover" priority />
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="mt-10 lg:mt-16 pb-8 lg:pb-12 flex flex-col items-center gap-4">
            <p
              className="text-white/80 font-normal text-center leading-snug"
              style={{ fontSize: "clamp(18px, 1vw, 18px)", letterSpacing: "-0.02em" }}
            >
              Delivering World-Class Quality<br />Beyond the Ordinary.
            </p>
            <div className="w-px h-12 bg-white/50" />
          </div>

        </div>
      </section>

      

      {/* Intro → How we work */}
      <div className="relative py-12 lg:py-20">
        <div className="about-flow-shades pointer-events-none select-none absolute inset-0 overflow-visible" aria-hidden>
          {/* What We Do — soft left glow (Shade-4) */}
          <Image
            src={shade4}
            alt=""
            className="absolute left-0 top-[58%] w-[min(36vw,420px)] opacity-70"
            style={{
              height: "auto",
              WebkitMaskImage:
                "linear-gradient(to right, #000 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 20%, #000 85%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, #000 40%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 20%, #000 85%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
          {/* How we work — soft right glow */}
          <Image
            src={shade2}
            alt=""
            className="absolute right-0 bottom-[4%] w-[min(42vw,520px)] opacity-50"
            style={{
              height: "auto",
              WebkitMaskImage:
                "linear-gradient(to top, #000 50%, transparent 100%)",
              maskImage:
                "linear-gradient(to top, #000 50%, transparent 100%)",
            }}
          />
        </div>

        <div className="relative z-10">
          <section className="relative py-6 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-white font-normal text-center leading-snug" style={{ fontSize: "clamp(21.33px, 2.2vw, 44.44px)", letterSpacing: "-0.04em" }}>
                <span className="italic text-white/50">At Tamatos, </span>
                we believe good work should do more than look good
                <span className="text-[#9DF560]">.</span> It should have a purpose
                <span className="text-[#9DF560]">,</span> it should solve a problem
                <span className="text-[#9DF560]">,</span>{" "}
                <span className="text-[#9DF560]">&amp;</span> it should make a difference to the
                business behind it
                <span className="text-[#9DF560]">.</span>
              </h2>
            </div>
          </section>

          <AboutMarquee />

          {/* Logos — light blog-shade on the right only */}
          <div className="relative">
            <div className="about-flow-shades pointer-events-none select-none absolute inset-0 overflow-visible" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blogShade.src}
                alt=""
                className="absolute right-0 top-[8%] max-w-none opacity-55"
                style={{
                  width: "min(58vw, 720px)",
                  height: "auto",
                  WebkitMaskImage:
                    "linear-gradient(to left, #000 35%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to left, #000 35%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskComposite: "intersect",
                }}
              />
            </div>
            <div className="relative z-10">
              <ClientLogos className="!pb-8 lg:!pb-12" />
            </div>
          </div>

          {/* How we work */}
          <section className="container py-14 lg:py-24">
            <h2
              className="text-white font-normal leading-[1.15] mb-12 lg:mb-16"
              style={{ fontSize: "clamp(24.89px, 3.5vw, 50.06px)", letterSpacing: "-0.04em" }}
            >
              How <em className="italic text-white/50">we</em> work
              <span className="text-[#9DF560]">.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:items-start">
              {[
                {
                  bg: lightGreenBox,
                  icon: creativeIcon,
                  title: "Think First",
                  desc: "We start with the problem, not the solution, so every decision has a clear purpose.",
                  mt: "",
                },
                {
                  bg: darkGreenBox,
                  icon: developmentIcon,
                  title: "Make It Simple",
                  desc: "We turn complex ideas into simple experiences that feel intuitive, useful, and easy to understand.",
                  mt: "lg:mt-[40px]",
                },
                {
                  bg: orangeBox,
                  icon: webDesignIcon,
                  title: "Build With Purpose.",
                  desc: "We create with intention, making sure everything we build has a clear job to do.",
                  mt: "lg:mt-[80px]",
                },
                {
                  bg: blueBg,
                  icon: thinkIcon,
                  title: "Think Ahead And Grow",
                  desc: "We think of the outcome and continue to make the products better.",
                  mt: "lg:mt-[120px]",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`relative flex flex-col justify-center overflow-hidden rounded-3xl p-7 ${card.mt}`}
                  style={{ minHeight: "280px" }}
                >
                  <Image src={card.bg} alt="" fill className="object-cover object-top" />
                  <Image src={card.icon} alt="" className="relative z-10 mb-5 h-auto w-16" />
                  <div className="relative z-10">
                    <h3
                      className="mb-3 font-semibold text-white"
                      style={{ fontSize: "clamp(18px, 1.4vw, 21.33px)", letterSpacing: "-0.03em" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-normal leading-relaxed text-white/70"
                      style={{ fontSize: "clamp(18px, 0.95vw, 18px)" }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Culture statement — bg reveals blue on scroll */}
          <BodyBgOnView color="#1D17E0" className="py-40 lg:py-64">
            <div className="container">
              <div
                className="font-medium leading-[1.2]"
                style={{ fontSize: "clamp(28.44px, 3.2vw, 50.06px)", letterSpacing: "-0.03em" }}
              >
                <p className="mb-0">
                  <Image
                    src={Asterisk}
                    alt=""
                    width={52}
                    height={52}
                    className="inline-block w-8 lg:w-12 h-auto mr-2 lg:mr-3"
                    style={{ verticalAlign: "middle" }}
                  />
                  <span className="text-white">We Take Work Seriously. </span>
                  <span className="text-white/50">Ourselves? </span>
                  <em className="italic text-white font-medium">Not Always</em>
                  <span className="text-[#9DF560]">.</span>
                </p>

                <p className="mt-1 text-white/50">
                  We Got Big Ideas, Cut Chai, Fiery Biryani,{" "}
                  <Image
                    src={pill2}
                    alt=""
                    className="inline-block h-[0.75em] w-auto mx-1"
                    style={{ verticalAlign: "middle" }}
                  />{" "}
                  Questionable Jokes And, Allegedly, Reading Manga When The Boss
                  Isn&apos;t Looking.
                </p>

                <p className="mt-10 lg:mt-14 text-white">
                  It&apos;s Chaotic<span className="text-[#9DF560]">.</span> It&apos;s
                  Collaborative<span className="text-[#9DF560]">.</span> It&apos;s Tamatos
                  <span className="text-[#9DF560]">.</span>
                </p>

                <p className="mt-1">
                  <span className="text-white/50">Come Take A Look At Our </span>
                  <em className="italic text-white font-medium">Unhinged Side</em>
                  <span className="text-[#9DF560]">.</span>
                </p>
              </div>
            </div>
          </BodyBgOnView>

          <TeamSection />

          <ServicesSection />
          <StatsSection />
        </div>
      </div>

      {/* Case studies */}
      <section className="relative pt-14 lg:pt-24 overflow-x-clip">
        <Image
          src={arrowShade2}
          alt=""
          className="case-shade pointer-events-none select-none absolute opacity-55"
          style={{
            right: "-5%",
            top: "15%",
            zIndex: 0,
            width: "min(50vw, 640px)",
            height: "auto",
          }}
          aria-hidden
        />
        <div className="relative z-10">
          <div className="container text-left">
            <h2
              className="font-medium leading-[1.15] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)" }}
            >
              Work We Are <em className="italic font-normal text-white/50">Proud</em> Of
              <span className="text-[#9DF560]">.</span>
            </h2>
            <p className="mt-5 max-w-[720px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/80 lg:mt-6 lg:text-[18px]">
              From websites and digital products to brands and campaigns, we&apos;ve helped businesses
              turn ideas into things people can actually experience.
            </p>
          </div>
          <CaseStudySection className="!pt-8 md:!pt-12" />
        </div>
      </section>

      <div className="about-last-3 pt-14 lg:pt-24">

      <ReviewTab />
      <BlogSection />
      <CtaSection2 />

      </div>
    </main>
  );
}
