import Link from "next/link";
import Image from "next/image";
import ctaImage from "@/assets/cta-2-shadow.png";
import ctaShadeMobile from "@/assets/cta-shade-mobile.png";
import type { FinalCtaData } from "@/lib/home";

export default function CtaSection2({ data }: { data?: FinalCtaData }) {
  const heading = data?.heading ?? "Got a Kickass Idea?\nWe'll Help You Make it Real.";
  const description =
    data?.description ??
    "You've seen what we've built and what clients say about it. The only thing left is starting. Drop us your brief — or just say hi. Either works.";
  const primaryLabel = data?.primaryButton?.label ?? "See Our Work";
  const primaryHref = data?.primaryButton?.href ?? "/work";
  const secondaryLabel = data?.secondaryButton?.label ?? "Book a Free Call";
  const secondaryHref = data?.secondaryButton?.href ?? "/contact";

  const headingParts = heading.split("\n");

  return (
    <section className="container relative py-14 lg:py-32 px-0">
      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-10 overflow-hidden relative rounded-[28px] lg:rounded-[40px] bg-white px-5 py-10 lg:p-[70px_110px]">
        <Image src={ctaImage} alt="" className="hidden lg:block absolute right-[10%] lg:top-17.5 w-[60%] object-fill pointer-events-none select-none" priority />
        <Image src={ctaShadeMobile} alt="" className="block lg:hidden absolute right-0 top-0 h-full w-auto object-top-right pointer-events-none select-none" priority />

        <div className="flex flex-col gap-6 lg:gap-8 relative z-10">
          <h2 className="text-[#0A0A0C] font-medium leading-[1.2]" style={{ fontSize: "clamp(32px, 4.5vw, 60px)", letterSpacing: "-0.05em" }}>
            {headingParts.map((line, i) => {
              const kickassMatch = line.match(/^(.*)(Kickass)(.*)$/i);
              if (kickassMatch) {
                return (
                  <span key={i}>
                    {kickassMatch[1]}
                    <em className="italic text-[#0A0A0C]/70">{kickassMatch[2]}</em>
                    {kickassMatch[3]}
                    {i < headingParts.length - 1 && <br />}
                  </span>
                );
              }
              return (
                <span key={i}>
                  {line}
                  {i < headingParts.length - 1 && <br />}
                </span>
              );
            })}
          </h2>

          <p className="block lg:hidden font-medium leading-relaxed" style={{ fontSize: "16px", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}>
            {description}
          </p>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-4">
            <Link href={primaryHref} className="inline-flex items-center justify-center rounded-full font-medium text-white bg-[#1D17E0] hover:bg-[#0A0A0C] transition-colors duration-300 py-4 px-5 lg:py-4 lg:px-8" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}>
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="inline-flex items-center justify-center rounded-full border border-black/20 font-medium bg-white text-[#0A0A0C] transition-colors duration-300 hover:bg-[#9DF560] hover:border-[#9DF560] py-4 px-5 lg:py-4 lg:px-8" style={{ fontSize: "clamp(16px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}>
              {secondaryLabel}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block lg:max-w-85 relative z-10">
          <p className="font-medium leading-relaxed" style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
