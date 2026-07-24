import Image from "next/image";
import Link from "next/link";
import aboutHeader1 from "@/assets/about-header-1.png";
import aboutHeader2 from "@/assets/about-header-2.png";
import footerShade1 from "@/assets/footer-shade1.png";
import bigShade from "@/assets/big-shade.png";
import AboutMarquee from "@/components/AboutMarquee";
import ClientLogos from "@/components/ClientLogos";
import workFun from "@/assets/work-fun.png";
import SmilyFace from "@/assets/Smily Face.png";
import lightGreenBox from "@/assets/lighr-green-box.png";
import darkGreenBox from "@/assets/dark-green-box.png";
import orangeBox from "@/assets/orange box.png";
import creativeIcon from "@/assets/creative-icon.png";
import developmentIcon from "@/assets/development-icon.png";
import webDesignIcon from "@/assets/web-design-icon.png";
import Asterisk from "@/assets/asteric.png";
import pill2 from "@/assets/pill2.png";
import TeamSection from "@/components/TeamSection";
import ReviewTab from "@/components/ReviewTab";
import BlogSection from "@/components/BlogSection";
import CtaSection2 from "@/components/CtaSection2";

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
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white/70 font-medium"
              style={{
                fontSize: "18px",
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

          {/* Heading + Images wrapper — flex row, items centered */}
          <div className="flex items-center relative" style={{ minHeight: "clamp(280px, 32vw, 440px)" }}>

            {/* Heading — full width, overlaps images */}
            <h1
              className="text-white font-medium leading-[1.1] relative flex-1"
              style={{ fontSize: "clamp(36px, 4.8vw, 80px)", letterSpacing: "-0.04em", zIndex: 3 }}
            >
              <span className="block">Stay Ahead of the{" "}<em className="italic text-white/50">Curve</em></span>
              <span className="block">with Tamatos{" "}<span className="text-[#9DF560]">Edge-Cutting</span></span>
              <span className="flex flex-wrap items-center gap-4 lg:gap-6">
                <span>Expertise<span className="text-[#9DF560]">.</span></span>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9df560] transition-colors duration-300"
                  style={{ fontSize: "18px", padding: "18px 40px", letterSpacing: "-0.02em" }}
                >
                  Tell Us About Your Project
                </Link>
              </span>
            </h1>

            {/* Images — absolutely on the right, centered vertically */}
            <div className="hidden lg:block absolute inset-y-0 right-0 pointer-events-none select-none" style={{ zIndex: 2, width: "45%" }}>
              {/* Back card */}
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
              {/* Front card */}
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

          {/* Mobile images (shifted up by -100px) */}
          <div className="relative flex items-center justify-center h-75 mt-10 lg:hidden" style={{ top: "-100px" }}>
            <div className="absolute rounded-[20px] overflow-hidden shadow-2xl" style={{ width: "170px", height: "210px", right: "20px", top: 0, transform: "rotate(6deg)", zIndex: 1 }}>
              <Image src={aboutHeader2} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute rounded-[20px] overflow-hidden shadow-2xl" style={{ width: "170px", height: "210px", right: "110px", top: "30px", transform: "rotate(-2deg)", zIndex: 2 }}>
              <Image src={aboutHeader1} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom tagline */}
          <div className="mt-10 lg:mt-16 pb-8 lg:pb-12 flex flex-col items-center gap-4">
            <p
              className="text-white/80 font-normal text-center leading-snug"
              style={{ fontSize: "clamp(18px, 1vw, 16px)", letterSpacing: "-0.02em" }}
            >
              Delivering World-Class Quality<br />Beyond the Ordinary.
            </p>
            <div className="w-px h-12 bg-white/50" />
          </div>

        </div>
      </section>

      

      <section className="relative py-12 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
          <div className="absolute left-1/2 top-[68%] w-[150%] lg:w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90">
            <Image
              src={bigShade}
              alt=""
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="relative" style={{ zIndex: 1 }}>
          <section className="relative py-6 lg:py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-white font-normal text-center leading-snug" style={{ fontSize: "clamp(24px, 2.2vw, 50px)", letterSpacing: "-0.04em" }}>
                Tamatos is a <span className="text-white/50 italic">design-led</span> agency that combines bold branding, intuitive UX<span className="text-[#9DF560]">, & </span>clean code so your brand doesn&apos;t just look good.
              </h2>
            </div>
          </section>

          <AboutMarquee />

          <div className="py-20 lg:py-40">
            <ClientLogos />
          </div>
        </div>
      </section>

      {/* We Believe Work Should be Fun section */}
      <section className="container py-14 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — image */}
          <div className="rounded-3xl overflow-hidden w-full">
            <Image
              src={workFun}
              alt="Work should be fun"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right — content */}
          <div className="flex flex-col gap-6">

            {/* Heading */}
            <h2
              className="text-white font-medium leading-[1.15]"
              style={{ fontSize: "clamp(28px, 3vw, 52px)", letterSpacing: "-0.04em" }}
            >
              We Believe{" "}
              <em className="italic text-white/50">Work</em>{" "}
              Should be Fun{" "}
              <Image
                src={SmilyFace}
                alt=""
                className="inline-block h-[0.9em] w-auto"
                style={{ verticalAlign: "middle" }}
              />{" "}
              too<span className="text-[#9DF560]">.</span>
            </h2>

            {/* Description */}
            <p
              className="text-white/80 font-normal leading-relaxed"
              style={{ fontSize: "clamp(15px, 1vw, 18px)", letterSpacing: "-0.01em" }}
            >
              We believe great work happens when talented people are genuinely excited about what they&apos;re building. Our culture blends ambition with creativity, and every project is a chance to do something that truly matters.
            </p>

            {/* Feature list */}
            <div className="flex flex-col mt-2">
              {[
                {
                  title: "Strategy before execution",
                  desc: "We apply system thinking to reduce fragmentation across teams and workflows.",
                },
                {
                  title: "Design that drives results",
                  desc: "Every pixel we place is intentional, tied to real user needs and business outcomes.",
                },
                {
                  title: "Built for long-term growth",
                  desc: "We build systems that scale with you, not just solutions that work today.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 py-5"
                  style={{ borderBottom: i < 2 ? "1px solid white/20 " : "none" }}
                >
                  {/* Green check icon */}
                  <div className="shrink-0 mt-2">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <circle cx="11" cy="11" r="11" fill="#9DF560" />
                      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="#0A0A0C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-white font-normal mb-1"
                      style={{ fontSize: "clamp(15px, 1.1vw, 18px)", letterSpacing: "-0.02em" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-white/80 font-normal leading-relaxed"
                      style={{ fontSize: "clamp(13px, 0.9vw, 16px)", letterSpacing: "-0.01em" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Built to Make Brands section */}
      <section className="container py-14 lg:py-24">

        {/* Heading */}
        <h2
          className="text-white font-normal leading-[1.15] mb-12 lg:mb-16"
          style={{ fontSize: "clamp(28px, 3.5vw, 60px)", letterSpacing: "-0.04em" }}
        >
          Built to{" "}
          <em className="italic text-white/50">Make</em>{" "}
          <Image src={Asterisk} alt="" className="inline-block w-7 lg:w-10 h-auto" style={{ verticalAlign: "middle" }} />{" "}
          <em className="italic text-white/50">Brands</em>
          <br />
          Impossible to Ignore<span className="text-[#9DF560]">.</span>
        </h2>

        {/* Staggered cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:items-start">

          {/* Card 1 — Creative */}
          <div className="relative rounded-3xl overflow-hidden p-7 flex flex-col justify-center lg:mt-0" style={{ minHeight: "360px" }}>
            <Image src={lightGreenBox} alt="" fill className="object-cover object-top" />
            <Image src={creativeIcon} alt="" className="relative w-16 h-auto z-10 mb-5" />
            <div className="relative z-10">
              <h3 className="text-white font-semibold mb-3" style={{ fontSize: "clamp(18px, 1.4vw, 24px)", letterSpacing: "-0.03em" }}>
                Creative That Connects
              </h3>
              <p className="text-white/70 font-normal leading-relaxed" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                From branding and social media creatives to pitch decks and visuals, we create bold digital experiences that help brands stand out and stay memorable.
              </p>
            </div>
          </div>

          {/* Card 2 — Development */}
          <div className="relative rounded-3xl overflow-hidden p-7 flex flex-col justify-center lg:mt-14" style={{ minHeight: "360px" }}>
            <Image src={darkGreenBox} alt="" fill className="object-cover object-top" />
            <Image src={developmentIcon} alt="" className="relative w-16 h-auto z-10 mb-5" />
            <div className="relative z-10">
              <h3 className="text-white font-semibold mb-3" style={{ fontSize: "clamp(18px, 1.4vw, 24px)", letterSpacing: "-0.03em" }}>
                Development That Performs
              </h3>
              <p className="text-white/70 font-normal leading-relaxed" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                Using modern technologies like Next.js, we build fast, scalable, and responsive websites and applications designed for performance and growth.
              </p>
            </div>
          </div>

          {/* Card 3 — Web Design */}
          <div className="relative rounded-3xl overflow-hidden p-7 flex flex-col justify-center lg:mt-28" style={{ minHeight: "360px" }}>
            <Image src={orangeBox} alt="" fill className="object-cover object-top" />
            <Image src={webDesignIcon} alt="" className="relative w-16 h-auto z-10 mb-5" />
            <div className="relative z-10">
              <h3 className="text-white font-semibold mb-3" style={{ fontSize: "clamp(18px, 1.4vw, 24px)", letterSpacing: "-0.03em" }}>
                Web Design That Converts
              </h3>
              <p className="text-white/70 font-normal leading-relaxed" style={{ fontSize: "clamp(13px, 0.95vw, 15px)" }}>
                We design clean, user-focused websites that combine strong visuals, seamless UX, and SEO-driven structure to turn visitors into customers.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Team statement section */}
      <section className="py-40 lg:py-64" style={{ background: "#1D17E0" }}>
        <div className="container">
          <p
            className="font-medium leading-[1.2] "
            style={{ fontSize: "clamp(32px, 3.2vw, 60px)", letterSpacing: "-0.03em" }}
          >
            {/* Asterisk + bold white opening */}
            <Image
              src={Asterisk}
              alt=""
              className="inline-block w-8 lg:w-12 h-auto mr-3"
              style={{ verticalAlign: "middle" }}
            />
            <span className="text-white">
              We&apos;re A Team Of Makers, Thinkers, Explorers And Theatre Singers.
            </span>
            {" "}
            {/* Dimmer second sentence */}
            <span className="text-white/50">
              We Approach Work And Play With Curiosity And Experimentation, Using What We Learn To Create Meaningful
            </span>
            {" "}
            <Image
              src={pill2}
              alt=""
              className="inline-block h-[0.75em] w-auto"
              style={{ verticalAlign: "middle" }}
            />
            {" "}
            <span className="text-white/50">
              Digital Products That Connect With People,
            </span>
            {" "}
            <span className="text-white">Just Like You.</span>
          </p>
        </div>
      </section>

      <TeamSection />
      <div className="about-last-3 pt-14 lg:pt-24">

      <ReviewTab />
      <BlogSection />
      <CtaSection2 />

      </div>
    </main>
  );
}
