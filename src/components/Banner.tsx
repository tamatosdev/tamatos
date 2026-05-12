"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BannerGradient from "@/assets/banner-gradient.png";
import BgGrid from "@/assets/bg-grid.png";
import Asterisk from "@/assets/asteric.png";
import Frame1 from "@/assets/button-frame-1.png";
import Frame2 from "@/assets/button-frame-2.png";

const pillStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.10)",
  boxShadow: "inset 5.33px 4px 12px 0px rgba(255, 255, 255, 0.15)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
};

const leftPills = [
  { label: "UX/UI Design", top: "6%", left: "2%" },
  { label: "Branding", top: "39%", left: "-2%" },
  { label: "Web & App Dev", top: "75%", left: "11%" },
];

const rightPills = [
  { label: "Product Design", top: "-1%", right: "0%" },
  { label: "SEO", top: "44%", right: "1%" },
  { label: "Social Media Marketing", top: "73%", right: "0%" },
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
    <section className="relative min-h-[93vh] flex items-center justify-center overflow-hidden">
      <Image
        src={BannerGradient}
        alt=""
        fill
        priority
        className="object-cover object-center top-[-35%]!"
      />

      <div ref={contentRef} className="container relative z-10 text-center pt-24 lg:pt-28" style={{ willChange: "transform" }}>

        <Image
          src={BgGrid}
          alt=""
          fill
          className="object-fill pointer-events-none"
        />

        {/* Left pills — hidden on mobile/tablet, shown lg+ */}
        {leftPills.map((pill) => (
          <span
            key={pill.label}
            className="hidden lg:block text-white/70 font-medium rounded-full px-5 py-2.5 leading-none whitespace-nowrap opacity-60 tracking-[-0.05em]"
            style={{ position: "absolute", fontSize: "clamp(13px, 1.1vw, 18px)", ...pillStyle, top: pill.top, left: pill.left }}
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            {pill.label}
          </span>
        ))}

        {/* Right pills — hidden on mobile/tablet, shown lg+ */}
        {rightPills.map((pill) => (
          <span
            key={pill.label}
            className="hidden lg:block text-white/70 font-medium rounded-full px-5 py-2.5 leading-none whitespace-nowrap opacity-60 tracking-[-0.05em]"
            style={{ position: "absolute", fontSize: "clamp(13px, 1.1vw, 18px)", ...pillStyle, top: pill.top, right: pill.right }}
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            {pill.label}
          </span>
        ))}

        <h1 className="text-white font-normal leading-[1.1] tracking-[-0.05em] text-[38px] sm:text-[54px] md:text-[68px] lg:text-[80px] xl:text-[96px]">
          {/* Line 1 */}
          <span className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <span>We Turn</span>
            <span
              className="inline-flex items-center px-4 sm:px-5 py-1 rounded-full font-semibold ml-[-16px] mr-[-18px] sm:ml-[-23px] sm:mr-[-27px] tracking-[-0.03em]"
              style={{ background: "#E8601C", color: "#0A0A0C", fontSize: "0.55em", verticalAlign: "middle", transform: "rotate(-10deg)", display: "inline-block" }}
              data-aos="zoom-in"
            >
              BOLD
            </span>
            <span>Ideas Into Digital</span>
          </span>

          {/* Line 2 */}
          <span className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mt-1">
            <span>Experiences</span>
            <Image
              src={Asterisk}
              alt="*"
              width={80}
              height={80}
              className="inline-block w-[30px] sm:w-[45px] md:w-[60px] lg:w-[70px] xl:w-[80px] h-auto"
              style={{ verticalAlign: "middle" }}
              data-aos="flip-right"
              data-aos-duration="1500"
            />
            <span className="italic font-normal text-white/70">Businesses</span>
          </span>

          {/* Line 3 */}
          <span className="block mt-1">Grow With.</span>
        </h1>

        {/* Begin Now Button */}
        <div className="mt-8 sm:mt-12 flex justify-center">
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
                <Image
                  src={Frame1}
                  alt=""
                  fill
                  className="object-cover object-center scale-150"
                />
              </div>
              <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] bg-[#0A0A0C] flex items-center justify-center">
                <Image
                  src={Frame2}
                  alt=""
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
