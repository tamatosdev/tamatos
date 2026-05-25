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
    tags: ["Shopify Partner", "Checkout UX", "Product Pages"],
  },
];

export default function IndustriesSection() {
  const [activeIndustry, setActiveIndustry] = useState(0);

  return (
    <section className="py-16 lg:py-30 overflow-hidden relative">

      {/* Background Glow */}
      

      <div className="container mx-auto px-5 relative z-10">

        {/* Heading — mobile only, above the grid */}
        <h2
          className="block lg:hidden text-white font-medium leading-[1.2] tracking-tighter mb-6"
          style={{ fontSize: "clamp(30px, 3.13vw, 60px)" }}
        >
          We've{" "}
          <span className="italic text-white/60">Shipped</span>{" "}
          for Industries that Don't Forgive Average
          <span className="text-[#9DF560]">.</span>
        </h2>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1.2fr_440px] min-[1441px]:grid-cols-[1.4fr_500px] gap-10 min-[1441px]:gap-17.5 lg:items-center">

          {/* Left Content — order 2 on mobile (rows below image), order 1 on desktop */}
          <div className="order-2 lg:order-1">

            {/* Heading — desktop only */}
            <h2
              className="hidden lg:block text-white font-medium leading-[1.2] tracking-tighter max-w-212.5"
              style={{ fontSize: "clamp(30px, 3.13vw, 60px)" }}
            >
              We've{" "}
              <span className="italic text-white/60">Shipped</span>{" "}
              for Industries that Don't Forgive Average
              <span className="text-[#9DF560]">.</span>
            </h2>

            {/* Industries */}
            <div className="lg:pt-17.5">

              {industries.map((item, index) => {
                const isActive = activeIndustry === index;

                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setActiveIndustry(index)}
                    onClick={() => setActiveIndustry(index)}
                    className="w-full text-left border-b border-white/20 py-5 lg:py-8.75 group transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">

                      {/* Title */}
                      <h3
                        className={`leading-none tracking-[-0.03em] transition-all duration-500 lg:group-hover:pl-5
                        text-white ${isActive ? "lg:text-[#9DF560]" : "lg:text-white/65"}`}
                        style={{ fontSize: "clamp(16px, 1.25vw, 24px)" }}
                      >
                        {item.title}
                      </h3>

                      {/* Tags */}
                      <div className="flex flex-wrap lg:justify-end gap-2 lg:gap-3">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`shrink-0 px-2.5 py-2 lg:py-2.5 rounded-full border text-[12px] leading-none transition-all duration-500
                              ${isActive
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-white/3 border-white/5 text-white/35"
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

          {/* Right Image — order 1 on mobile (above rows), order 2 on desktop */}
          <div className="order-1 lg:order-2">
            <Image
              src={industryImage}
              alt=""
              className="w-full h-auto rounded-[20px] lg:rounded-[34px] object-cover"
              priority
            />
          </div>

        </div>

      </div>
    </section>
  );
}