"use client";

import { useState } from "react";
import Image from "next/image";

import industryImage from "@/assets/industry-image.png";

const industries = [
  {
    id: 1,
    title: "AI & Emerging Tech",
    tags: ["AI Tool UX", "Complex Interfaces", "Product Design", "MVP Build"],
  },
  {
    id: 2,
    title: "SaaS & B2B Software",
    tags: ["Complex Dashboards", "Design Systems", "MVP Design"],
  },
  {
    id: 3,
    title: "Fintech & Financial Services",
    tags: ["Mobile Banking UX", "Onboarding Flows", "Trust-First UI"],
  },
  {
    id: 4,
    title: "E-Commerce & Retail",
    tags: ["Shopify Partner", "Checkout UX", "Product Pages", "Brand Identity"],
  },
];

export default function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <section className="py-[120px] overflow-hidden relative">

      {/* Background Glow */}
      

      <div className="container mx-auto px-5 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-[70px] items-center">

          {/* Left Content */}
          <div>

            {/* Heading */}
            <h2 className="text-white text-[60px] leading-[1.2] tracking-[-0.05em] max-w-[850px] font-medium">
              We've{" "}
              <span className="italic text-white/60">
                Shipped
              </span>{" "}
              for Industries that Don't Forgive Average
              <span className="text-[#9DF560]">.</span>
            </h2>

            {/* Industries */}
            <div className="pt-[70px]">

              {industries.map((item, index) => {
                const isActive = activeIndustry === index;

                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIndustry(index)}
                    onClick={() => setActiveIndustry(index)}
                    className="w-full text-left border-b border-white/30 py-[35px] group transition-all duration-500 cursor-pointer"
                  >

                    <div className="flex items-center justify-between gap-10">

                      {/* Title */}
                      <h3
                        className={`text-[24px] leading-none tracking-[-0.03em] transition-all duration-500 group-hover:pl-[20px]
                        ${
                          isActive
                            ? "text-[#9DF560]"
                            : "text-white/65"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap justify-end gap-3">

                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-[10px] py-[10px] rounded-full border text-[12px] leading-none transition-all duration-500
                            ${
                              isActive
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-white/[0.03] border-white/5 text-white/35"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Right Image */}
          <div className="relative">

            <Image
              src={industryImage}
              alt=""
              className="w-full h-auto rounded-[34px] object-cover"
              priority
            />

          </div>

        </div>

      </div>
    </section>
  );
}