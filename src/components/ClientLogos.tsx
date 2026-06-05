import Image from "next/image";
import logo1 from "@/assets/client logos/1.png";
import logo2 from "@/assets/client logos/2.png";
import logo3 from "@/assets/client logos/3.png";
import logo4 from "@/assets/client logos/4.png";
import logo5 from "@/assets/client logos/5.png";
import logo6 from "@/assets/client logos/6.png";
import logo7 from "@/assets/client logos/7.png";
import logo8 from "@/assets/client logos/8.png";
import logo9 from "@/assets/client logos/9.png";
import logo10 from "@/assets/client logos/10.png";
import logo11 from "@/assets/client logos/11.png";
import logo12 from "@/assets/client logos/12.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12];

export default function ClientLogos() {
  return (
    <section className="container py-14 lg:py-24">

      {/* Heading */}
      <h2
        className="text-white font-medium leading-[1.2] mb-10 lg:mb-14 max-w-5xl"
        style={{ fontSize: "clamp(26px, 2.8vw, 48px)", letterSpacing: "-0.04em" }}
      >
        Since{" "}
        <span className="text-[#9DF560]">2021,</span>{" "}
        We&apos;ve Partnered with Visionary Clients to{" "}
        <em className="italic text-white/50">Craft Meaningful Impact</em>{" "}
        and Unforgettable Experiences.
      </h2>

      {/* Logo grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-[14px] p-5 lg:p-6 aspect-square"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <Image
              src={logo}
              alt=""
              className="w-auto h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              style={{ maxHeight: "50px", maxWidth: "100%" }}
            />
          </div>
        ))}
      </div>

    </section>
  );
}
