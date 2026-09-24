import Image from "next/image";
import Link from "next/link";
import developmentBanner from "@/assets/development-banner-image.png";
import greenArrow from "@/assets/green-arrow.svg";

export default function DevelopmentHeroSection() {
  return (
    <section className="relative overflow-x-clip pt-28 pb-12 lg:pt-40 lg:pb-24">
      <div className="container relative">
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
          <span className="text-white">Development</span>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1
              className="font-medium leading-[1.12] tracking-[-0.04em] text-white lg:leading-[1.08]"
              style={{ fontSize: "clamp(26px, 4.8vw, 71.11px)" }}
            >
              Digital Products,
              <br className="hidden lg:block" />
              {` `}
              <em className="font-normal italic text-white/45">Engineered</em> For
              <br className="hidden lg:block" />
              {` `}
              <span className="text-[var(--service-accent,#FC7031)]">Business Growth</span>
            </h1>

            <p className="mt-5 max-w-[560px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/70 sm:mt-6 sm:text-[18px]">
              We build fast, scalable, and future-ready custom digital solutions, websites and
              mobile applications that are designed to perform today and evolve with your business
              tomorrow.
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white py-3 px-7 text-[18px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 hover:bg-[var(--service-accent,#FC7031)] lg:px-8 lg:py-4 lg:text-[18px]"
              >
                Build Your Scalable Digital Solution
              </Link>

              <Link
                href="/work"
                className="inline-flex items-center gap-3 text-[18px] font-medium leading-none tracking-[-0.05em] text-white transition-colors duration-300 hover:text-white/80 lg:text-[19.56px]"
              >
                View Our Work
                <Image
                  src={greenArrow}
                  alt=""
                  width={20}
                  height={16}
                  className="h-4 w-5"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(52%) sepia(78%) saturate(1800%) hue-rotate(346deg) brightness(101%) contrast(98%)",
                  }}
                />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[420px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
            <Image
              src={developmentBanner}
              alt="Development products engineered for growth"
              className="h-auto w-full max-w-[640px] object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
