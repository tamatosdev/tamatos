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
import AuthorImg from "@/assets/CEO.png";
import type { CaseStudyData } from "@/lib/home";

const pillStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
};

type CaseStudy = {
  pills: { label?: string; flag?: StaticImageData | string; flagAlt?: string }[];
  heading: string;
  paragraphs: string[];
  author: { name: string; designation: string; image?: string };
  images: { src: StaticImageData | string; alt: string }[];
};

const defaultCaseStudies: CaseStudy[] = [
  {
    pills: [{ label: "UX/UI Design" }, { label: "WordPress" }, { flag: PFlag, flagAlt: "Pakistan" }],
    heading:
      "The Fatima Group Website is a corporate digital platform designed to represent one of Pakistan's leading industrial conglomerates with clarity, credibility, and modern visual appeal.",
    paragraphs: [
      "The objective was to revamp the digital presence to better communicate the group's diverse business verticals, legacy, and forward-looking vision while ensuring a seamless user experience for stakeholders, investors, and general audiences.",
      "The website was designed with a strong emphasis on structured storytelling—highlighting key sectors such as fertilizers, energy, textiles, and trading through clearly defined sections and intuitive navigation. Content architecture was carefully organized to ensure easy access to corporate information, company insights, and operational highlights.",
    ],
    author: { name: "Aetienne Sardon", designation: "Founder, CEO" },
    images: [
      { src: Fatima1, alt: "Fatima Group — desktop" },
      { src: Fatima2, alt: "Fatima Group — mobile" },
      { src: Fatima3, alt: "Fatima Group — overview" },
    ],
  },
  {
    pills: [{ label: "UX/UI Design" }, { label: "Web Development" }, { flag: CanadaFlag, flagAlt: "Canada" }],
    heading: "MUCHO Burrito is a Mexican cuisine restaurant that blends traditional Mexican flavors with modern innovation.",
    paragraphs: [
      "For MUCHO Burrito, the website needed to capture the vibrant fusion of authentic Mexican flavors and modern dining aesthetics. Using WordPress Elementor page builder, we revamped their site to deliver a seamless user experience with visually engaging design.",
      "Key features include intuitive navigation, a clean UI design, and functional artistry through dynamic artworks. We implemented a customizable burrito catering form using Forminator, tailored to enhance customer interaction, and added a nutrition calculator for personalized meal planning.",
    ],
    author: { name: "Aetienne Sardon", designation: "Founder, CEO" },
    images: [
      { src: Mucho1, alt: "MUCHO Burrito — desktop" },
      { src: Mucho2, alt: "MUCHO Burrito — mobile" },
      { src: Mucho3, alt: "MUCHO Burrito — overview" },
    ],
  },
  {
    pills: [{ label: "Web Developement" }, { label: "UX/UI Design" }, { label: "Logo Design" }, { flag: USFlag, flagAlt: "United States" }],
    heading: "Sales Enforcement Platform is a workforce management solution focused on streamlining sales operations, performance tracking, and payroll processes for businesses of various sizes.",
    paragraphs: [
      "The objective was to create a digital presence that communicates platform value clearly and supports lead generation through an organized and informative structure.",
      "Developed on WordPress, the site structure prioritizes direct access to information. UI and layout choices were built around simplifying service categories such as workforce tracking, sales enforcement, and payment systems.",
    ],
    author: { name: "Aetienne Sardon", designation: "Founder, CEO" },
    images: [
      { src: Sep1, alt: "Sales Enforcement Platform — desktop" },
      { src: Sep2, alt: "Sales Enforcement Platform — mobile" },
      { src: Sep3, alt: "Sales Enforcement Platform — overview" },
    ],
  },
  {
    pills: [{ label: "UX/UI Design" }, { label: "WordPress" }, { flag: UAEFlag, flagAlt: "UAE" }],
    heading: "A47 is an AI-powered content platform built at the intersection of political satire, meme culture, and Web3.",
    paragraphs: [
      "The goal was to develop a digital presence that captures the experimental nature of the platform while maintaining structural clarity and strong UI sensibility.",
      "The website was developed on WordPress with a custom UI/UX framework that reflects the fast-paced, creator-led nature of the project. Information architecture was planned to highlight the core pillars: AI agents, tokenomics, and community participation.",
    ],
    author: { name: "Aetienne Sardon", designation: "Founder, CEO" },
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
    author: {
      name: item.author?.name ?? "",
      designation: item.author?.designation ?? "",
      image: item.author?.image?.url,
    },
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

function AuthorAvatar({ src, alt, className }: { src?: string | StaticImageData; alt: string; className?: string }) {
  if (typeof src === "string") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  }
  return <Image src={src ?? AuthorImg} alt={alt} width={48} height={48} className={className} />;
}

export default function CaseStudySection({ items }: { items?: CaseStudyData[] }) {
  const caseStudies =
    items?.length ? mapCmsCaseStudies(items) : defaultCaseStudies;

  const [activeIndex, setActiveIndex] = useState(0);
  const prevStudy = () => setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  const nextStudy = () => setActiveIndex((prev) => (prev + 1) % caseStudies.length);
  const cs = caseStudies[activeIndex];

  if (!caseStudies.length) return null;

  return (
    <section className="container py-12 md:py-24">
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
          <h2 className="text-white font-medium leading-[1.2]" style={{ fontSize: "20px", letterSpacing: "-0.04em" }}>{cs.heading}</h2>
          <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div>
            <p className="text-white/60 font-normal leading-relaxed line-clamp-4" style={{ fontSize: "14px", letterSpacing: "-0.03em" }}>
              {cs.paragraphs.join(" ")}
            </p>
            <span className="text-white/80 font-medium text-[14px] cursor-pointer">Read More</span>
          </div>
          <div className="flex items-center gap-3">
            <AuthorAvatar src={cs.author.image} alt={cs.author.name} className="rounded-full object-cover shrink-0 w-11 h-11" />
            <div>
              <p className="text-white font-medium leading-tight text-[14px]" style={{ letterSpacing: "-0.03em" }}>{cs.author.name}</p>
              <p className="text-white/50 text-[12px] mt-0.5" style={{ letterSpacing: "-0.02em" }}>{cs.author.designation}</p>
            </div>
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
            <div className="lg:sticky lg:top-28 flex flex-col gap-8">
              <div className="flex items-center gap-3 flex-wrap">
                {study.pills.map((pill, i) =>
                  pill.flag ? (
                    <span key={i} className="inline-flex items-center gap-2 justify-center px-3 py-2 rounded-[40px] text-white/80 font-normal min-w-[79px] min-h-[42px]" style={{ fontSize: "clamp(14px, 1.3vw, 16px)", letterSpacing: "-0.03em", ...pillStyle }}>
                      <StudyImage src={pill.flag} alt={pill.flagAlt ?? ""} className="w-6 h-[18px] rounded-sm object-cover" />
                    </span>
                  ) : (
                    <span key={i} className="inline-flex items-center px-4 py-2 rounded-full text-white/80 font-normal min-w-[79px] min-h-[42px]" style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.03em", ...pillStyle }}>
                      {pill.label}
                    </span>
                  )
                )}
              </div>
              <h2 className="text-white font-medium leading-[1.2]" style={{ fontSize: "clamp(20px, 2vw, 36px)", letterSpacing: "-0.04em" }}>{study.heading}</h2>
              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div className="flex flex-col gap-5">
                {study.paragraphs.map((p, i) => (
                  <p key={i} className="text-white/60 font-normal leading-relaxed" style={{ fontSize: "clamp(14px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}>{p}</p>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <AuthorAvatar src={study.author.image} alt={study.author.name} className="rounded-full object-cover shrink-0 w-12 h-12" />
                <div>
                  <p className="text-white font-medium leading-tight" style={{ fontSize: "clamp(14px, 1.1vw, 16px)", letterSpacing: "-0.03em" }}>{study.author.name}</p>
                  <p className="text-white/50 font-normal mt-0.5" style={{ fontSize: "clamp(12px, 1vw, 14px)", letterSpacing: "-0.02em" }}>{study.author.designation}</p>
                </div>
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
