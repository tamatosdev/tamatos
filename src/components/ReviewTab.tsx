"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import myzoiLogo from "@/assets/myzoi-logo.svg";
import rcsiLogo from "@/assets/rcsi-logo.svg";
import aladdinLogo from "@/assets/aladin-logo.svg";
import techcraftersLogo from "@/assets/tc-logo.svg";
import sukaina from "@/assets/sukaina.png";
import asmik from "@/assets/asmik.png";
import salman from "@/assets/salman-malik.png";
import yumna from "@/assets/yumna.png";



const testimonials = [
  {
    id: 1,
    logo: myzoiLogo,
    content:
     <>Tamatos have done a {" "}
     <span className="italic text-[#0A0A0CB2] / 70">fantastic job </span>{" "}
     at understanding the ethos of myZoi and then reflected this in our web design that&apos;s purpose and consumer led!{" "}
     <span className="italic text-[#0A0A0CB2] / 70">Thank you Team Tamatos </span></>,
    author: "Asmik Akopyan",
    role: "Head of Brand & Marketing, myZoi Financial Inclusion Technologies",
    image: asmik,
     bgColor: "#9DF560",
  },
  {
    id: 2,
    logo: rcsiLogo,
    content:
    <>It is my pleasure to share my experience of working with Tamatos. {" "}
    <span className="italic text-[#0A0A0CB2] / 70">The entire team were professional,</span> {" "}
     knowledgeable, and easy to work with. They listened carefully to our needs and provided us with an {" "}
     <span className="italic text-[#0A0A0CB2] / 70">excellent website</span>{" "} that exceeded our expectations. I would highly recommend Tamatos.  </>,
    author: "Salman Malik",
    role: "General Manager, Royal Canadian Steel Inc.",
    image: salman,
    bgColor: "#FC7031",
  },
  {
    id: 3,
    logo: aladdinLogo,
    content:
    <>
    <span className="italic text-[#0A0A0CB2] / 70">Loved working with Tamatos.</span>{" "}
    Passionate, Customer Driven and Professional, the team was great in understanding what we needed as well as challenging us where required. The result is a {" "}
    <span className="italic text-[#0A0A0CB2] / 70">website that we are proud of.</span>
     </>,
    author: "Sukaina Pasha",
    role: "COO & Co-Founder, Aladdin Informatics Pvt. Ltd.",
    image: sukaina,
    bgColor: "#03E4AC",
  },
  {
    id: 4,
    logo: techcraftersLogo,
    content:
    <>
    I&apos;d like to recommend the{" "}
     <span className="italic text-[#0A0A0CB2] / 70">outstanding services</span>{" "}
     of the Tamatos team. Thanks for creating a complaint tracker for our organization with such a seamless flow. The platform has greatly improved our operations and {" "}
     <span className="italic text-[#0A0A0CB2] / 70">employee satisfaction</span>.
    </>,
    author: "Yumna Dadabhoy",
    role: "President and CEO, Tech Crafters Ltd. Company",
    image: yumna,
      bgColor: "#8C52FF",
  },
];

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const nextSlide = () => {
    setActiveTab((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveTab(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 lg:py-30 overflow-hidden">
      <div className="container mx-auto px-5">

        {/* Heading */}
        <div className="review-main-heading max-w-250 mx-auto text-center">
          <h2 className="text-white leading-[1.2] font-medium tracking-[-0.04em]" style={{ fontSize: "clamp(22px, 3.2vw, 60px)" }}>
            Verified{" "}
            <span className="text-[#9DF560]">reviews</span> From{" "}
            <span className="italic text-white/70">Real Clients</span>
            <br />
            That Hold us Accountable
            <span className="text-[#9DF560]">.</span>
          </h2>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 pt-[80px]">

          {/* Tabs — hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex flex-col gap-5">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`h-[110px] rounded-[24px] border transition-all duration-500 flex items-center justify-center px-10 backdrop-blur-xl
                ${
                  activeTab === index
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <Image
                  src={item.logo}
                  alt=""
                  className="max-h-[55px] object-contain"
                />
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">

            {/* Logo tab — mobile only, above card */}
            <div className="flex lg:hidden items-center justify-center h-17.5 rounded-2xl border border-white/15 bg-white/5">
              <Image
                key={activeTab}
                src={testimonials[activeTab].logo}
                alt=""
                className="max-h-10.5 object-contain animate-[moveUp_.4s_ease]"
              />
            </div>

            {/* Content card */}
            <div
              className="relative rounded-[15px] lg:rounded-[34px] overflow-hidden p-6 md:p-12.5 md:min-h-125"
              style={{ backgroundColor: testimonials[activeTab].bgColor }}
            >
              <div
                key={activeTab}
                className="animate-[moveUp_.5s_ease] h-full justify-between flex flex-col gap-5"
              >
                {/* Arrows — mobile only, top right */}
                <div className="flex lg:hidden justify-end gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-[44px] h-[44px] rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-[44px] h-[44px] rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                <p className="text-[#0A0A0C] font-medium leading-[1.3] tracking-[-0.04em] max-w-250" style={{ fontSize: "clamp(18px, 2vw, 36px)" }}>
                  {testimonials[activeTab].content}
                </p>

                {/* Footer */}
                <div className="flex items-end justify-between gap-4 md:gap-10 border-t border-[#0A0A0C]/30 pt-5">

                  {/* Author */}
                  <div className="flex items-center gap-3 md:gap-5">
                    <Image
                      src={testimonials[activeTab].image}
                      alt=""
                      className="max-h-12.5 md:max-h-17.75 object-contain"
                    />
                    <div>
                      <h4 className="text-[#0A0A0C] text-[16px] md:text-[24px] italic font-medium leading-none">
                        {testimonials[activeTab].author}
                      </h4>
                      <p className="text-[#0A0A0C]/70 text-[12px] md:text-[18px]">
                        {testimonials[activeTab].role}
                      </p>
                    </div>
                  </div>

                  {/* Arrows — desktop only, bottom right */}
                  <div className="hidden lg:flex items-center gap-3 shrink-0">
                    <button
                      onClick={prevSlide}
                      className="w-14 h-14 rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-14 h-14 rounded-full bg-black/10 hover:bg-black text-black flex items-center justify-center transition-all duration-300 hover:text-white"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>


      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes moveUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
