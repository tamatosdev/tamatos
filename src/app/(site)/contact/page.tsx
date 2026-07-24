import Image from "next/image";
import Link from "next/link";
import contactBg from "@/assets/contact-page-box-bg.png";
import arrowShade2 from "@/assets/arrow-shade2.png";
import ContactForm from "@/components/ContactForm";
import GlobalFootprint from "@/components/GlobalFootprint";
import nabeel from "@/assets/CEO.png";
import ReviewTab from "@/components/ReviewTab";

export default function ContactPage() {
  return (
    <main style={{ overflowX: "clip" }}>
      <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-28">
        <div className="absolute bottom-0 right-0 pointer-events-none select-none" style={{ zIndex: -1, transform: "translateY(30%)" }}>
          <Image src={arrowShade2} alt="" priority />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <div className="mb-8 lg:mb-10">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white/70 font-medium"
              style={{
                fontSize: "16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #ffffff26",
                boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
              }}
            >
              <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white">Contact Us</span>
            </div>
          </div>

          {/* Two-column card layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-10 items-stretch">

            {/* Left — info card */}
            <div className="relative rounded-[30px] overflow-hidden py-10 px-6 sm:py-12 sm:px-8 lg:py-16 lg:px-10 flex flex-col gap-12">
              <Image src={contactBg} alt="" fill className="object-cover object-center pointer-none:" />
              <div className="relative z-10 flex flex-col h-full gap-12">

                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-[#9DF560]">
                    <Image src={nabeel} alt="Nabeel Danish Rafiq" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-[24px] leading-tight">Nabeel Danish Rafiq</p>
                    <p className="text-white/50 text-[16px] font-normal tracking-widest uppercase mt-0.5"
                      style={{ letterSpacing: "-0.03em" }}
                    >Co-Founder & CEO</p>
                  </div>
                </div>

                {/* Heading */}
                <h2
                  className="text-white font-medium leading-[1.2] flex-1"
                  style={{ fontSize: "clamp(28px, 2.5vw, 50px)", letterSpacing: "-0.04em" }}
                >
                  Ready to{" "}
                  <em className="italic text-white/50">sauce up</em>
                  <br />
                  your Digital Presence?
                </h2>

                {/* Contact info */}
                <div className="flex flex-col gap-12">
                  <div>
                    <p className="text-white/50 text-[16px] font-medium mb-2">Call us for expert solutions.</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <a href="tel:+923356787927" className="text-white font-medium text-[20px] sm:text-[24px] hover:text-[#9DF560] transition-colors duration-200">
                        +92 335 6787927
                      </a>
                      <span className="text-white/30">|</span>
                      <a href="tel:+16194320949" className="text-white font-medium text-[20px] sm:text-[24px] hover:text-[#9DF560] transition-colors duration-200">
                        +1 (619) 4320949
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/50 text-[16px] font-medium mb-2">Our friendly team here to help.</p>
                    <a href="mailto:hello@tamatos.com" className="text-white font-medium text-[20px] sm:text-[24px] hover:text-[#9DF560] transition-colors duration-200">
                      hello@tamatos.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right — form card */}
            <div className="bg-white rounded-[30px] py-10 px-6 sm:py-12 sm:px-8 lg:py-16 lg:px-10">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      <GlobalFootprint />

      <div className="other-page-section">
        <ReviewTab />
      </div>

    </main>
  );
}
