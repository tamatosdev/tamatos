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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      {/* Hidden SVG — filter applied to backdrop */}
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
            <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="alphaBlur" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="alphaBlur"
              scale="-35"
              xChannelSelector="A"
              yChannelSelector="A"
              result="displaced"
            />
            <feComposite in="displaced" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <header className="fixed top-0 left-0 w-full z-50 py-4 lg:py-5">
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <Image src={Logo} alt="Logo" priority />
          </Link>

          {/* Desktop nav pill — hidden below lg */}
          <div className="relative hidden lg:flex items-center rounded-full">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backdropFilter: "url(#lensFilter) blur(2px)",
                WebkitBackdropFilter: "blur(9px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "100px",
                boxShadow: "-1px 1px 0px #ffffff42",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
              }}
            />
            <nav className="relative flex items-center gap-6 xl:gap-8 px-6 xl:px-7.5 py-3.75">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white hover:text-white/70 text-[15px] xl:text-[18px] font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop contact — hidden below lg */}
          <Link
            href="/contact"
            className={`hidden lg:inline-flex px-6 xl:px-10 py-4 xl:py-5 rounded-full text-[15px] xl:text-[18px] font-medium text-white border border-white/30 hover:bg-white hover:text-black hover:border-white leading-none transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            Contact Us
          </Link>

          {/* Hamburger button — shown below lg */}
          <button
            className="flex lg:hidden flex-col gap-[5px] p-2 z-10"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-[1.5px] bg-white rounded-full transition-all duration-300" />
            <span className="block w-6 h-[1.5px] bg-white rounded-full transition-all duration-300" />
            <span className="block w-4 h-[1.5px] bg-white rounded-full ml-auto transition-all duration-300" />
          </button>

        </div>
      </header>

      {/* Sidebar backdrop */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[300px] sm:w-[340px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: "rgba(10,10,12,0.98)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Sidebar top */}
        <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Image src={Logo} alt="Logo" width={110} height={32} priority />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-9 h-9 rounded-full text-white transition-colors duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 px-8 pt-6 overflow-y-auto">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="text-white/60 hover:text-white text-[32px] sm:text-[36px] font-medium tracking-[-0.04em] py-4 transition-colors duration-200"
              style={{
                borderBottom: i < navLinks.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-8 py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link
            href="/contact"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center w-full py-4 rounded-full text-[16px] font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{ border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Contact Us
          </Link>
        </div>
      </aside>
    </>
  );
}
