"use client";

import Image from "next/image";
import framer from "@/assets/Development stack/framer.png";
import react from "@/assets/Development stack/react.png";
import nextjs from "@/assets/Development stack/next.png";
import supabase from "@/assets/Development stack/supabase.png";
import shopify from "@/assets/Development stack/shopify.png";
import tailwind from "@/assets/Development stack/tailwand.png";
import wordpress from "@/assets/Development stack/wordpress.png";
import figma from "@/assets/Development stack/figma.png";
import firebase from "@/assets/Development stack/firebase.png";
import flutter from "@/assets/Development stack/flutter.png";
import type { LogoMarqueeData } from "@/lib/home";

/** Same sequence as DevelopmentTechMarqueeSection */
const defaultLogos = [
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

export default function LogoMarquee({ data }: { data?: LogoMarqueeData }) {
  void data;

  const logos = defaultLogos;

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center justify-center mx-6 md:mx-10 shrink-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={40}
              width={160}
              className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 md:h-10"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
