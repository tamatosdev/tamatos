"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Prefer native scroll when user asks for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Keep touch native — smoother and avoids stuck scroll on mobile
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const stop = () => lenis.stop();
    const start = () => {
      lenis.start();
      // Recalculate limits after overflow unlock / layout changes
      requestAnimationFrame(() => lenis.resize());
    };
    const resize = () => lenis.resize();

    window.addEventListener("lenis:stop", stop);
    window.addEventListener("lenis:start", start);
    window.addEventListener("lenis:resize", resize);
    window.addEventListener("resize", resize);

    // Images / fonts / AOS can change document height mid-scroll
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    const onLoad = () => lenis.resize();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("lenis:stop", stop);
      window.removeEventListener("lenis:start", start);
      window.removeEventListener("lenis:resize", resize);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", onLoad);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, []);

  // New route = new layout height
  useEffect(() => {
    const timeouts = [50, 200, 600, 1200].map((ms) =>
      window.setTimeout(() => {
        lenisRef.current?.resize();
        window.dispatchEvent(new Event("lenis:resize"));
      }, ms)
    );
    return () => timeouts.forEach((id) => window.clearTimeout(id));
  }, [pathname]);

  return <>{children}</>;
}
