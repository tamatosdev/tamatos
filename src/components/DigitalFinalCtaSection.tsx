import Link from "next/link";
import Image from "next/image";
import ctaImage from "@/assets/cta-2-shadow.png";
import ctaShadeMobile from "@/assets/cta-shade-mobile.png";
import shade4 from "@/assets/Shade-4.png";

export default function DigitalFinalCtaSection() {
  return (
    <section className="relative overflow-x-clip py-16 lg:py-28">
      {/* Outside left shade — soft radial fade, no hard section cut */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shade4.src}
        alt=""
        className="pointer-events-none absolute left-[-8%] top-1/2 z-0 h-[140%] w-[min(65vw,760px)] max-w-none -translate-y-1/2 select-none object-cover object-left opacity-95"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 20% 50%, #000 0%, #000 35%, transparent 72%)",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 20% 50%, #000 0%, #000 35%, transparent 72%)",
        }}
        aria-hidden
      />

      <div className="container relative z-10">
        <div className="relative overflow-hidden rounded-[28px] bg-white px-6 py-10 lg:rounded-[40px] lg:px-[70px] lg:py-[70px]">
          <Image
            src={ctaImage}
            alt=""
            className="pointer-events-none absolute right-[8%] top-[12%] hidden w-[58%] select-none object-contain lg:block"
            style={{
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 65% at 70% 45%, #000 20%, transparent 75%)",
              maskImage:
                "radial-gradient(ellipse 70% 65% at 70% 45%, #000 20%, transparent 75%)",
            }}
            aria-hidden
            priority
          />
          <Image
            src={ctaShadeMobile}
            alt=""
            className="pointer-events-none absolute right-0 top-0 block h-full w-auto select-none object-right-top opacity-90 lg:hidden"
            aria-hidden
            priority
          />

          <div className="relative z-10">
            <h2
              className="font-medium leading-[1.15] tracking-[-0.05em] text-[#0A0A0C]"
              style={{ fontSize: "clamp(28.44px, 4.2vw, 50.06px)" }}
            >
              Great Marketing Doesn&apos;t Happen By Chance,
              <br className="hidden sm:block" />
              {` `}
              <em className="font-normal italic text-[#0A0A0C]/55">
                It Happens With Strategy.
              </em>
            </h2>

            <p
              className="mt-6 max-w-[620px] font-medium leading-[1.55] tracking-[-0.02em] text-[#0A0A0C]/75"
              style={{ fontSize: "clamp(15px, 1.15vw, 16px)" }}
            >
              Whether you&apos;re looking to build your brand, generate qualified leads, improve
              your online visibility, or scale your business, we&apos;ll help you create a
              marketing strategy that delivers measurable growth.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10 lg:gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1D17E0] py-3 px-7 text-[15px] font-medium leading-none tracking-[-0.02em] text-white transition-colors duration-300 hover:bg-[#0A0A0C] lg:px-8 lg:py-4 lg:text-[16px]"
              >
                Start Growing
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white py-3 px-7 text-[15px] font-medium leading-none tracking-[-0.02em] text-[#0A0A0C] transition-colors duration-300 hover:border-[var(--service-accent,#9DF560)] hover:bg-[var(--service-accent,#9DF560)] lg:px-8 lg:py-4 lg:text-[16px]"
              >
                Book a Strategy Session with Nabeel Danish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
