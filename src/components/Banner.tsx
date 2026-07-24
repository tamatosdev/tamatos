"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BannerGradient from "@/assets/banner-gradient.png";
import BgGrid from "@/assets/bg-grid.png";
import GridMobile from "@/assets/grid-mobile.png";
import Asterisk from "@/assets/asteric.png";
import Frame1 from "@/assets/button-frame-1.png";
import Frame2 from "@/assets/button-frame-2.png";

const pillStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.10)",
  boxShadow: "inset 5.33px 4px 12px 0px rgba(255, 255, 255, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
};

// Desktop pills — top unchanged; --pill-*-narrow = horizontal inset from viewport (≤1600px)
const leftPills = [
  { label: "UX/UI Design", top: "6%", left: "0%", insetNarrow: "2.5rem" },
  { label: "Branding", top: "39%", left: "-3%", insetNarrow: "2rem" },
  { label: "Web & App Dev", top: "75%", left: "2%", insetNarrow: "3rem" },
];
const rightPills = [
  { label: "Product Design", top: "-1%", right: "0%", insetNarrow: "2.5rem" },
  { label: "SEO", top: "44%", right: "0%", insetNarrow: "2rem" },
  { label: "Social Media Marketing", top: "73%", right: "-2%", insetNarrow: "3rem" },
];

// Mobile pills — unchanged
const mobilePills: { label: string; top?: string; bottom?: string; left?: string; right?: string }[] = [
  { label: "UX/UI Design", top: "16%", left: "-1%" },
  { label: "Branding", top: "18%", left: "42%" },
  { label: "Product Design", top: "100px", right: "-6%" },
  { label: "SEO", top: "44%", right: "2%" },
  { label: "Social Media Marketing", bottom: "20%", right: "-11%" },
  { label: "Web & App Dev", bottom: "7%", left: "-1%" },
];

export default function Banner() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex items-center justify-center overflow-hidden pb-28 lg:pb-0 lg:min-h-[93vh]">

      {/* Gradient */}
      <Image
        src={BannerGradient}
        alt=""
        fill
        priority
        className="object-cover object-center top-[-35%]!"
      />

      {/* Mobile pills */}
      {mobilePills.map((pill) => (
        <span
          key={pill.label}
          className="lg:hidden text-white/70 font-medium rounded-full leading-none whitespace-nowrap opacity-70 tracking-[-0.05em] z-20"
          style={{
            position: "absolute",
            fontSize: "13px",
            padding: "8px 14px",
            ...pillStyle,
            ...(pill.top !== undefined ? { top: pill.top } : {}),
            ...(pill.bottom !== undefined ? { bottom: pill.bottom } : {}),
            ...(pill.left !== undefined ? { left: pill.left } : {}),
            ...(pill.right !== undefined ? { right: pill.right } : {}),
          }}
        >
          {pill.label}
        </span>
      ))}

      <div
        ref={contentRef}
        className="relative z-10 text-left lg:text-center pt-36 lg:pt-28 w-full max-w-[860px] xl:max-w-[1100px] 2xl:max-w-[1500px] mx-auto px-4"
        style={{ willChange: "transform" }}
      >
        {/* Grid — desktop */}
        <Image
          src={BgGrid}
          alt=""
          fill
          className="hidden lg:block object-fill pointer-events-none"
        />

        {/* Grid — mobile */}
        <Image
          src={GridMobile}
          alt=""
          className="block lg:hidden absolute left-0 right-0 w-full h-auto pointer-events-none object-contain"
          style={{ top: "20%" }}
        />

        {/* Desktop left pills */}
        {leftPills.map((pill) => (
          <span
            key={pill.label}
            className="banner-pill-left hidden lg:block text-white/70 font-medium rounded-full leading-none whitespace-nowrap opacity-60 tracking-[-0.05em]"
            style={{
              position: "absolute",
              fontSize: "clamp(13px, 0.78vw, 16px)",
              padding: "clamp(7px, 0.5vw, 10px) clamp(12px, 1vw, 20px)",
              ...pillStyle,
              top: pill.top,
              left: pill.left,
              ["--pill-inset-narrow" as string]: pill.insetNarrow,
            }}
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            {pill.label}
          </span>
        ))}

        {/* Desktop right pills */}
        {rightPills.map((pill) => (
          <span
            key={pill.label}
            className="banner-pill-right hidden lg:block text-white/70 font-medium rounded-full leading-none whitespace-nowrap opacity-60 tracking-[-0.05em]"
            style={{
              position: "absolute",
              fontSize: "clamp(13px, 0.78vw, 16px)",
              padding: "clamp(7px, 0.5vw, 10px) clamp(12px, 1vw, 20px)",
              ...pillStyle,
              top: pill.top,
              right: pill.right,
              ["--pill-inset-narrow" as string]: pill.insetNarrow,
            }}
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            {pill.label}
          </span>
        ))}

        {/* Heading */}
        <h1 className="text-white font-normal leading-[1.1] tracking-[-0.05em] text-[44px] sm:text-[50px] md:text-[64px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px]">
          <span className="flex items-center justify-start lg:justify-center gap-3 sm:gap-4 flex-wrap">
            <span>We Turn</span>
            <span
              className="inline-flex items-center px-4 sm:px-5 py-1 rounded-full font-semibold ml-[-16px] mr-[-18px] sm:ml-[-23px] sm:mr-[-27px] tracking-[-0.03em]"
              style={{
                background: "#E8601C",
                color: "#0A0A0C",
                fontSize: "0.55em",
                verticalAlign: "middle",
                transform: "rotate(-10deg)",
                display: "inline-block",
              }}
              data-aos="zoom-in"
            >
              BOLD
            </span>
            <span>Ideas Into Digital</span>
          </span>

          <span className="flex items-center justify-start lg:justify-center gap-3 sm:gap-4 flex-wrap mt-1">
            <span>Experiences</span>
            <Image
              src={Asterisk}
              alt="*"
              width={80}
              height={80}
              className="inline-block w-[28px] sm:w-[40px] md:w-[55px] lg:w-[62px] xl:w-[72px] 2xl:w-[80px] h-auto"
              style={{ verticalAlign: "middle" }}
              data-aos="flip-right"
              data-aos-duration="1500"
            />
            <span className="italic font-normal text-white/70">Businesses</span>
          </span>

          <span className="block mt-1">Grow With.</span>
        </h1>

        {/* Begin Now Button */}
        <div className="mt-8 sm:mt-12 flex justify-start lg:justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 sm:gap-6 rounded-full pl-[20px] sm:pl-[26px] pr-[12px] sm:pr-[15px] py-[10px] bg-white hover:bg-[#9DF560] transition-colors duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <span className="text-[#0A0A0C] font-medium text-[18px] sm:text-[24px] leading-none tracking-[-0.05em]">
              Begin Now
            </span>
            <div className="relative w-[64px] sm:w-[80px] h-[36px] sm:h-[43px] rounded-[40px] overflow-hidden flex-shrink-0 transform-[translateZ(0)]">
              <div className="absolute inset-0">
                <Image src={Frame1} alt="" fill className="object-cover object-center scale-150" />
              </div>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] bg-[#0A0A0C] flex items-center justify-center">
                <Image src={Frame2} alt="" fill className="object-cover object-center" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
