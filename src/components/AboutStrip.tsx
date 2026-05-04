import Image from "next/image";
import SmilyFace from "@/assets/Smily Face.png";

export default function AboutStrip() {
  return (
    <section className="py-10">
      <div className="container flex items-center justify-between gap-8">

        {/* Left: icon + text */}
        <div className="flex items-center gap-6">
          <Image
            src={SmilyFace}
            alt="Smiley face"
            width={64}
            height={64}
            className="flex-shrink-0"
          />
          <p
            className="text-white text-[18px] font-normal max-w-[510px]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Tamatos is a design-led agency that combines sharp strategy, bold branding, intuitive UX, and clean code — so your product doesn&apos;t just look good. It performs.
          </p>
        </div>

        {/* Right: Scroll Down */}
        <span
          className="text-white/80 text-[16px] font-normal uppercase tracking-widest flex-shrink-0 underline"
          style={{ letterSpacing: "-0.03em" }}
        >
          Scroll Down
        </span>

      </div>
    </section>
  );
}
