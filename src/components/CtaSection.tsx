import Image from "next/image";
import Link from "next/link";
import CEO from "@/assets/CEO.png";
import buttonicon1 from "@/assets/button-icon1.png";
import buttonicon2 from "@/assets/button-icon2.png";

export default function CtaSection() {
  return (
    <section className="container py-16 md:py-32 lg:py-48 relative z-1">
      <div
        className="flex flex-col lg:grid items-start gap-3 md:gap-6 lg:gap-0 py-4 px-4 sm:px-6 md:px-8 lg:py-8 lg:px-0 text-left"
        style={{
          background: "#fff",
          borderRadius: "30px",
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        {/* Column 1 — CEO */}
        <div className="flex items-center gap-3 w-full lg:px-10">
          <Image
            src={CEO}
            alt="Nabeel Danish Rafiq"
            width={80}
            height={80}
            className="rounded-full object-cover shrink-0 w-[42px] h-[42px] md:w-20 md:h-20"
          />

          <div>
            <p
              className="text-[#0A0A0C] font-medium leading-tight tracking-[-0.03em]"
              style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
            >
              Nabeel Danish Rafiq
            </p>

            <p
              className="text-[#0A0A0C]/80 font-normal uppercase tracking-[-0.03em] mt-0.5"
              style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
            >
              Co-founder &amp; CEO
            </p>
          </div>
        </div>

        {/* Column 2 — Heading */}
        <div className="text-left w-full lg:px-10">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.2] tracking-[-0.04em]"
            style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
          >
            Ready to Grow Your
            <br />
            Business Online?
          </h2>
        </div>

        {/* Column 3 — Text + CTA */}
        <div className="flex flex-col items-start gap-2 text-left w-full lg:px-10">
          <p
            className="text-[#0A0A0C]/80 font-normal leading-normal tracking-[-0.03em]"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
          >
            Hire the web development experts who deliver results.
          </p>

         <Link
  href="/contact"
  className="group inline-flex items-center rounded-full border border-[#9DF560] bg-[#9DF560] lg:bg-transparent lg:border-[#0A0A0C]/30 lg:hover:bg-[#9DF560] lg:hover:border-[#9DF560] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pl-8 pr-10 py-2"
>
  {/* ICONS WRAPPER */}
  <span className="flex items-center gap-2 max-w-40 opacity-100 mr-3 lg:max-w-0 lg:opacity-0 lg:mr-0 lg:group-hover:max-w-40 lg:group-hover:opacity-100 lg:group-hover:mr-3 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">

    <span className="w-10 h-10 rounded-full bg-[#0A0A0C] flex items-center justify-center shrink-0 overflow-hidden">
      <Image
        src={buttonicon1}
        alt=""
        width={32}
        height={32}
        className="object-cover"
      />
    </span>

    <span className="text-[#0A0A0C] font-bold text-[16px] leading-none shrink-0">
      +
    </span>

    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
      <Image
        src={buttonicon2}
        alt=""
        width={32}
        height={32}
        className="object-cover"
      />
    </span>

  </span>

  {/* TEXT */}
  <span
    className="text-[#0A0A0C] font-medium leading-none tracking-[-0.03em] whitespace-nowrap"
    style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}
  >
    Book a Call Now
  </span>
</Link>
        </div>
      </div>
    </section>
  );
}