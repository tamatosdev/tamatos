import Image from "next/image";
import type { StaticImageData } from "next/image";
import fatimaGroupLogo from "@/assets/about-client-logos/fatima-group-logo.png";
import muchoLogo from "@/assets/about-client-logos/Mucho-logo.png";
import multanLogo from "@/assets/about-client-logos/multan-logo.png";
import myzoiLogo from "@/assets/about-client-logos/myzoi-logo.png";
import nthLogo from "@/assets/about-client-logos/nth-logo.png";
import prestigeLogo from "@/assets/about-client-logos/prestige-logo.png";
import rcsiLogo from "@/assets/about-client-logos/rcsi-logo.png";
import rocheLogo from "@/assets/about-client-logos/roche-logo.png";
import salesfloLogo from "@/assets/about-client-logos/salesflo-logo.png";
import siutLogo from "@/assets/about-client-logos/siut-logo.png";

/** Same logos / sequence as About page ClientLogos */
const logos: { src: StaticImageData; height: number; width: number }[] = [
  { src: fatimaGroupLogo, height: 52, width: 130 },
  { src: muchoLogo, height: 52, width: 130 },
  { src: siutLogo, height: 52, width: 130 },
  { src: prestigeLogo, height: 52, width: 130 },
  { src: rcsiLogo, height: 110, width: 110 },
  { src: myzoiLogo, height: 52, width: 130 },
  { src: salesfloLogo, height: 52, width: 130 },
  { src: rocheLogo, height: 52, width: 130 },
  { src: nthLogo, height: 52, width: 130 },
  { src: multanLogo, height: 110, width: 130 },
];

export default function DevelopmentClientLogosSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <h2
          className="mx-auto max-w-[900px] text-center font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
        >
          Loved By Teams{" "}
          <em className="font-normal italic text-white/45">Worldwide</em>
          <span className="text-[var(--service-accent,#FC7031)]">.</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-14 lg:grid-cols-5 lg:gap-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="group flex h-[112px] w-full items-center justify-center overflow-hidden rounded-[14px] bg-[#FFFFFF0D] p-4 transition-colors duration-300 hover:bg-[#FFFFFF26] sm:h-[128px] lg:h-[200px] lg:p-6"
            >
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className={`w-auto max-w-[85%] object-contain opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100 ${
                  logo.height > 52 ? "h-14 lg:h-[110px]" : "h-10 lg:h-[52px]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
