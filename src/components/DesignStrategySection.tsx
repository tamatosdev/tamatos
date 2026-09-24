import DesignStrategyCta from "@/components/DesignStrategyCta";

const questions = [
  { number: "01", text: "Who are you trying to reach?" },
  { number: "02", text: "Why should customers choose you?" },
  { number: "03", text: "What perception do you want to create?" },
  { number: "04", text: "Where does your business want to be in three years?" },
];

export default function DesignStrategySection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="container relative">
        <div className="mx-auto mb-14 h-16 w-px bg-white/20 lg:mb-20" />

        <div className="mx-auto max-w-[980px] text-center">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.04em] text-white"
            style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
          >
            A Logo Can Make You{" "}
            <em className="font-normal italic text-white/45">Recognizable</em>
            <br className="hidden sm:block" />
            {` `}Strategy Makes You{" "}
            <span className="font-semibold text-[var(--service-accent,#03E4AC)]">Unforgettable.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-[760px] text-[18px] leading-[1.55] tracking-[-0.02em] text-white/80">
            At Tamatos, we don&apos;t begin with colours, typography, or logo concepts. We begin
            by asking better questions.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-[1100px] py-10 lg:mt-16 lg:py-14">
          <div className="relative grid grid-cols-1 md:grid-cols-2">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden md:block"
            >
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/12" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/12" />
            </div>

            {questions.map((item, index) => (
              <div
                key={item.number}
                className={`relative flex items-center gap-4 px-4 py-7 sm:gap-5 sm:px-8 sm:py-10 lg:gap-6 lg:px-12 lg:py-12 ${
                  index < questions.length - 1 ? "border-b border-white/12 md:border-b-0" : ""
                }`}
              >
                <span
                  className="shrink-0 font-medium leading-none tracking-[-0.04em] text-[var(--service-accent,#03E4AC)]"
                  style={{ fontSize: "clamp(18px, 4vw, 50.06px)" }}
                >
                  {item.number}
                </span>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"
                />
                <span className="text-[18px] font-medium leading-snug tracking-[-0.03em] text-white sm:text-[20px] lg:text-[23.11px]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <DesignStrategyCta />
      </div>
    </section>
  );
}
