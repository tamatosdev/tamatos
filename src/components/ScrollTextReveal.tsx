"use client";

import { useEffect, useRef } from "react";

export default function ScrollTextReveal({ text }: { text: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // progress 0→1 as section scrolls from entering viewport to mid-section at top
      const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height * 0.75)));

      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const threshold = i / words.length;
        el.style.color = progress >= threshold
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,0.2)";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [words.length]);

  return (
    <section ref={sectionRef} className="container py-16">
      <h2
        className="font-medium text-center leading-[1.2] capitalize"
        style={{ fontSize: "115px", letterSpacing: "-0.02em" }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { wordRefs.current[i] = el; }}
            className="transition-colors duration-500"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </h2>
    </section>
  );
}
