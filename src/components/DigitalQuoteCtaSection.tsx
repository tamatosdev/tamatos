import Image from "next/image";
import Link from "next/link";
import CEO from "@/assets/CEO.png";
import ctaShade from "@/assets/cta-2-shadow.png";
import ctaShadeMobile from "@/assets/cta-shade-mobile.png";

export default function DigitalQuoteCtaSection() {
  return (
    <section className="relative overflow-x-clip py-16 lg:py-28">
      <div className="container relative">
        <div className="relative overflow-hidden rounded-[28px] bg-white px-6 py-10 lg:rounded-[40px] lg:px-14 lg:py-14">
          <Image
            src={ctaShade}
            alt=""
            className="pointer-events-none absolute inset-0 hidden h-full w-full select-none object-cover opacity-80 lg:block"
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
            <div
              className="font-normal leading-[1.45] tracking-[-0.03em] text-[#0A0A0C]"
              style={{ fontSize: "clamp(17.78px, 1.8vw, 24.89px)" }}
            >
              <p>
                Marketing isn&apos;t about being the loudest brand in the room. It&apos;s about
                being the most relevant.
              </p>
              <p className="mt-5 italic text-[#0A0A0C]">
                <span className="font-normal text-[#0A0A0C]/55">At Tamatos,</span> We help
                businesses cut through the noise with strategies that build trust, create
                meaningful connections, and drive measurable growth.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-6 lg:mt-14 lg:flex-row lg:items-center lg:gap-8">
              <div className="flex shrink-0 items-center gap-3.5">
                <div className="overflow-hidden rounded-full ring-2 ring-[var(--service-accent,#9DF560)] ring-offset-0">
                  <Image
                    src={CEO}
                    alt="Nabeel Danish Rafiq"
                    width={56}
                    height={56}
                    className="h-12 w-12 rounded-full object-cover lg:h-14 lg:w-14"
                  />
                </div>
                <div>
                  <p
                    className="font-medium leading-tight tracking-[-0.03em] text-[#0A0A0C]"
                    style={{ fontSize: "clamp(16px, 1.2vw, 17.78px)" }}
                  >
                    Nabeel Danish Rafiq
                  </p>
                  <p className="mt-1 text-[12px] font-normal uppercase tracking-[-0.02em] text-[#0A0A0C]/55 lg:text-[13px]">
                    Co-founder &amp; CEO
                  </p>
                </div>
              </div>

              <div
                aria-hidden
                className="hidden h-px min-w-0 flex-1 bg-[#0A0A0C]/15 lg:block"
              />

              <Link
                href="/contact"
                className="group inline-flex w-fit shrink-0 items-center gap-2"
              >
                <span className="inline-flex items-center justify-center rounded-full bg-[var(--service-accent,#9DF560)] px-7 py-3.5 text-[16px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 group-hover:bg-[#0A0A0C] group-hover:text-white lg:px-8 lg:text-[16px]">
                  Book a Strategy Session
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0C] text-white transition-colors duration-300 group-hover:bg-[var(--service-accent,#9DF560)] group-hover:text-[#0A0A0C]">
                  <svg width="18" height="14" viewBox="0 0 20 16" fill="none" aria-hidden>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
