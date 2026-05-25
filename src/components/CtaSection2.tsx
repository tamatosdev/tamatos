import Link from "next/link";
import Image from "next/image";
import ctaImage from "@/assets/cta-2-shadow.png";
import ctaShadeMobile from "@/assets/cta-shade-mobile.png";

export default function CtaSection2() {
  return (
    <section className="container relative py-14 lg:py-32 px-0">

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 overflow-hidden relative rounded-[28px] lg:rounded-[40px]"
        style={{
          background: "#fff",
          padding: "40px 20px",
        }}
      >
        {/* Shade — desktop */}
        <Image
          src={ctaImage}
          alt=""
          className="hidden lg:block absolute right-[10%] lg:top-17.5 w-[60%] object-fill pointer-events-none select-none"
          priority
        />
        {/* Shade — mobile */}
        <Image
          src={ctaShadeMobile}
          alt=""
          className="block lg:hidden absolute right-0 top-0 h-full w-auto object-top-right pointer-events-none select-none"
          priority
        />

        {/* Left — heading + description (mobile) + buttons */}
        <div className="flex flex-col gap-6 lg:gap-8 relative z-10">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.2]"
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)", letterSpacing: "-0.05em" }}
          >
            Got a <em className="italic text-[#0A0A0C]/70">Kickass</em> Idea?<br /> We'll Help You Make it Real.
          </h2>

          {/* Description — mobile only, shown between heading and buttons */}
          <p
            className="block lg:hidden font-medium leading-relaxed"
            style={{ fontSize: "16px", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}
          >
            You&apos;ve seen what we&apos;ve built and what clients say about it. The only thing left is starting. Drop us your brief — or just say hi. Either works.
          </p>

          {/* Buttons */}
          <div className="flex flex-row flex-nowrap items-center gap-2 lg:gap-4">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full font-medium text-white bg-[#1D17E0] hover:bg-[#0A0A0C] transition-colors duration-300 py-3.5 px-5 lg:py-4 lg:px-8"
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "-0.02em" }}
            >
              See Our Work
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/20 font-medium bg-white text-[#0A0A0C] transition-colors duration-300 hover:bg-[#9DF560] hover:border-[#9DF560] py-3.5 px-5 lg:py-4 lg:px-8"
              style={{ fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "-0.02em" }}
            >
              Book a Free Call
            </Link>
          </div>
        </div>

        {/* Right — description desktop only */}
        <div className="hidden lg:block lg:max-w-85 relative z-10">
          <p
            className="font-medium leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}
          >
            You&apos;ve seen what we&apos;ve built and what clients say about it. The only thing left is starting. Drop us your brief — or just say hi. Either works.
          </p>
        </div>
      </div>
    </section>
  );
}
