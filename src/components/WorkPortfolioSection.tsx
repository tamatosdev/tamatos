"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import circleShade from "@/assets/circle-shade.png";
import {
  filterPortfolios,
  getPortfolioCardTags,
  type PortfolioItem,
  type PortfolioTag,
} from "@/lib/portfolio";

const filterBoxClass =
  "rounded-[30px] mix-blend-plus-lighter backdrop-blur-xl";

const filterBoxStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "inset 5.33px 4px 10px 0px rgba(255, 255, 255, 0.1)",
  border: "1px solid #ffffff1a",
  padding: "40px 20px",
};

const portfolioTagPillClass = "inline-flex items-center text-white/80 mix-blend-plus-lighter";

const portfolioTagPillStyle = {
  padding: "8px 14px",
  borderRadius: "40px",
  fontSize: "14px",
  letterSpacing: "-0.05em",
  background: "rgba(255, 255, 255, 0.05)",
  boxShadow: "inset 5.33px 4px 10px 0px rgba(255, 255, 255, 0.1)",
};

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full transition-all duration-200 ${
        active
          ? "bg-white text-[#0A0A0C]"
          : "bg-white/[0.07] text-white/50 hover:bg-white/[0.1] hover:text-white/70"
      }`}
      style={{ fontSize: "16.6px", padding: "8px 16px", letterSpacing: "-0.03em", fontWeight: 500 }}
    >
      {label}
    </button>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const tags = getPortfolioCardTags(item);

  return (
    <Link href={`/work/${item.slug}`} className="flex flex-col gap-5 lg:gap-6">
      <div className="relative overflow-hidden rounded-[24px] lg:rounded-[28px] bg-white/5">
        {item.featuredImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.featuredImage.url}
            alt={item.featuredImage.alt || item.title}
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full min-h-[200px] bg-white/5" />
        )}
      </div>

      <div className="flex flex-col gap-3 lg:gap-4">
        <h3
          className="text-white font-medium leading-[1.15]"
          style={{ fontSize: "clamp(20px, 2vw, 28px)", letterSpacing: "-5%" }}
        >
          {item.title}
        </h3>

        {item.excerpt && (
          <p
            className="text-white font-normal leading-[1.65] line-clamp-4"
            style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.02em" }}
          >
            {item.excerpt}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-[10px] pt-1">
            {tags.map((tag) => (
              <span key={tag} className={portfolioTagPillClass} style={portfolioTagPillStyle}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function WorkPortfolioSection({
  items,
  services,
  industries,
}: {
  items: PortfolioItem[];
  services: PortfolioTag[];
  industries: PortfolioTag[];
}) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  const filteredItems = useMemo(
    () => filterPortfolios(items, activeService, activeIndustry),
    [items, activeService, activeIndustry]
  );

  return (
    <section className="work-portfolio-section relative py-14 lg:py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={circleShade.src}
        alt=""
        className="work-portfolio-shade pointer-events-none select-none"
        aria-hidden
      />
      <div className="work-portfolio-shade-fade" aria-hidden />

      <div className="container relative z-10">
        <div
          className="flex flex-col lg:flex-row"
          style={{ gap: "calc(var(--spacing) * 10)" }}
        >
          <aside className="w-full lg:w-[440px] shrink-0 flex flex-col gap-5 lg:gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
                Services
              </p>
              <div className={filterBoxClass} style={filterBoxStyle}>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="All Services"
                    active={activeService === null}
                    onClick={() => setActiveService(null)}
                  />
                  {services.map((tag) => (
                    <FilterPill
                      key={tag._id}
                      label={tag.title}
                      active={activeService === tag.slug}
                      onClick={() => setActiveService(tag.slug)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-white font-medium" style={{ fontSize: "18px", letterSpacing: "-0.02em" }}>
                Industries
              </p>
              <div className={filterBoxClass} style={filterBoxStyle}>
                <div className="flex flex-wrap gap-2">
                  <FilterPill
                    label="All Industries"
                    active={activeIndustry === null}
                    onClick={() => setActiveIndustry(null)}
                  />
                  {industries.map((tag) => (
                    <FilterPill
                      key={tag._id}
                      label={tag.title}
                      active={activeIndustry === tag.slug}
                      onClick={() => setActiveIndustry(tag.slug)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-center w-full rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300 mt-1 lg:mt-2"
              style={{ fontSize: "clamp(16px, 1.15vw, 22px)", padding: "20px 28px", letterSpacing: "-0.02em" }}
            >
              Have a Project?
            </Link>
          </aside>

          <div className="flex-1 min-w-0">
            <h2
              className="text-white font-medium leading-[1.08] mb-10 lg:mb-12"
              style={{ fontSize: "clamp(36px, 3.8vw, 64px)", letterSpacing: "-0.04em" }}
            >
              Works That <span className="text-[#9DF560]">Power</span> Growth.
            </h2>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-x-10 lg:gap-y-14">
                {filteredItems.map((item) => (
                  <PortfolioCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-white/10 bg-white/5 p-10 text-center">
                <p className="text-white/60 text-[16px]">
                  No portfolio items match these filters. Try selecting &quot;All Services&quot; and
                  &quot;All Industries&quot;.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
