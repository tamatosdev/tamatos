"use client";

import { useEffect } from "react";
import fav1 from "@/assets/fav-image1.png";
import fav2 from "@/assets/fav-image2.png";
import fav3 from "@/assets/fav-image3.png";

const FRAMES = [fav1.src, fav2.src, fav3.src];
const HOLD_MS = 900;

function ensureAnimatedLink() {
  let link = document.querySelector<HTMLLinkElement>(
    "link[data-favicon='animated']"
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.dataset.favicon = "animated";
    // Prefer first so browsers pick the animated icon over metadata tags.
    const firstIcon = document.head.querySelector(
      "link[rel='icon'], link[rel='shortcut icon']"
    );
    if (firstIcon?.parentNode) {
      firstIcon.parentNode.insertBefore(link, firstIcon);
    } else {
      document.head.appendChild(link);
    }
  }

  // Hide React/Next metadata icons without removing them (avoids removeChild crashes).
  document
    .querySelectorAll<HTMLLinkElement>(
      "link[rel='icon']:not([data-favicon='animated']), link[rel='shortcut icon']:not([data-favicon='animated'])"
    )
    .forEach((el) => {
      el.media = "not all";
    });

  return link;
}

function setFavicon(href: string) {
  const link = ensureAnimatedLink();
  if (link.getAttribute("href") !== href) {
    link.href = href;
  }
}

export default function FaviconAnimator() {
  useEffect(() => {
    let cancelled = false;
    let index = 0;
    let timer = 0;

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

    timer = window.setTimeout(tick, 50);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
