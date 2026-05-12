import Image, { StaticImageData } from "next/image";
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

const pillStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
};

type CaseStudy = {
  pills: { label?: string; flag?: StaticImageData; flagAlt?: string }[];
  heading: string;
  paragraphs: string[];
  author: { name: string; designation: string };
  images: { src: StaticImageData; alt: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    pills: [
      { label: "UX/UI Design" },
      { label: "WordPress" },
      { flag: PFlag, flagAlt: "Pakistan" },
    ],
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
    pills: [
      { label: "UX/UI Design" },
      { label: "Web Development" },
      { flag: CanadaFlag, flagAlt: "Canada" },
    ],
    heading:
      "MUCHO Burrito is a Mexican cuisine restaurant that blends traditional Mexican flavors with modern innovation.",
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
    pills: [
      { label: "Web Developement" },
      { label: "UX/UI Design" },
      { label: "Logo Design" },
      { flag: USFlag, flagAlt: "United States" },
    ],
    heading:
      "Sales Enforcement Platform is a workforce management solution focused on streamlining sales operations, performance tracking, and payroll processes for businesses of various sizes.",
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
    pills: [
      { label: "UX/UI Design" },
      { label: "WordPress" },
      { flag: UAEFlag, flagAlt: "UAE" },
    ],
    heading:
      "A47 is an AI-powered content platform built at the intersection of political satire, meme culture, and Web3.",
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

export default function CaseStudySection() {
  return (
    <section className="container py-12 md:py-24 flex flex-col gap-32">
      {caseStudies.map((cs, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Left column — sticky */}
          <div className="lg:sticky lg:top-28 flex flex-col gap-6 md:gap-8">

            {/* Pills */}
            <div className="flex items-center gap-3 flex-wrap">
              {cs.pills.map((pill, i) =>
                pill.flag ? (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-white/80 font-normal"
                    style={{ fontSize: "clamp(14px, 1.3vw, 18px)", letterSpacing: "-0.03em", ...pillStyle }}
                  >
                    <Image
                      src={pill.flag}
                      alt={pill.flagAlt ?? ""}
                      width={24}
                      height={18}
                      className="rounded-sm object-cover"
                    />
                  </span>
                ) : (
                  <span
                    key={i}
                    className="inline-flex items-center px-4 py-2 rounded-full text-white/80 font-normal"
                    style={{ fontSize: "clamp(14px, 1.3vw, 18px)", letterSpacing: "-0.03em", ...pillStyle }}
                  >
                    {pill.label}
                  </span>
                )
              )}
            </div>

            {/* Heading */}
            <h2
              className="text-white font-medium leading-[1.2]"
              style={{ fontSize: "clamp(20px, 2.8vw, 36px)", letterSpacing: "-0.04em" }}
            >
              {cs.heading}
            </h2>

            {/* Divider */}
            <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />

            {/* Body text */}
            <div className="flex flex-col gap-5">
              {cs.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-white/60 font-normal leading-relaxed"
                  style={{ fontSize: "clamp(14px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 pt-2">
              <Image
                src={AuthorImg}
                alt={cs.author.name}
                width={48}
                height={48}
                className="rounded-full object-cover shrink-0"
              />
              <div>
                <p
                  className="text-white font-medium leading-tight"
                  style={{ fontSize: "clamp(14px, 1.1vw, 16px)", letterSpacing: "-0.03em" }}
                >
                  {cs.author.name}
                </p>
                <p
                  className="text-white/50 font-normal mt-0.5"
                  style={{ fontSize: "clamp(12px, 1vw, 14px)", letterSpacing: "-0.02em" }}
                >
                  {cs.author.designation}
                </p>
              </div>
            </div>

          </div>

          {/* Right column — images */}
          <div className="flex flex-col gap-6">
            {cs.images.map((img) => (
              <div key={img.alt} className="rounded-[20px] overflow-hidden">
                <Image src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>

        </div>
      ))}
    </section>
  );
}
