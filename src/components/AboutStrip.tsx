import Image from "next/image";
import SmilyFace from "@/assets/Smily Face-2.gif";
import type { AboutStripData } from "@/lib/home";

const accent = "#FC7031";

export default function AboutStrip({ data }: { data?: AboutStripData }) {
  const iconAlt = data?.icon?.alt ?? "Smiley face";

  return (
    <section className="py-12 md:py-16 lg:pt-10">
      <h2
        className="container text-center font-semibold leading-[1.35] text-white text-balance"
        style={{ fontSize: "clamp(24px, 2.2vw, 36px)", letterSpacing: "-0.03em" }}
      >
        <span className="block">
          Top 1<span style={{ color: accent }}>%</span> Brands{" "}
          <Image
            src={SmilyFace}
            alt={iconAlt}
            width={64}
            height={64}
            unoptimized
            className="inline-block h-[1.1em] w-[1.1em] align-[-0.2em]"
          />{" "}
          Are Built When
        </span>
        <span className="block" style={{ textShadow: "0 2px 12px rgba(255, 255, 255, 0.45)" }}>
          Everything Works Together<span style={{ color: accent }}>.</span>
        </span>
      </h2>
    </section>
  );
}
