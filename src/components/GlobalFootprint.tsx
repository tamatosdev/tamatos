"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import pakistanFlag from "@/assets/p-flag.png";
import uaeFlag from "@/assets/uae-flag.png";
import usaFlag from "@/assets/usa-flag.png";
import type { GlobalFootprintData } from "@/lib/contact";

const GEO_URL = "/countries-110m.json";
const AUTO_LOOP_MS = 8000;

type FootprintLocation = {
  id: string;
  city: string;
  countryName: string;
  countryCode: string;
  flagSrc: string | StaticImageData;
  location: string;
  coords: [number, number];
  isoNumericId: number;
  labelOffset: { x: number; y: number };
};

const defaultLocations: FootprintLocation[] = [
  {
    id: "pakistan",
    city: "Karachi, Pakistan",
    countryName: "Pakistan",
    countryCode: "PK",
    flagSrc: pakistanFlag,
    location:
      "C-46, Block 13, Gulberg Town, F.B. Area, FB, Area Block 13 Gulberg Town, Karachi, 75950",
    coords: [67.01, 24.86],
    isoNumericId: 586,
    labelOffset: { x: 50, y: -45 },
  },
  {
    id: "uae",
    city: "Dubai, UAE",
    countryName: "United Arab Emirates",
    countryCode: "AE",
    flagSrc: uaeFlag,
    location:
      "Business Central Towers - Tower B, Dubai Internet City, Dubai, United Arab Emirates",
    coords: [55.27, 25.2],
    isoNumericId: 784,
    labelOffset: { x: 50, y: 30 },
  },
  {
    id: "usa",
    city: "Wyoming, USA",
    countryName: "United States",
    countryCode: "US",
    flagSrc: usaFlag,
    location:
      "1021 E Lincolnway Suite #8014, Cheyenne, Wyoming 82001, United States",
    coords: [-104.82, 41.14],
    isoNumericId: 840,
    labelOffset: { x: 0, y: -25 },
  },
];

function normalizeLocation(loc: FootprintLocation): FootprintLocation {
  // Migrate old Canada entry → USA
  if (loc.id === "canada" || loc.countryCode === "CA") {
    return defaultLocations.find((d) => d.id === "usa")!;
  }

  const fallback = defaultLocations.find((d) => d.id === loc.id);
  if (!fallback) return loc;

  // Replace stale placeholder addresses from earlier CMS content
  if (loc.location.toLowerCase().includes("yas mall")) {
    return {
      ...loc,
      city: fallback.city,
      countryName: fallback.countryName,
      countryCode: fallback.countryCode,
      location: fallback.location,
      coords: fallback.coords,
      isoNumericId: fallback.isoNumericId,
      flagSrc: loc.flagSrc || fallback.flagSrc,
      labelOffset: fallback.labelOffset,
    };
  }

  return loc;
}

function resolveLocations(data?: GlobalFootprintData): FootprintLocation[] {
  const cms = data?.locations?.filter(
    (loc) =>
      loc?.key &&
      loc.city &&
      loc.countryName &&
      loc.countryCode &&
      loc.location &&
      typeof loc.longitude === "number" &&
      typeof loc.latitude === "number" &&
      typeof loc.isoNumericId === "number"
  );

  if (!cms?.length) return defaultLocations;

  return cms
    .map((loc, index) => {
      const fallback = defaultLocations[index] ?? defaultLocations[0];
      return {
        id: loc.key!,
        city: loc.city!,
        countryName: loc.countryName!,
        countryCode: loc.countryCode!,
        flagSrc: loc.flag?.url || fallback.flagSrc,
        location: loc.location!,
        coords: [loc.longitude!, loc.latitude!] as [number, number],
        isoNumericId: loc.isoNumericId!,
        labelOffset: {
          x: loc.labelOffsetX ?? fallback.labelOffset.x,
          y: loc.labelOffsetY ?? fallback.labelOffset.y,
        },
      };
    })
    .map(normalizeLocation);
}

export default function GlobalFootprint({ data }: { data?: GlobalFootprintData }) {
  const locations = useMemo(() => resolveLocations(data), [data]);
  const [active, setActive] = useState(locations[0]?.id ?? "pakistan");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (locations.length && !locations.some((loc) => loc.id === active)) {
      setActive(locations[0].id);
    }
  }, [locations, active]);

  useEffect(() => {
    if (paused || locations.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => {
        const index = locations.findIndex((loc) => loc.id === current);
        const next = (index + 1) % locations.length;
        return locations[next]?.id ?? locations[0].id;
      });
    }, AUTO_LOOP_MS);
    return () => window.clearInterval(id);
  }, [paused, locations]);

  const activeLocation = locations.find((loc) => loc.id === active) ?? locations[0];
  const activeCountryId = activeLocation?.isoNumericId;

  const headingBefore = data?.headingBefore ?? "Our";
  const headingAccent = data?.headingAccent ?? "Global";
  const headingAfter = data?.headingAfter ?? "Footprint";
  const description =
    data?.description ??
    "Delivering excellence across multiple regions with a strong commitment to quality, reliability, and global collaboration.";

  return (
    <section
      className="container py-14 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2
        className="text-white font-medium text-center leading-tight mb-3"
        style={{ fontSize: "clamp(28.44px, 3vw, 50.06px)", letterSpacing: "-0.04em" }}
      >
        {headingBefore} <span className="text-[#9DF560]">{headingAccent}</span> {headingAfter}
      </h2>

      <p
        className="text-center text-white/80 max-w-2xl mx-auto leading-relaxed"
        style={{ letterSpacing: "-0.02em", fontSize: "clamp(18px, 0.94vw, 18px)" }}
      >
        {description}
      </p>

      <div
        className="relative overflow-hidden h-[420px] sm:h-[520px] lg:h-[640px] lg:-mt-56"
        style={{ marginTop: 0 }}
      >
        <ComposableMap
          projectionConfig={{ scale: 170, center: [20, 18] }}
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feOffset dx="0" dy="0" />
              <feGaussianBlur stdDeviation="2" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="rgba(255,255,255,0.18)" floodOpacity="0.18" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isActive = geo.id === String(activeCountryId);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: isActive ? "#9DF560" : "#1e1e2e",
                        stroke: "#2a2a3e",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "fill 0.4s ease",
                      },
                      hover: {
                        fill: isActive ? "#9DF560" : "#2a2a3e",
                        stroke: "#2a2a3e",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {locations.map((loc) => {
            const labelOffset = loc.labelOffset || { x: 0, y: -22 };
            const labelText = loc.countryName;
            const labelWidth = Math.max(108, 30 + labelText.length * 8);
            const rectX = labelOffset.x - labelWidth / 2;
            const imageX = rectX + 10;
            const textX = imageX + 26;
            const flagHref =
              typeof loc.flagSrc === "string" ? loc.flagSrc : loc.flagSrc.src;

            return (
              <Marker key={loc.id} coordinates={loc.coords}>
                <g>
                  <rect
                    x={rectX}
                    y={labelOffset.y - 16}
                    width={labelWidth}
                    height={28}
                    fill="rgba(0, 0, 0, 0.6)"
                    rx={14}
                    stroke="#ffffff14"
                    strokeWidth={1}
                    filter="url(#inner-shadow)"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(loc.id)}
                  />
                  <image
                    xlinkHref={flagHref}
                    href={flagHref}
                    x={imageX}
                    y={labelOffset.y - 9}
                    width={18}
                    height={14}
                    preserveAspectRatio="xMidYMid meet"
                    pointerEvents="none"
                  />
                  <text
                    x={textX}
                    y={labelOffset.y - 2}
                    textAnchor="start"
                    dominantBaseline="middle"
                    style={{
                      fill: "#fff",
                      fontSize: "14px",
                      fontWeight: 600,
                      pointerEvents: "none",
                    }}
                  >
                    {labelText}
                  </text>
                </g>
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      <div className="grid grid-cols-1 relative z-10 sm:grid-cols-3 gap-4 mt-0">
        {locations.map((loc) => {
          const isActive = active === loc.id;
          return (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActive(loc.id)}
              className="text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer group"
              style={{
                background: isActive ? "#9DF560" : "rgba(255,255,255,0.04)",
                border: isActive
                  ? "1px solid rgba(255,255,255,0.16)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isActive
                  ? "inset 0 0 0 1px rgba(255,255,255,0.12)"
                  : "inset 0 1px 28px rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-6 relative flex-shrink-0 mt-1.5">
                  {typeof loc.flagSrc === "string" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={loc.flagSrc}
                      alt={loc.city}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  ) : (
                    <Image src={loc.flagSrc} alt={loc.city} fill className="object-contain" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold leading-tight flex justify-between items-center gap-2"
                    style={{
                      fontSize: "clamp(18px, 1.25vw, 21.33px)",
                      color: isActive ? "#0b1721" : "#ffffff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {loc.city}
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{
                        letterSpacing: "-0.03em",
                        color: isActive ? "#0b1721" : "#ffffff",
                        fontSize: "clamp(18px, 1vw, 18px)",
                      }}
                    >
                      {loc.countryCode}
                    </span>
                  </p>
                </div>
              </div>

              <div className="ml-11">
                <p
                  className="font-normal mb-2"
                  style={{
                    color: isActive ? "#0b1721" : "#ffffff80",
                    fontSize: "clamp(18px, 0.94vw, 18px)",
                  }}
                >
                  Location:{" "}
                  <span
                    style={{
                      color: isActive ? "#0b1721" : "#ffffffcc",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {loc.location}
                  </span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
