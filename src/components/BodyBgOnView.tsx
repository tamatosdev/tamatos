"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DEFAULT_BG = "#0A0A0C";

type BodyBgOnViewProps = {
  color: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** How much of the section must be visible (0–1) */
  threshold?: number;
};

export default function BodyBgOnView({
  color,
  children,
  className,
  style,
  threshold = 0.25,
}: BodyBgOnViewProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlTransition = html.style.transition;
    const prevBodyTransition = body.style.transition;
    html.style.transition = "background-color 0.55s ease";
    body.style.transition = "background-color 0.55s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          html.style.backgroundColor = color;
          body.style.backgroundColor = color;
        } else {
          html.style.backgroundColor = DEFAULT_BG;
          body.style.backgroundColor = DEFAULT_BG;
        }
      },
      { threshold, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      html.style.backgroundColor = "";
      body.style.backgroundColor = "";
      html.style.transition = prevHtmlTransition;
      body.style.transition = prevBodyTransition;
    };
  }, [color, threshold]);

  return (
    <section ref={ref} className={className} style={style}>
      {children}
    </section>
  );
}
