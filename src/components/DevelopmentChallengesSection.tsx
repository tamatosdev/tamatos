import Image from "next/image";
import Link from "next/link";
import orangeStar from "@/assets/orange-star.png";

const challenges = [
  "You're getting traffic, but not enough conversions.",
  "Your website doesn't connect with the tools your business depends on.",
  "Adding new functionality has become unnecessarily difficult.",
  "Performance is affecting the customer experience.",
  "Your team relies on manual processes that could be automated.",
  "You're ready to build something better, but don't know where to start.",
];

export default function DevelopmentChallengesSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <div className="mx-auto mb-14 h-16 w-px bg-white/20 lg:mb-20" />

        <div className="max-w-[980px]">
          <h2
            className="font-medium leading-[1.15] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(28.44px, 3.8vw, 50.06px)" }}
          >
            Your <em className="font-normal italic text-white/45">Business</em> Has Outgrown Your
            Technology
            <span className="text-[var(--service-accent,#FC7031)]">.</span>
          </h2>

          <p className="mt-6 text-[16px] leading-[1.55] tracking-[-0.02em] text-white/80 lg:text-[17.78px]">
            Technology should empower your business, not slow it down.
          </p>

          <p className="mt-6 text-[16px] leading-[1.55] tracking-[-0.02em] text-white/80 lg:text-[17.78px]">
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
                    src={orangeStar}
                    alt=""
                    width={28}
                    height={28}
                    className="mt-1 h-5 w-5 shrink-0 object-contain lg:mt-1.5 lg:h-6 lg:w-6"
                  />
                  <p
                    className="font-medium leading-[1.4] tracking-[-0.03em] text-white"
                    style={{ fontSize: "clamp(16px, 1.4vw, 21.33px)" }}
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
          className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--service-accent,#FC7031)] py-3 px-7 text-[15px] font-medium leading-none tracking-[-0.03em] text-[#0A0A0C] transition-colors duration-300 hover:bg-white lg:mt-14 lg:px-8 lg:py-4 lg:text-[16px]"
        >
          Let&apos;s Talk about Your Growth
        </Link>
      </div>
    </section>
  );
}
