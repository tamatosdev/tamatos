import Image from "next/image";
import Link from "next/link";
import smileGreen from "@/assets/smile-green.png";

export default function DesignOverlookedCtaSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container relative">
        <div className="mx-auto max-w-[900px] text-center">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            Great Businesses Are Overlooked
            <br className="hidden sm:block" />
            {` `}
            <span className="inline-flex items-center justify-center gap-2 sm:gap-3">
              <Image
                src={smileGreen}
                alt=""
                width={56}
                height={56}
                className="h-[0.72em] w-[0.72em] object-contain"
              />
              Every Day.
            </span>
          </h2>

          <p className="mt-5 text-[18px] leading-[1.55] tracking-[-0.02em] text-white sm:mt-6 sm:text-[22px] lg:text-[26.67px]">
            A <span className="font-semibold text-[var(--service-accent,#03E4AC)]">weak</span>
            {" "}brand doesn&apos;t just affect perception, it affects growth.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--service-accent,#03E4AC)] py-3 px-7 text-[18px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 hover:bg-white sm:mt-10 lg:px-8 lg:py-4 lg:text-[17.78px]"
          >
            Let&apos;s Build Towards Your Business Goals
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.1759 0.157581C11.5041 -0.0775052 11.9994 -0.0460291 12.2818 0.228402L19.8112 7.57316C20.0629 7.81907 20.0629 8.18105 19.8112 8.42694L12.2818 15.7707C11.9994 16.0461 11.5041 16.0776 11.1759 15.8425C10.8465 15.6064 10.8088 15.1923 11.0912 14.9179L17.5098 8.65615L0.78354 8.65615C0.350599 8.65615 0 8.36204 0 8.00007C0 7.63809 0.350599 7.34398 0.78354 7.34398L17.5098 7.34398L11.0912 1.08225C10.8088 0.807829 10.8465 0.393652 11.1759 0.157581Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
