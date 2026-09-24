import Image from "next/image";
import framer from "@/assets/Development stack/framer.png";
import react from "@/assets/Development stack/react.png";
import nextjs from "@/assets/Development stack/next.png";
import supabase from "@/assets/supabase-1.png";
import shopify from "@/assets/Development stack/shopify.png";
import tailwind from "@/assets/tailwand-1.png";
import wordpress from "@/assets/Development stack/wordpress.png";
import figma from "@/assets/Development stack/figma.png";
import firebase from "@/assets/Development stack/firebase.png";
import flutter from "@/assets/Development stack/flutter.png";

/** Sequence from development screenshot */
const logos = [
  { src: framer, alt: "Framer" },
  { src: react, alt: "React" },
  { src: nextjs, alt: "NEXT.js" },
  { src: supabase, alt: "supabase" },
  { src: shopify, alt: "shopify" },
  { src: tailwind, alt: "tailwindcss" },
  { src: wordpress, alt: "WORDPRESS" },
  { src: figma, alt: "Figma" },
  { src: firebase, alt: "Firebase" },
  { src: flutter, alt: "Flutter" },
];

export default function DevelopmentTechMarqueeSection() {
  return (
    <section className="relative overflow-x-clip py-16 lg:py-28">
      <div className="container relative">
        <h2
          className="mx-auto max-w-[900px] text-center font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)" }}
        >
          Technologies <span className="text-[var(--service-accent,#FC7031)]">We</span> Work With
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
