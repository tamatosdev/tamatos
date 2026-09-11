import Image from "next/image";
import meta from "@/assets/Digital-stacks/meta-logo.png";
import hubspot from "@/assets/Digital-stacks/hubspots.png";
import googleAnalytics from "@/assets/Digital-stacks/google-analytics.png";
import linkedin from "@/assets/Digital-stacks/linkedin.png";
import notion from "@/assets/Digital-stacks/notion.png";
import whatsapp from "@/assets/Digital-stacks/whatsapp.png";
import semrush from "@/assets/Digital-stacks/semrush.png";
import googleTrends from "@/assets/Digital-stacks/google-trends.png";
import tiktok from "@/assets/Digital-stacks/tiktok.png";
import ahrefs from "@/assets/Digital-stacks/ahref.png";
import klaviyo from "@/assets/Digital-stacks/klaviyo.png";
import canva from "@/assets/Digital-stacks/canva.png";
import googleAds from "@/assets/Digital-stacks/google-ads.png";

/** Sequence from digital screenshot */
const logos = [
  { src: meta, alt: "Meta" },
  { src: hubspot, alt: "HubSpot" },
  { src: googleAnalytics, alt: "Google Analytics" },
  { src: linkedin, alt: "LinkedIn" },
  { src: notion, alt: "Notion" },
  { src: whatsapp, alt: "WhatsApp" },
  { src: semrush, alt: "SEMrush" },
  { src: googleTrends, alt: "Google Trends" },
  { src: tiktok, alt: "TikTok" },
  { src: ahrefs, alt: "ahrefs" },
  { src: klaviyo, alt: "klaviyo" },
  { src: canva, alt: "Canva" },
  { src: googleAds, alt: "Google Ads" },
];

export default function DigitalTechMarqueeSection() {
  return (
    <section className="relative overflow-x-clip py-16 lg:py-28">
      <div className="container relative">
        <h2
          className="mx-auto max-w-[900px] text-center font-medium leading-[1.12] tracking-[-0.04em] text-white"
          style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)" }}
        >
          Technologies <span className="text-[var(--service-accent,#9DF560)]">We</span> Work With
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
