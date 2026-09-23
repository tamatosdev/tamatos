import Image from "next/image";
import SmilyFace from "@/assets/Smily Face-2.gif";
import type { AboutStripData } from "@/lib/home";

export default function AboutStrip({ data }: { data?: AboutStripData }) {
  const text =
    "Tamatos is an AI-first, design-led agency combining sharp strategy, bold branding, intuitive experiences, and clean technology to help businesses build, launch, and grow.";
  const scrollLabel = data?.scrollLabel ?? "Scroll Down";
  const iconAlt = data?.icon?.alt ?? "Smiley face";

  return (
    <section className="py-8 md:py-10">
      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8 ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6">
          <Image
            src={SmilyFace}
            alt={iconAlt}
            width={64}
            height={64}
            unoptimized
            className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
          <p
            className="text-white font-normal max-w-full sm:max-w-127.5"
            style={{ fontSize: "clamp(18px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}
          >
            {text}
          </p>
        </div>

        <span
          className="text-white/80 font-normal uppercase tracking-widest shrink-0 underline hidden sm:block"
          style={{ fontSize: "clamp(12px, 1vw, 16px)", letterSpacing: "-0.03em" }}
        >
          {scrollLabel}
        </span>
      </div>
    </section>
  );
}
