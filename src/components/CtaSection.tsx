import Image from "next/image";
import Link from "next/link";
import CEO from "@/assets/CEO.png";
import buttonicon1 from "@/assets/button-icon1.png";
import buttonicon2 from "@/assets/button-icon2.png";
import type { CtaCardData } from "@/lib/home";

export default function CtaSection({ data }: { data?: CtaCardData }) {
  const personName = data?.person?.name ?? "Nabeel Danish Rafiq";
  const personRole = data?.person?.role ?? "Co-founder & CEO";
  const personImage = data?.person?.image?.url;
  const heading = data?.heading ?? "Ready to Grow Your\nBusiness Online?";
  const description =
    data?.description ?? "Hire the web development experts who deliver results.";
  const buttonLabel = data?.button?.label ?? "Book a Call Now";
  const buttonHref = data?.button?.href ?? "/contact";

  const headingLines = heading.split("\n");

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
        <div className="flex items-center gap-3 w-full lg:px-10">
          {personImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={personImage}
              alt={data?.person?.image?.alt || personName}
              className="rounded-full object-cover shrink-0 w-[42px] h-[42px] md:w-20 md:h-20"
            />
          ) : (
            <Image
              src={CEO}
              alt={personName}
              width={80}
              height={80}
              className="rounded-full object-cover shrink-0 w-[42px] h-[42px] md:w-20 md:h-20"
            />
          )}

          <div>
            <p
              className="text-[#0A0A0C] font-medium leading-tight tracking-[-0.03em]"
              style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
            >
              {personName}
            </p>
            <p
              className="text-[#0A0A0C]/80 font-normal uppercase tracking-[-0.03em] mt-0.5"
              style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}
            >
              {personRole}
            </p>
          </div>
        </div>

        <div className="text-left w-full lg:px-10">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.2] tracking-[-0.04em]"
            style={{ fontSize: "clamp(20px, 2.2vw, 30px)" }}
          >
            {headingLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-2 text-left w-full lg:px-10">
          <p
            className="text-[#0A0A0C]/80 font-normal leading-normal tracking-[-0.03em]"
            style={{ fontSize: "clamp(14px, 1.3vw, 16px)" }}
          >
            {description}
          </p>

          <Link
            href={buttonHref}
            className="group inline-flex items-center rounded-full border border-[#9DF560] bg-[#9DF560] lg:bg-transparent lg:border-[#0A0A0C]/30 lg:hover:bg-[#9DF560] lg:hover:border-[#9DF560] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pl-8 pr-10 py-2"
          >
            <span className="flex items-center gap-2 max-w-40 opacity-100 mr-3 lg:max-w-0 lg:opacity-0 lg:mr-0 lg:group-hover:max-w-40 lg:group-hover:opacity-100 lg:group-hover:mr-3 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              <span className="w-10 h-10 rounded-full bg-[#0A0A0C] flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={buttonicon1} alt="" width={32} height={32} className="object-cover" />
              </span>
              <span className="text-[#0A0A0C] font-bold text-[16px] leading-none shrink-0">+</span>
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={buttonicon2} alt="" width={32} height={32} className="object-cover" />
              </span>
            </span>
            <span
              className="text-[#0A0A0C] font-medium leading-none tracking-[-0.03em] whitespace-nowrap"
              style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}
            >
              {buttonLabel}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
