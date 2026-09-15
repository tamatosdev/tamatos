"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

const DEFAULT_BG = "#0A0A0C";

/** Stack of active section colors so overlapping enter/leave doesn't flash wrong bg */
const activeColors: string[] = [];

function applyTopColor() {
  const html = document.documentElement;
  const body = document.body;
  const next = activeColors[activeColors.length - 1] ?? DEFAULT_BG;
  html.style.backgroundColor = next;
  body.style.backgroundColor = next;
}

function pushColor(color: string) {
  activeColors.push(color);
  applyTopColor();
}

function popColor(color: string) {
  const index = activeColors.lastIndexOf(color);
  if (index !== -1) activeColors.splice(index, 1);
  applyTopColor();
}

type BodyBgOnViewProps = {
  color: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** How much of the section must be visible (0–1) */
  threshold?: number;
};

export default function BodyBgOnView({
  color,
  children,
  className,
  style,
  threshold = 0.28,
}: BodyBgOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const isActive = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const html = document.documentElement;
    const body = document.body;

    const prevHtmlTransition = html.style.transition;
    const prevBodyTransition = body.style.transition;
    html.style.transition = "background-color 0.6s ease";
    body.style.transition = "background-color 0.6s ease";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isActive.current) {
            isActive.current = true;
            pushColor(color);
          }
        } else if (isActive.current) {
          isActive.current = false;
          popColor(color);
        }
      },
      { threshold, rootMargin: "-12% 0px -12% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (isActive.current) {
        isActive.current = false;
        popColor(color);
      }
      if (activeColors.length === 0) {
        html.style.backgroundColor = "";
        body.style.backgroundColor = "";
      }
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
