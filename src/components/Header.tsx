"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.svg";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Works", href: "/works" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Hidden SVG — filter applied to backdrop (background content behind the nav pill) */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="lensFilter"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            {/* Blur the alpha of the pill shape to build a smooth displacement gradient at the edges */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="alphaBlur" />
            {/* Displace the backdrop content — negative scale pushes outward (lens/magnify feel) */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="alphaBlur"
              scale="-35"
              xChannelSelector="A"
              yChannelSelector="A"
              result="displaced"
            />
            {/* Clip displaced result back to original pill shape */}
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <header className="fixed top-0 left-0 w-full z-50 py-5">
        <div className="container flex items-center justify-between">

          <Link
            href="/"
            className={`flex items-center transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <Image src={Logo} alt="Logo" priority />
          </Link>

          {/* Nav pill with liquid glass effect */}
          <div className="relative flex items-center rounded-full">

            {/* Layer 1 — lens distortion + blur applied to the background content */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backdropFilter: "url(#lensFilter) blur(4px)",
                WebkitBackdropFilter: "blur(18px)", /* Safari fallback — no url() support */
              }}
            />

            {/* Layer 2 — tinted glass fill */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "100px",
                boxShadow: "-1px 1px 0px #ffffff42",
              }}
            />

            {/* Layer 3 — specular highlight (top edge shine, iOS style) */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
              }}
            />

            {/* Links — above all layers, unaffected by filters */}
            <nav className="relative flex items-center gap-8 px-7.5 py-3.75">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-white/70 text-[18px] font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

          </div>

          <Link
            href="/contact"
            className={`px-10 py-5 rounded-full text-[18px] font-medium text-white border border-white/30 hover:bg-white hover:text-black hover:border-white leading-none transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            Contact Us
          </Link>

        </div>
      </header>
    </>
  );
}
