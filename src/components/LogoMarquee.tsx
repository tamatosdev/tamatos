"use client";

import Image from "next/image";
import figma from "@/assets/Tech logo/figma-logo.png";
import flutter from "@/assets/Tech logo/flutter-logo.png";
import framer from "@/assets/Tech logo/framer-logo.png";
import nextjs from "@/assets/Tech logo/nextjs-logo.png";
import react from "@/assets/Tech logo/react-logo.png";
import webflow from "@/assets/Tech logo/webflow-logo.png";
import wordpress from "@/assets/Tech logo/wordpress-logo.png";

const logos = [
  { src: figma, alt: "Figma" },
  { src: flutter, alt: "Flutter" },
  { src: framer, alt: "Framer" },
  { src: nextjs, alt: "Next.js" },
  { src: react, alt: "React" },
  { src: webflow, alt: "Webflow" },
  { src: wordpress, alt: "WordPress" },
];

export default function LogoMarquee() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center justify-center mx-10 flex-shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={40}
              width={120}
              className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
