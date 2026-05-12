import Link from "next/link";
import Image from "next/image";
import ctaImage from "@/assets/cta-2-shadow.png";

export default function CtaSection2() {
  return (
    <section className="container relative py-12 px-0 ">
      
      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 overflow-hidden"
        style={{
          background: "#fff",
          borderRadius: "40px",
          padding: "clamp(48px, 8.3vw, 100px) clamp(32px, 8vw, 95px)",
        }}
      >
        
            <Image
              src={ctaImage}
              alt=""
              className="absolute right-[10%] top-[50px] h-[430px] w-[60%] object-cover object-center pointer-events-none select-none"
              priority
            />

        {/* Left — heading + buttons */}
        <div className="flex flex-col gap-8">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.2] index-10 relative "
            style={{ fontSize: "clamp(32px, 4.5vw, 60px)", letterSpacing: "-0.05em" }}
          >
            Got a <em className="italic text-[#0A0A0C]/70">Kickass</em> Idea?<br /> We'll Help You Make it Real.
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/work"
              className="inline-flex items-center justify-center rounded-full font-medium text-white bg-[#1D17E0] hover:bg-[#0A0A0C] transition-colors duration-300"
              style={{
                padding: "15px 40px",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                letterSpacing: "-0.02em",
              }}
            >
              See Our Work
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[0A0A0C]/40 font-medium bg-white text-[#0A0A0C] transition-colors duration-300 hover:bg-[#9DF560] hover:text-[#0A0A0C] hover:border-[#9DF560]"
              style={{
                padding: "15px 40px",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                letterSpacing: "-0.02em",
              }}
            >
              Book a Free Call
            </Link>
          </div>
        </div>

        {/* Right — description */}
        <div className="lg:max-w-[340px]">
          <p
            className="font-medium leading-relaxed index-10 relative"
            style={{
              fontSize: "clamp(14px, 1.2vw, 18px)",
              letterSpacing: "-0.02em",
              color: "rgba(10,10,12,0.8)",
            }}
          >
            You&apos;ve seen what we&apos;ve built and what clients say about it. The only thing left is starting. Drop us your brief — or just say hi. Either works.
          </p>
        </div>
      </div>
    </section>
  );
}
