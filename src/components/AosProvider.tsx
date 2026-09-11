"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VARIANTS = ["fade-up", "fade-right", "fade-up", "fade-left"] as const;

function tagElement(
  el: Element,
  variant: (typeof VARIANTS)[number],
  duration = "950",
  delay = 0
) {
  if (el.hasAttribute("data-aos") || el.hasAttribute("data-aos-skip")) return;
  el.setAttribute("data-aos", variant);
  el.setAttribute("data-aos-duration", duration);
  el.setAttribute("data-aos-easing", "ease-out-cubic");
  if (delay > 0) el.setAttribute("data-aos-delay", String(delay));
}

function applyRevealAnimations(pathname: string) {
  const main = document.querySelector("main");
  if (main) {
    const allSections = Array.from(main.querySelectorAll("section"));

    allSections.forEach((section, index) => {
      if (section.closest("header")) return;
      // Home hero / banner — custom motion already (skip as home "header" area)
      if (pathname === "/" && index === 0) return;
      if (section.hasAttribute("data-aos-skip")) return;

      // Marquee sections: animate heading only (avoid transform conflicts)
      if (section.querySelector(".animate-marquee, .animate-process-marquee")) {
        const heading = section.querySelector("h2");
        if (heading) tagElement(heading, "fade-up", "900");
        return;
      }

      tagElement(
        section,
        VARIANTS[index % VARIANTS.length],
        "950",
        (index % 3) * 70
      );
    });

    // Major non-section blocks under main
    main.querySelectorAll(":scope > div.relative, :scope > div.container").forEach((block, index) => {
      if (block.querySelector("section")) return;
      if (block.closest("header")) return;
      if (block.querySelector(".animate-marquee, .animate-process-marquee")) return;
      tagElement(block, VARIANTS[index % VARIANTS.length], "950");
    });
  }

  const footer = document.querySelector("footer");
  if (footer) {
    const targets = footer.querySelectorAll(
      ":scope .container > div, :scope > div > .container > div"
    );
    const list = targets.length ? targets : footer.querySelectorAll(":scope > div");

    list.forEach((el, index) => {
      tagElement(
        el,
        index % 2 === 0 ? "fade-up" : "fade-left",
        "900",
        Math.min(index, 4) * 70
      );
    });
  }
}

export default function AosProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      mirror: false,
      anchorPlacement: "top-bottom",
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      applyRevealAnimations(pathname);
      AOS.refreshHard();
    };

    const raf = window.requestAnimationFrame(run);
    const t1 = window.setTimeout(run, 120);
    const t2 = window.setTimeout(run, 450);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}
