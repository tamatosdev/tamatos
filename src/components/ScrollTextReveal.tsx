"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ScrollRevealData } from "@/lib/home";
import { scrollRevealHighlightsToMap } from "@/lib/home";

export default function ScrollTextReveal({
  data,
  text: textProp,
  highlights: highlightsProp,
}: {
  data?: ScrollRevealData;
  text?: string;
  highlights?: Record<string, string>;
}) {
  const text =
    data?.text ??
    textProp ??
    "So, We don't just design pretty interfaces we build products that convert, scale, and grow.";
  const highlights = data?.highlights?.length
    ? scrollRevealHighlightsToMap(data.highlights)
    : highlightsProp ?? { grow: "#9DF560" };

  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height * 0.9)));

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i / words.length;
        const wordProgress = Math.min(1, Math.max(0, (progress - start) / 0.12));
        const eased = 1 - Math.pow(1 - wordProgress, 2.5);
        const opacity = 0.15 + eased * 0.85;
        el.style.opacity = String(opacity);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [words.length]);

  return (
    <section ref={sectionRef} className="container py-16 lg:py-32 relative z-10">
      <p
        className="text-white font-medium text-center leading-[1.2] "
        style={{ fontSize: "clamp(35px, 6.25vw, 110px)", letterSpacing: "-0.04em" }}
      >
        {words.map((word, i) => {
          const clean = word.replace(/[.,!?]/g, "");
          const color = highlights[clean];

          return (
            <span key={i}>
              <span
                ref={(el) => { wordRefs.current[i] = el; }}
                style={{
                  opacity: 0.15,
                  color: color ?? "inherit",
                  transition: "opacity 0.1s",
                }}
              >
                {word}
              </span>
              {i < words.length - 1 ? " " : ""}
            </span>
          );
        })}
      </p>
    </section>
  );
}
