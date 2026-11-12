import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import industrialPill from "@/assets/industrial-pill-1.png";
import healthcarePill from "@/assets/healthcare-pill-1.png";
import ecommercePill from "@/assets/e-commer-pill-1.png";
import threePeople from "@/assets/3-people-1.png";
import twoPeople from "@/assets/2-people-1.png";
import barPills from "@/assets/bar-pill-1.png";
import clutchPills from "@/assets/clutch-pill-1.png";
import type { StatsData } from "@/lib/home";

type StatPill = {
  src: StaticImageData;
  alt: string;
  /** Horizontal position over the number (left %) */
  left: string;
  /** Vertical nudge from the top of the number area */
  top?: string;
  rotate?: number;
  zIndex?: number;
  /** Phone position: pills spread across the full width above the number. */
  mobile: { left: string; top: string };
};

type DefaultStat = {
  value: string;
  before: string;
  italic: string;
  after: string;
  pills: StatPill[];
};

const defaultStats: DefaultStat[] = [
  {
    value: "200+",
    before: "Projects Launched across ",
    italic: "multiple markets",
    after: ".",
    pills: [
      // Over "1" / first "0"
      { src: industrialPill, alt: "Industrial", left: "2%", top: "8%", rotate: 7, zIndex: 1, mobile: { left: "0%", top: "34px" } },
      // Over last "0"
      { src: healthcarePill, alt: "Healthcare", left: "38%", top: "0%", rotate: -7, zIndex: 2, mobile: { left: "34%", top: "0px" } },
      // Over "+"
      { src: ecommercePill, alt: "E-commerce", left: "68%", top: "10%", rotate: 15, zIndex: 3, mobile: { left: "62%", top: "28px" } },
    ],
  },
  {
    value: "21+",
    before: "Multidisciplinary ",
    italic: "Professionals",
    after: ".",
    pills: [
      { src: threePeople, alt: "Team members", left: "4%", top: "4%", rotate: 10, zIndex: 1, mobile: { left: "2%", top: "10px" } },
      { src: twoPeople, alt: "Team members", left: "61%", top: "8%", rotate: -10, zIndex: 2, mobile: { left: "58%", top: "34px" } },
    ],
  },
  {
    value: "85+",
    before: "SMEs, SaaS Companies & ",
    italic: "Established Brands",
    after: " Served Worldwide.",
    pills: [
      { src: barPills, alt: "Growth chart", left: "6%", top: "6%", rotate: 5, zIndex: 1, mobile: { left: "40%", top: "4px" } },
      { src: clutchPills, alt: "Clutch", left: "42%", top: "12%", rotate: -15, zIndex: 2, mobile: { left: "62%", top: "36px" } },
    ],
  },
];

/** Prefer updated defaults when CMS still has the old figures. */
function resolveStatValue(cmsValue: string | undefined, fallback: string) {
  const raw = cmsValue?.trim();
  if (!raw) return fallback;
  if (raw === "100+") return "200+";
  if (raw === "50+") return "85+";
  return raw;
}

function renderDescription(
  cmsDescription: string | undefined,
  fallback: DefaultStat
) {
  const normalized = cmsDescription
    ?.trim()
    .replace(/Projects Launched Across Multiple Markets/i, "Projects Launched across multiple markets")
    .replace(/Multiple Markets/g, "multiple markets");

  if (normalized) {
    const italic = fallback.italic;
    const idx = normalized.indexOf(italic);
    if (idx >= 0) {
      return (
        <>
          {normalized.slice(0, idx)}
          <em className="italic text-white/70">{italic}</em>
          {normalized.slice(idx + italic.length)}
        </>
      );
    }
    return normalized;
  }

  return (
    <>
      {fallback.before}
      <em className="italic text-white/70">{fallback.italic}</em>
      {fallback.after}
    </>
  );
}

export default function StatsSection({
  data,
  showHeading = false,
}: {
  data?: StatsData;
  centered?: boolean;
  /** About page shows a "Tamatos in numbers." title above the stats. */
  showHeading?: boolean;
}) {
  const items = data?.items?.length ? data.items : [];

  return (
    <section className="container py-12 lg:py-24 relative">
      {showHeading && (
        <h2
          className="text-white font-medium leading-[1.15] mb-12 lg:mb-16"
          style={{ fontSize: "clamp(28.44px, 3.5vw, 50.06px)", letterSpacing: "-0.04em" }}
        >
          Tamatos in <em className="italic text-white/50">numbers</em>
          <span className="text-[#9DF560]">.</span>
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
        {defaultStats.map((fallback, index) => {
          const cms = items[index];
          const value = resolveStatValue(cms?.value, fallback.value);
          const description = cms?.description || cms?.title;

          return (
            <div key={`${value}-${index}`} className="stat-block">
              <div className="stat-figure relative inline-block w-fit max-w-full pt-8">
                {fallback.pills.map((pill) => (
                  <Image
                    key={pill.alt + pill.left}
                    src={pill.src}
                    alt={pill.alt}
                    width={pill.src.width}
                    height={pill.src.height}
                    quality={100}
                    unoptimized
                    className="stat-pill absolute object-contain max-w-none pointer-events-none select-none rounded-full border-4 border-white/30"
                    style={
                      {
                        height: "auto",
                        width: "auto",
                        zIndex: pill.zIndex ?? 1,
                        "--pill-rotate": `${pill.rotate ?? 0}deg`,
                        "--pill-left": pill.left,
                        "--pill-top": pill.top ?? "0%",
                        "--pill-left-mobile": pill.mobile.left,
                        "--pill-top-mobile": pill.mobile.top,
                      } as CSSProperties
                    }
                  />
                ))}

                <p
                  className="relative z-0 text-white/50 font-normal leading-none tracking-[-0.05em]"
                  style={{ fontSize: "clamp(56.89px, 7vw, 106.67px)" }}
                >
                  {value}
                </p>
              </div>

              <p
                className="text-white font-medium leading-[1.45] mt-4 lg:mt-5 max-w-[280px]"
                style={{ fontSize: "clamp(18px, 1.15vw, 18px)", letterSpacing: "-0.03em" }}
              >
                {renderDescription(description, fallback)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
