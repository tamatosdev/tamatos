"use client";

import { useEffect } from "react";

/**
 * Ensures the animated GIF favicon wins over static PNG/ICO tags.
 * Canvas data-URL animation is unreliable across browsers; fav.gif is native.
 */
export default function FaviconAnimator() {
  useEffect(() => {
    const href = "/fav.gif";
    const links = document.querySelectorAll<HTMLLinkElement>(
      "link[rel='icon'], link[rel='shortcut icon']"
    );

    if (links.length === 0) {
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/gif";
      link.href = href;
      document.head.appendChild(link);
      return;
    }

    links.forEach((link) => {
      link.type = "image/gif";
      link.removeAttribute("sizes");
      link.href = href;
    });
  }, []);

  return null;
}
