import Image from "next/image";
import Link from "next/link";
import digitalBanner from "@/assets/digital-banner-image.png";
import greenArrow from "@/assets/green-arrow.svg";
import leftShade from "@/assets/left-shade.png";

export default function DigitalHeroSection() {
  return (
    <section className="relative overflow-x-clip pt-28 pb-12 lg:pt-40 lg:pb-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={leftShade.src}
        alt=""
        className="pointer-events-none absolute left-0 bottom-0 z-0 max-w-none select-none"
        aria-hidden
      />

      <div className="container relative z-10">
        <div
          className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full px-4 py-2 text-[16px] font-medium text-white/70 sm:px-5 sm:text-[18px]"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "inset 5.33px 4px 12px 0px rgba(255, 255, 255, 0.15)",
          }}
        >
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Home
          </Link>
          <span className="text-white/30">/</span>
          <span className="text-white/70">Services</span>
          <span className="text-white/30">/</span>
          <span className="text-white">Digital</span>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1
              className="font-medium leading-[1.12] tracking-[-0.04em] text-white lg:leading-[1.08]"
              style={{ fontSize: "clamp(26px, 4.8vw, 71.11px)" }}
            >
              Digital <em className="font-normal italic text-white/45">Marketing</em>
              <br className="hidden lg:block" />
              {` `}That Moves Your
              <br className="hidden lg:block" />
              {` `}
              <span className="text-[var(--service-accent,#9DF560)]">Business Forward</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/70 sm:mt-6 sm:text-[18px]">
              We help businesses grow through strategic digital marketing, combining social media,
              influencer marketing, SEO, content, and performance-driven campaigns to attract the
              right audience and deliver measurable results.
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white py-3 px-7 text-[18px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 hover:bg-[var(--service-accent,#9DF560)] lg:px-8 lg:py-4 lg:text-[18px]"
              >
                Turn your Digital Presence into Profit
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-3 text-[18px] font-medium leading-none tracking-[-0.05em] text-white transition-colors duration-300 hover:text-white/80 lg:text-[19.56px]"
              >
                View Our Work
                <Image src={greenArrow} alt="" width={20} height={16} className="h-4 w-5" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[420px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
            <Image
              src={digitalBanner}
              alt="Digital marketing growth illustration"
              className="h-auto w-full max-w-[640px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
