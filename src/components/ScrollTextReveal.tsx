"use client";

import { useEffect, useMemo, useRef } from "react";

export default function ScrollTextReveal({
  text,
  highlights = {},
}: {
  text: string;
  highlights?: Record<string, string>;
}) {
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

        const key = words[i].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        const hex = highlights[key];

        if (hex) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          el.style.color = `rgba(${r},${g},${b},${opacity.toFixed(3)})`;
        } else {
          el.style.color = `rgba(255,255,255,${opacity.toFixed(3)})`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [words, highlights]);

  return (
    <section ref={sectionRef} className="container py-10 md:py-16">
      <h2
        className="font-medium text-center leading-[1.2] capitalize"
        style={{ fontSize: "clamp(28px, 6.5vw, 100px)", letterSpacing: "-0.02em" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
    </section>
  );
}
