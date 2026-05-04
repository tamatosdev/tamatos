import Image from "next/image";
import Link from "next/link";
import CEO from "@/assets/CEO.png";
import buttonicon1 from "@/assets/button-icon1.png";
import buttonicon2 from "@/assets/button-icon2.png";

export default function CtaSection() {
  return (
    <section className="container py-48">
      <div
        className="grid items-center gap-8 py-8.25 px-15"
        style={{ background: "#fff", borderRadius: "30px", gridTemplateColumns: "1fr auto 1fr" }}
      >
        {/* Column 1 — CEO */}
        <div className="flex items-center gap-4">
          <Image
            src={CEO}
            alt="Nabeel Danish Rafiq"
            width={80}
            height={80}
            className="rounded-full object-cover flex-shrink-0"
          />
          <div>
            <p className="text-[#0A0A0C] font-medium text-[20px] leading-tight tracking-[-0.03em]">
              Nabeel Danish Rafiq
            </p>
            <p className="text-[#0A0A0C]/80 font-normal uppercase text-[16px] tracking-[-0.03em] mt-0.5">
              Co-founder & CEO
            </p>
          </div>
        </div>

        {/* Column 2 — Heading */}
        <div className="text-center px-4">
          <h2 className="text-[#0A0A0C] text-left font-medium text-[30px] leading-[1.2] tracking-[-0.04em]">
            Ready to Grow Your<br />Business Online?
          </h2>
        </div>

        {/* Column 3 — Text + CTA */}
        <div className="flex flex-col items-start gap-4 text-left">
          <p className="text-[#0A0A0C]/80 font-normal text-[18px] leading-[1.5] tracking-[-0.03em]">
            Hire the web development experts who deliver results.
          </p>
          <Link
            href="/contact"
            className="group  inline-flex items-center rounded-full bg-transparent border border-[#0A0A0C]/30 hover:bg-[#9DF560] hover:pl-[10] hover:border-[#9DF560] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] pl-8 group-hover:pl-5 pr-10 py-2.5"
          >
            {/* Icons — expand from left on hover */}
            <span className="flex items-center gap-2 max-w-0 overflow-hidden opacity-0 group-hover:max-w-40 group-hover:opacity-100 group-hover:mr-3 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
              <span className="w-10 h-10 rounded-full bg-[#0A0A0C] flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={buttonicon1} alt="" width={32} height={32} className="object-cover" />
              </span>
              <span className="text-[#0A0A0C] font-bold text-[16px] leading-none shrink-0">+</span>
              <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                <Image src={buttonicon2} alt="" width={32} height={32} className="object-cover" />
              </span>
            </span>

            <span className="text-[#0A0A0C]  group-hover:text-[#0A0A0C] font-medium text-[18px] leading-none tracking-[-0.03em] transition-colors duration-300 whitespace-nowrap">
              Book a Call Now
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
