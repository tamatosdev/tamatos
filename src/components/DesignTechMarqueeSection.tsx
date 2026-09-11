import Image from "next/image";
import photoshop from "@/assets/Design Stact/photoshop.png";
import figma from "@/assets/Design Stact/figma.png";
import canva from "@/assets/Design Stact/canva.png";
import sketch from "@/assets/Design Stact/sketch.png";
import miro from "@/assets/Design Stact/miro.png";
import illustrator from "@/assets/Design Stact/illustrator.png";
import affinity from "@/assets/Design Stact/affinity.png";
import indesign from "@/assets/Design Stact/indesign.png";

/** Sequence from design screenshot */
const logos = [
  { src: photoshop, alt: "Adobe Photoshop" },
  { src: figma, alt: "Figma" },
  { src: canva, alt: "Canva" },
  { src: sketch, alt: "Sketch" },
  { src: miro, alt: "Miro" },
  { src: illustrator, alt: "Adobe Illustrator" },
  { src: affinity, alt: "Affinity" },
  { src: indesign, alt: "Adobe InDesign" },
];

export default function DesignTechMarqueeSection() {
  return (
    <section className="relative overflow-x-clip py-16 lg:py-28">
      <div className="container relative">
        <h2
          className="mx-auto max-w-[900px] text-center font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)" }}
        >
          Technologies <span className="text-[var(--service-accent,#03E4AC)]">We</span> Work With
          <span className="text-white">.</span>
        </h2>
      </div>

      <div className="mt-12 overflow-hidden lg:mt-16">
        <div className="flex w-max animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="mx-8 flex shrink-0 items-center justify-center md:mx-12"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                height={40}
                width={160}
                className="h-8 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 md:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
