"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Asterisk from "@/assets/asteric.png";
// Animated WebP pre-sized to 2x the card width (source GIFs are in assets alongside).
import DesignShot from "@/assets/hero-design.webp";
import DevelopmentShot from "@/assets/hero-development.webp";
import DigitalShot from "@/assets/hero-digital.webp";

type ServiceKey = "design" | "development" | "marketing";

const services: Record<ServiceKey, { color: string; href: string; image: StaticImageData }> = {
  design: { color: "#3DDBB1", href: "/services/design", image: DesignShot },
  development: { color: "#F26B2C", href: "/services/development", image: DevelopmentShot },
  marketing: { color: "#9DF560", href: "/services/digital", image: DigitalShot },
};

const serviceKeys = Object.keys(services) as ServiceKey[];

// Preview cards only make sense with a real hover; touch devices get the coloured words instead.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

const subscribeHover = (onChange: () => void) => {
  const query = window.matchMedia(HOVER_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

/** Hero heading whose service words reveal a project preview card that follows the cursor. */
export default function HeroHeadline() {
  const [active, setActive] = useState<ServiceKey | null>(null);
  // Keeps the last image visible while the card fades out.
  const [shown, setShown] = useState<ServiceKey>("design");
  const canHover = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false,
  );
  const reduceMotion = useReducedMotion();
  // Card images wait until the page is idle so they don't compete with the first paint.
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    if (!canHover) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setImagesReady(true), { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setImagesReady(true), 1500);
    return () => clearTimeout(id);
  }, [canHover]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = reduceMotion
    ? { stiffness: 2000, damping: 100 }
    : { stiffness: 350, damping: 30, mass: 0.5 };
  const cardX = useSpring(pointerX, spring);
  const cardY = useSpring(pointerY, spring);

  const show = (key: ServiceKey, x: number, y: number, jump: boolean) => {
    if (jump) {
      // Appear under the pointer instead of flying in from the last spot.
      pointerX.jump(x);
      pointerY.jump(y);
      cardX.jump(x);
      cardY.jump(y);
    } else {
      pointerX.set(x);
      pointerY.set(y);
    }
    setActive(key);
    setShown(key);
    setImagesReady(true);
  };

  const word = (key: ServiceKey) => (
    <Link
      href={services[key].href}
      className="hero-service-word"
      data-active={active === key}
      style={{ "--word-color": services[key].color } as CSSProperties}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") show(key, e.clientX, e.clientY, active === null);
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        pointerX.set(e.clientX);
        pointerY.set(e.clientY);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setActive(null);
      }}
    >
      {key}
    </Link>
  );

  return (
    <>
      <span className="block">
        Your partners in {word("design")},
      </span>
      <span className="block">
        {word("development")} &amp; {word("marketing")}
      </span>
      <span className="flex flex-wrap items-center justify-start gap-x-3 sm:gap-x-4 lg:justify-center">
        <span>All the ingredients,</span>
        <span className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
          <Image
            src={Asterisk}
            alt=""
            width={80}
            height={80}
            className="banner-hero-star inline-block h-auto w-[28px] shrink-0 sm:w-[40px] md:w-[55px] lg:w-[62px] xl:w-[72px] 2xl:w-[80px]"
          />
          <span>one team.</span>
        </span>
      </span>

      {canHover &&
        createPortal(
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[60]"
            style={{ x: cardX, y: cardY }}
          >
            <div className="-translate-x-1/2 -translate-y-1/2">
              <div
                className="relative overflow-hidden rounded-[10px] shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
                style={{
                  width: "clamp(96px, 7vw, 132px)",
                  aspectRatio: "798 / 975",
                  // Reveal from 0 to full height, growing up from the bottom edge.
                  clipPath: active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  transition: reduceMotion ? "none" : "clip-path 0.45s cubic-bezier(0.76, 0, 0.24, 1)",
                  // Replays only when the card opens, not when moving between words.
                  animation:
                    active && !reduceMotion ? "heroCardTilt 0.6s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                }}
              >
                {imagesReady &&
                  serviceKeys.map((key) => (
                    <Image
                      key={key}
                      src={services[key].image}
                      alt=""
                      fill
                      sizes="132px"
                      loading="eager"
                      // Already sized; the optimizer would also flatten the animation to one frame.
                      unoptimized
                      className="object-cover"
                      style={{ opacity: shown === key ? 1 : 0 }}
                    />
                  ))}
              </div>
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
