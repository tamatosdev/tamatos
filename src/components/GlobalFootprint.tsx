"use client";

import { useState } from "react";
import Image from "next/image";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import pakistanFlag from "@/assets/p-flag.png";
import uaeFlag from "@/assets/uae-flag.png";
import canadaFlag from "@/assets/canada-flag.png";

const GEO_URL = "/countries-110m.json";

// ISO numeric codes
const COUNTRY_IDS: Record<string, number> = {
  pakistan: 586,
  uae: 784,
  canada: 124,
};

const locations = [
  {
    id: "pakistan",
    city: "Karachi, Pakistan",
    countryName: "Pakistan",
    countryCode: "PK",
    flag: pakistanFlag,
    role: "Head Office",
    desc: "Our founding home — strategy, branding, and UX all flow from here.",
    location: "Level 1, Yas Mall, Yas Island, Abu Dhabi, United Arab Emirates",
    coords: [67.01, 24.86] as [number, number],
    labelOffset: { x: 50, y: -45 },
  },
  {
    id: "uae",
    city: "Dubai, UAE",
    countryName: "United Arab Emirates",
    countryCode: "AE",
    flag: uaeFlag,
    role: "Global UAE",
    desc: "Serving clients across the Gulf with a local market-first mindset.",
    location: "Level 1, Yas Mall, Yas Island, Abu Dhabi, United Arab Emirates.",
    coords: [55.27, 25.2] as [number, number],
    labelOffset: { x: 50, y: 30 },
  },
  {
    id: "canada",
    city: "Toronto, Canada",
    countryName: "Canada",
    countryCode: "CA",
    flag: canadaFlag,
    role: "North America",
    desc: "Reaching North American markets with world-class digital products.",
    location: "Level 1, Yas Mall, Yas Island, Abu Dhabi, United Arab Emirates",
    coords: [-79.38, 43.65] as [number, number],
    labelOffset: { x: 0, y: -25 },
  },
];

export default function GlobalFootprint() {
  const [active, setActive] = useState("pakistan");

  const activeCountryId = COUNTRY_IDS[active];

  return (
    <section className="container py-14 lg:py-24">

      {/* Heading */}
      <h2
        className="text-white font-medium text-center leading-tight mb-3"
        style={{ fontSize: "clamp(32px, 3vw, 60px)", letterSpacing: "-0.04em" }}
      >
        Our <span className="text-[#9DF560]">Global</span> Footprint
      </h2>

      {/* Paragraph */}
      <p className="text-center text-white/80 max-w-2xl mx-auto leading-relaxed"
        style={{ letterSpacing: "-0.02em", fontSize: "clamp(16px, 0.94vw, 18px)" }}>
        Delivering excellence across multiple regions with a strong commitment to quality, reliability, and global collaboration.
      </p>

      {/* Map */}
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

          {/* Markers */}
          {locations.map((loc) => {
            const labelOffset = loc.labelOffset || { x: 0, y: -22 };
            const labelText = loc.countryName;
            const labelWidth = Math.max(108, 30 + labelText.length * 8);
            const rectX = labelOffset.x - labelWidth / 2;
            const imageX = rectX + 10;
            const textX = imageX + 26;

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
                    xlinkHref={loc.flag.src}
                    href={loc.flag.src}
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

      {/* Location cards */}
      <div className="grid grid-cols-1 relative z-10 sm:grid-cols-3 gap-4 mt-0">
        {locations.map((loc) => {
          const isActive = active === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => setActive(loc.id)}
              className="text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer group"
              style={{
                background: isActive ? "#9DF560" : "rgba(255,255,255,0.04)",
                border: isActive ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(255,255,255,0.08)",
                boxShadow: isActive ? "inset 0 0 0 1px rgba(255,255,255,0.12)" : "inset 0 1px 28px rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-6 relative flex-shrink-0 mt-1.5">
                  <Image
                    src={loc.flag}
                    alt={loc.city}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold leading-tight flex justify-between items-center gap-2"
                    style={{
                      fontSize: "clamp(18px, 1.25vw, 24px)",
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
                        fontSize: "clamp(14px, 1vw, 16px)",
                      }}
                    >
                      {loc.countryCode}
                    </span>
                  </p>
                </div>
              </div>

              <div className="ml-11">
                <p className="font-normal mb-2" style={{ color: isActive ? "#0b1721" : "#ffffff80", fontSize: "clamp(16px, 0.94vw, 18px)" }}>
                  Location: <span className="" 
                  style={{
                     color: isActive ? "#0b1721" : "#ffffffcc",
                     letterSpacing: "-0.03em",

                  }}>{loc.location}</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
