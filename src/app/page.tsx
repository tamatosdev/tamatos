import Banner from "@/components/Banner";
import AboutStrip from "@/components/AboutStrip";
import LogoMarquee from "@/components/LogoMarquee";
import CtaSection from "@/components/CtaSection";
import AwardsSection from "@/components/AwardsSection";
import ServicesSection from "@/components/ServicesSection";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import Image from "next/image";
import textimage from "@/assets/text-image2.png";
import Asterisk from "@/assets/asteric.png";
import shade1 from "@/assets/shade-1.png";
import shade2 from "@/assets/Shade-2.png";
import shade3 from "@/assets/shade-3.png";

export default function Home() {
  return (
    <main>
      <Banner />
      <AboutStrip />
      <LogoMarquee />
      

      <div className="container flex py-24">
      <Image
        src={shade1}
        alt=""
        width={800}
        height={400}
        className="object-cover object-center pointer-events-none"
        style={{position: "absolute", left: 0, top: "-11%"}}
      />

  <div className="w-2/5">
  </div>
  <div className="w-3/5">
    <h2 className="text-white text-[50px] font-medium leading-[1.2] tracking-[-0.04em] mb-6">
      <Image
        src={Asterisk}
        alt="*"
        width={39}
        height={41}
        className="inline-block mr-[100px]"
        style={{ verticalAlign: "middle" }}
      />
      Tamatos is a design-led agency that combines bold branding, <span className="text-white/70">intuitive UX, & clean code {''}
        <Image
        src={textimage}
        alt="*"
        width={137}
        height={54}
        className="inline-block"
        style={{ verticalAlign: "middle" }}
      />
       {''} so your brand doesn't just look good. It performs.</span>
      </h2>
  </div>
  <Image
        src={shade2}
        alt=""
        width={800}
        height={400}
        className="object-cover object-center pointer-events-none"
        style={{position: "absolute", right: 0, top: "90%"}}
      />
</div>

<CtaSection />

      {/* Numbers Section */}
      <section className="container py-24">
        <div className="grid grid-cols-3">

          {/* Column 1 */}
          <div className="pr-16">
            <p className="text-white font-normal leading-none" style={{ fontSize: "128px", letterSpacing: "-0.05em" }}>
              +200%
            </p>
            <p className="text-white font-medium mt-6 mb-3" style={{ fontSize: "18px", letterSpacing: "-0.03em" }}>
              Avg. engagement uplift
            </p>
            <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "16px", letterSpacing: "-0.03em" }}>
              Flows redesigned to turn curious visitors into paying customers
            </p>
          </div>

          {/* Column 2 */}
          <div className="px-16 ">
            <p className="text-white font-normal leading-none" style={{ fontSize: "128px", letterSpacing: "-0.05em" }}>
              3.8×
            </p>
            <p className="text-white font-medium mt-6 mb-3" style={{ fontSize: "18px", letterSpacing: "-0.03em" }}>
              Revenue growth after brand overhaul
            </p>
            <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "16px", letterSpacing: "-0.03em" }}>
              Identity systems that build instant trust and command attention
            </p>
          </div>

          {/* Column 3 */}
          <div className="pl-16">
            <p className="text-white font-normal leading-none" style={{ fontSize: "128px", letterSpacing: "-0.05em" }}>
              -40%
            </p>
            <p className="text-white font-medium mt-6 mb-3" style={{ fontSize: "18px", letterSpacing: "-0.03em" }}>
              Drop-off rate reduced
            </p>
            <p className="text-white/60 font-normal leading-normal" style={{ fontSize: "16px", letterSpacing: "-0.03em" }}>
              Smarter UX and onboarding that keeps users from walking away
            </p>
          </div>

        </div>
      </section>

      <ServicesSection />

      <AwardsSection />

      {/* Compare strip + scroll reveal wrapped with shade-3 */}
      <div className="relative overflow-hidden">
        <Image
          src={shade3}
          alt=""
          width={800}
          height={800}
          className="absolute left-0 top-[-120px] -z-10 pointer-events-none select-none"
        />

        {/* Compare strip */}
        <section className="container py-16 relative z-10">
          <div className="flex items-center justify-between">

            {/* Column 1 */}
            <p
              className="text-white/70 font-normal leading-normal max-w-62.5"
              style={{ fontSize: "18px", letterSpacing: "-0.03em" }}
            >
              Most agencies = Either design well OR market well
            </p>

            {/* Divider */}
            <div className="self-stretch w-px mx-16" style={{ background: "#FFFFFF80" }} />

            {/* Column 3 */}
            <p
              className="text-white text-right font-medium max-w-62.5"
              style={{ fontSize: "18px", letterSpacing: "-0.03em" }}
            >
              tamatos = Bridges Product + Growth
            </p>

          </div>
        </section>

        <ScrollTextReveal text="So, We don’t just design pretty interfaces we build products that convert, scale, and grow." />
      </div>

    </main>
  );
}
