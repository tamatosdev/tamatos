import Image from "next/image";
import Link from "next/link";
import Asterisk from "@/assets/asteric.png";

const challenges = [
  "Your social media is active but not generating business.",
  "Your website isn't attracting qualified organic traffic.",
  "Your content lacks consistency and direction.",
  "Your influencer campaigns don't deliver measurable ROI.",
  "You're spending on ads without sustainable long-term growth.",
  "Marketing efforts feel disconnected across different channels.",
];

export default function DigitalChallengesSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <div className="mx-auto mb-14 h-16 w-px bg-white/20 lg:mb-20" />

        <div className="max-w-[980px]">
          <h2
            className="font-medium leading-[1.15] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(28.44px, 3.8vw, 50.06px)" }}
          >
            Many Businesses Invest In{" "}
            <em className="font-normal italic text-white/45">Marketing,</em> Without Seeing{" "}
            <span className="font-semibold text-[var(--service-accent,#9DF560)]">
              Meaningful Business Results.
            </span>
          </h2>

          <p className="mt-6 text-[18px] leading-[1.55] tracking-[-0.02em] text-white/80 lg:text-[17.78px]">
            If you&apos;re facing challenges like:
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {challenges.map((text, index) => {
              const isLastRow = index >= challenges.length - 2;
              return (
                <div
                  key={text}
                  className={`flex items-start gap-4 py-7 lg:gap-5 lg:py-9 ${
                    index < challenges.length - 1 ? "border-b border-white/12" : ""
                  } ${isLastRow ? "md:border-b-0" : ""} ${
                    index % 2 === 0 ? "md:pr-10 lg:pr-16" : "md:pl-10 lg:pl-16"
                  }`}
                >
                  <Image
                    src={Asterisk}
                    alt=""
                    width={28}
                    height={28}
                    className="mt-1 h-5 w-5 shrink-0 object-contain lg:mt-1.5 lg:h-6 lg:w-6"
                  />
                  <p
                    className="font-medium leading-[1.4] tracking-[-0.03em] text-white"
                    style={{ fontSize: "clamp(18px, 1.4vw, 21.33px)" }}
                  >
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--service-accent,#9DF560)] py-3 px-7 text-[18px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 hover:bg-white lg:mt-14 lg:px-8 lg:py-4 lg:text-[18px]"
        >
          Let&apos;s Fix Your Marketing Funnel
        </Link>
      </div>
    </section>
  );
}
