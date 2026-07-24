"use client";

import { useEffect } from "react";
import fav1 from '@/assets/fav-image1.png'
import fav2 from '@/assets/fav-image2.png'
import fav3 from '@/assets/fav-image3.png'

export default function FaviconAnimator() {
  useEffect(() => {
    const frames = [fav1.src, fav2.src, fav3.src];

    let current = 0;
    let next = 1;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");

    function loadImage(src: string) {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
      });
    }

    function setFavicon(dataUrl: string) {
      let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }

      link.href = dataUrl;
    }

    async function animate() {
      const imageA = await loadImage(frames[current]);
      const imageB = await loadImage(frames[next]);

      let alpha = 0;

      const step = () => {
        if (!ctx) return;

        ctx.clearRect(0, 0, 64, 64);

        ctx.globalAlpha = 1 - alpha;
        ctx.drawImage(imageA, 0, 0, 64, 64);

        ctx.globalAlpha = alpha;
        ctx.drawImage(imageB, 0, 0, 64, 64);

        const url = canvas.toDataURL("image/png");
        setFavicon(url);

        alpha += 0.05;

        if (alpha <= 1) {
          requestAnimationFrame(step);
        } else {
          current = next;
          next = (next + 1) % frames.length;
          setTimeout(animate, 300);
        }
      };

      step();
    }

    animate();
  }, []);

  return null;
}