"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Fatima1 from "@/assets/farima-1.png";
import Fatima2 from "@/assets/fatima-2.png";
import Fatima3 from "@/assets/fatima-3.png";
import Mucho1 from "@/assets/mucho-1.png";
import Mucho2 from "@/assets/mucho-2.png";
import Mucho3 from "@/assets/mucho-3.png";
import Sep1 from "@/assets/sep-1.png";
import Sep2 from "@/assets/sep-2.png";
import Sep3 from "@/assets/sep-3.png";
import A471 from "@/assets/a47-1.png";
import A472 from "@/assets/a47-2.png";
import A473 from "@/assets/a47-3.png";
import PFlag from "@/assets/p-flag.png";
import USFlag from "@/assets/us-flag.png";
import UAEFlag from "@/assets/uae-flag.png";
import CanadaFlag from "@/assets/canada-flag.png";
import type { CaseStudyData } from "@/lib/home";

const pillStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
};

type CaseStudy = {
  pills: { label?: string; flag?: StaticImageData | string; flagAlt?: string }[];
  heading: string;
  paragraphs: string[];
  images: { src: StaticImageData | string; alt: string }[];
};

const defaultCaseStudies: CaseStudy[] = [
  {
    pills: [{ label: "UX/UI Design" }, { label: "WordPress" }, { flag: PFlag, flagAlt: "Pakistan" }],
    heading: "Fatima Group",
    paragraphs: [
      "Our ongoing digital partnership with one of Pakistan’s leading industrial groups. The objective was to bring Fatima Group’s diverse businesses, legacy, and vision together through a clearer, more modern digital presence.",
      "From the corporate website to digital experiences across its business verticals, the work continues to shape how Fatima Group communicates online. The website brings sectors including fertilizers, energy, textiles, and trading into one intuitive structure, making a complex group easier to navigate and understand while giving investors, stakeholders, and general audiences a seamless way to explore the group, its businesses, and its work.",
    ],
    images: [
      { src: Fatima1, alt: "Fatima Group — desktop" },
      { src: Fatima2, alt: "Fatima Group — mobile" },
      { src: Fatima3, alt: "Fatima Group — overview" },
    ],
  },
  {
    pills: [{ label: "UX/UI Design" }, { label: "Web Development" }, { flag: CanadaFlag, flagAlt: "Canada" }],
    heading: "MUCHO Burrito",
    paragraphs: [
      "We brought MUCHO Burrito’s Modern Mexicana rebrand to life with a bold, vibrant digital experience that puts the food front and centre.",
      "The objective was to make the website be beyond a standard restaurant experience, using bold visual language, engaging layouts, and an approach to make the menu and brand come alive on screen. The result is a website designed to build appetite, and make MUCHO Burrito’s personality impossible to miss.",
    ],
    images: [
      { src: Mucho1, alt: "MUCHO Burrito — desktop" },
      { src: Mucho2, alt: "MUCHO Burrito — mobile" },
      { src: Mucho3, alt: "MUCHO Burrito — overview" },
    ],
  },
  {
    pills: [{ label: "Web Developement" }, { label: "UX/UI Design" }, { label: "Logo Design" }, { flag: USFlag, flagAlt: "United States" }],
    heading: "BurqOra",
    paragraphs: [
      "A digital experience for a platform built to simplify sales operations. We designed and developed BurqOra’s website to make its workforce management, sales enforcement, and payment solutions easier to understand and explore.",
      "The experience turns a complex platform into a clear, approachable digital presence, helping businesses quickly understand what BurqOra does and where it can fit into their operations.",
    ],
    images: [
      { src: Sep1, alt: "BurqOra — desktop" },
      { src: Sep2, alt: "BurqOra — mobile" },
      { src: Sep3, alt: "BurqOra — overview" },
    ],
  },
  {
    pills: [{ label: "UX/UI Design" }, { label: "WordPress" }, { flag: UAEFlag, flagAlt: "UAE" }],
    heading: "A47",
    paragraphs: [
      "A47 is an AI-powered content platform built at the intersection of political satire, meme culture, and Web3. The objective was to create a digital presence that could match A47’s unconventional world without losing clarity.",
      "Built on WordPress with a custom UI/UX approach, the website brings AI agents, tokenomics, and community participation into one cohesive experience. The result is a digital presence that embraces the experimental nature of the platform while keeping its more complex ideas easy to explore.",
    ],
    images: [
      { src: A471, alt: "A47 — desktop" },
      { src: A472, alt: "A47 — mobile" },
      { src: A473, alt: "A47 — overview" },
    ],
  },
];

function mapCmsCaseStudies(items: CaseStudyData[]): CaseStudy[] {
  return items.map((item) => ({
    pills:
      item.pills?.map((pill) => ({
        label: pill.label,
        flag: pill.flag?.url,
        flagAlt: pill.flag?.alt,
      })) ?? [],
    heading: item.heading ?? "",
    paragraphs: item.paragraphs ?? [],
    images:
      item.images
        ?.filter((img) => img.url)
        .map((img, i) => ({
          src: img.url!,
          alt: img.alt ?? `Project image ${i + 1}`,
        })) ?? [],
  }));
}

function StudyImage({ src, alt, className }: { src: StaticImageData | string; alt: string; className?: string }) {
  if (typeof src === "string") {
  // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  }
  return <Image src={src} alt={alt} className={className} />;
}

export default function CaseStudySection({
  items,
  className = "",
}: {
  items?: CaseStudyData[];
  className?: string;
}) {
  const caseStudies =
    items?.length ? mapCmsCaseStudies(items) : defaultCaseStudies;

  const [activeIndex, setActiveIndex] = useState(0);
  const prevStudy = () => setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  const nextStudy = () => setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  const cs = caseStudies[activeIndex];

  if (!caseStudies.length) return null;

  return (
    <section className={`container py-12 md:py-24 ${className}`}>
      <div className="lg:hidden flex flex-col gap-6">
        <div key={activeIndex} className="animate-slide-in flex flex-col gap-6">
          {cs.images[0] && (
            <div className="rounded-[20px] overflow-hidden">
              <StudyImage src={cs.images[0].src} alt={cs.images[0].alt} className="w-full h-auto object-cover" />
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {cs.pills.map((pill, i) =>
              pill.flag ? (
                <span key={i} className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-[40px] text-white/80 font-normal" style={{ fontSize: "14px", letterSpacing: "-0.03em", ...pillStyle }}>
                  <StudyImage src={pill.flag} alt={pill.flagAlt ?? ""} className="w-6 h-[18px] rounded-sm object-cover" />
                </span>
              ) : (
                <span key={i} className="inline-flex items-center px-4 py-2 rounded-full text-white/80 font-normal" style={{ fontSize: "14px", letterSpacing: "-0.03em", ...pillStyle }}>
                  {pill.label}
                </span>
              )
            )}
          </div>
          <h2 className="text-white font-medium leading-[1.2]" style={{ fontSize: "17.78px", letterSpacing: "-0.04em" }}>{cs.heading}</h2>
          <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div>
            <p className="text-white/60 font-normal leading-relaxed line-clamp-4" style={{ fontSize: "18px", letterSpacing: "-0.03em" }}>
              {cs.paragraphs.join(" ")}
            </p>
            <span className="text-white/80 font-medium text-[18px] cursor-pointer">Read More</span>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button onClick={prevStudy} className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <button onClick={nextStudy} className="w-11 h-11 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-32">
        {caseStudies.map((study, idx) => (
          <div key={idx} className="grid grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28 flex flex-col gap-8 self-start">
              <div className="flex items-center gap-3 flex-wrap">
                {study.pills.map((pill, i) =>
                  pill.flag ? (
                    <span key={i} className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-[40px] text-white/80 font-normal min-w-[79px] min-h-[42px]" style={{ fontSize: "clamp(18px, 1.3vw, 18px)", letterSpacing: "-0.03em", ...pillStyle }}>
                      <StudyImage src={pill.flag} alt={pill.flagAlt ?? ""} className="w-6 h-[18px] rounded-sm object-cover" />
                    </span>
                  ) : (
                    <span key={i} className="inline-flex items-center px-4 py-2 rounded-full text-white/80 font-normal min-w-[79px] min-h-[42px]" style={{ fontSize: "clamp(18px, 1vw, 18px)", letterSpacing: "-0.03em", ...pillStyle }}>
                      {pill.label}
                    </span>
                  )
                )}
              </div>
              <h2 className="text-white font-medium leading-[1.2]" style={{ fontSize: "clamp(17.78px, 2vw, 32px)", letterSpacing: "-0.04em" }}>{study.heading}</h2>
              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="flex flex-col gap-5">
                {study.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/60 font-normal leading-relaxed" style={{ fontSize: "clamp(18px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}>{p}</p>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {study.images.map((img) => (
                <div key={img.alt} className="rounded-[20px] overflow-hidden">
                  <StudyImage src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
