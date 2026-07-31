"use client";

import Image from "next/image";
import figma from "@/assets/Tech logo/figma-logo.png";
import flutter from "@/assets/Tech logo/flutter-logo.png";
import framer from "@/assets/Tech logo/framer-logo.png";
import nextjs from "@/assets/Tech logo/nextjs-logo.png";
import react from "@/assets/Tech logo/react-logo.png";
import webflow from "@/assets/Tech logo/webflow-logo.png";
import wordpress from "@/assets/Tech logo/wordpress-logo.png";
import type { LogoMarqueeData } from "@/lib/home";

const defaultLogos = [
  { src: figma, alt: "Figma" },
  { src: flutter, alt: "Flutter" },
  { src: framer, alt: "Framer" },
  { src: nextjs, alt: "Next.js" },
  { src: react, alt: "React" },
  { src: webflow, alt: "Webflow" },
  { src: wordpress, alt: "WordPress" },
];

export default function LogoMarquee({ data }: { data?: LogoMarqueeData }) {
  const cmsLogos = data?.logos
    ?.filter((logo) => logo.image?.url)
    .map((logo) => ({
      src: logo.image!.url!,
      alt: logo.name || logo.image?.alt || "Logo",
      remote: true,
    }));

  const logos =
    cmsLogos && cmsLogos.length > 0
      ? cmsLogos
      : defaultLogos.map((logo) => ({ ...logo, remote: false }));

  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center justify-center mx-6 md:mx-10 shrink-0">
            {"remote" in logo && logo.remote ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src as string}
                alt={logo.alt}
                className="h-10 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ) : (
              <Image
                src={logo.src as typeof figma}
                alt={logo.alt}
                height={40}
                width={120}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
