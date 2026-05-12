import Image from "next/image";
import SmilyFace from "@/assets/Smily Face.png";

export default function AboutStrip() {
  return (
    <section className="py-8 md:py-10">
      <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-8">

        <div className="flex items-start sm:items-center gap-4 sm:gap-6">
          <Image
            src={SmilyFace}
            alt="Smiley face"
            width={64}
            height={64}
            className="shrink-0 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
          />
          <p
            className="text-white font-normal max-w-full sm:max-w-127.5"
            style={{ fontSize: "clamp(14px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}
          >
            Tamatos is a design-led agency that combines sharp strategy, bold branding, intuitive UX, and clean code — so your product doesn&apos;t just look good. It performs.
          </p>
        </div>

        <span
          className="text-white/80 font-normal uppercase tracking-widest shrink-0 underline hidden sm:block"
          style={{ fontSize: "clamp(12px, 1vw, 16px)", letterSpacing: "-0.03em" }}
        >
          Scroll Down
        </span>

      </div>
    </section>
  );
}
