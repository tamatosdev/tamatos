import Image from "next/image";
import unileverLogo from "@/assets/Design-client-logos/unilever-logo.png";
import multanLogo from "@/assets/Design-client-logos/multan-logo.png";
import salesfloLogo from "@/assets/Design-client-logos/salesflo-logo.png";
import stillmansLogo from "@/assets/Design-client-logos/stillmans-logo.png";
import intFurnitureLogo from "@/assets/Design-client-logos/int-furniture-logo.png";
import himalayaLogo from "@/assets/Design-client-logos/Himalaya-logo.png";
import globalLogo from "@/assets/Design-client-logos/globa-logo.png";
import mconLogo from "@/assets/Design-client-logos/mcon-logo.png";
import trueAestheticLogo from "@/assets/Design-client-logos/true-asthetic-logo.png";
import kbtLogo from "@/assets/Design-client-logos/kbt-logo.png";

/** Design screenshot sequence */
const logos = [
  { src: unileverLogo, height: 52 },
  { src: multanLogo, height: 80 },
  { src: salesfloLogo, height: 52 },
  { src: stillmansLogo, height: 52 },
  { src: intFurnitureLogo, height: 52 },
  { src: himalayaLogo, height: 52 },
  { src: globalLogo, height: 52 },
  { src: mconLogo, height: 52 },
  { src: trueAestheticLogo, height: 52 },
  { src: kbtLogo, height: 52 },
];

export default function DesignClientLogosSection() {
  return (
    <section className="relative overflow-x-clip py-20 lg:py-28">
      <div className="container relative">
        <h2
          className="mx-auto max-w-[900px] text-center font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(26px, 4vw, 50.06px)" }}
        >
          Loved By Teams{" "}
          <em className="font-normal italic text-white/45">Worldwide</em>
          <span className="text-[var(--service-accent,#03E4AC)]">.</span>
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
                width={130}
                height={logo.height}
                className={`w-auto max-w-[85%] object-contain opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100 ${
                  logo.height > 52 ? "h-14 lg:h-[80px]" : "h-10 lg:h-[52px]"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
