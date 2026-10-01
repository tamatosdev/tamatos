"use client";

import { useEffect } from "react";
import fav1 from "@/assets/fav-image1.png";
import fav2 from "@/assets/fav-image2.png";
import fav3 from "@/assets/fav-image3.png";

const FRAMES = [fav1.src, fav2.src, fav3.src];
const HOLD_MS = 900;

function setFavicon(href: string) {
  document
    .querySelectorAll<HTMLLinkElement>(
      "link[rel='icon'], link[rel='shortcut icon'], link[data-favicon='animated']"
    )
    .forEach((el) => el.remove());

  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.dataset.favicon = "animated";
  link.href = href;
  document.head.appendChild(link);
}

export default function FaviconAnimator() {
  useEffect(() => {
    let cancelled = false;
    let index = 0;
    let timer = 0;

    // Preload all frames.
    FRAMES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const tick = () => {
      if (cancelled) return;
      setFavicon(FRAMES[index]);
      index = (index + 1) % FRAMES.length;
      timer = window.setTimeout(tick, HOLD_MS);
    };

    // Small delay so Next.js metadata icon tags are in the DOM first.
    timer = window.setTimeout(tick, 50);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
