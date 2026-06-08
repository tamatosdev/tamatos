"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/assets/Logo.svg";
import ClutchDev from "@/assets/clutch-developer.png";
import ClutchPPC from "@/assets/clutch-ppc.png";
import ClutchMarketing from "@/assets/clutch-marketing.png";
import ClutchSEO from "@/assets/clutch-seo.png";
import BehanceIcon from "@/assets/behance.svg";
import ClutchIcon from "@/assets/clutch.svg";
import FooterShade1 from "@/assets/footer-shade1.png";
import FooterShade2 from "@/assets/footer-shade2.png";

const navColumns = [
  {
    title: "Branding Services",
    links: [
      { label: "Pitch Deck", href: "/services/pitch-deck" },
      { label: "Brand Identity", href: "/services/brand-identity" },
      { label: "Logo Design", href: "/services/logo-design" },
      { label: "Graphic Design", href: "/services/graphic-design" },
      { label: "Rebranding", href: "/services/rebranding" },
    ],
  },
  {
    title: "Design Services",
    links: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "Mobile App Design", href: "/services/mobile-app-design" },
      { label: "Website Redesign", href: "/services/website-redesign" },
      { label: "UX/UI Audit", href: "/services/ux-ui-audit" },
    ],
  },
  {
    title: "Development Services",
    links: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "MVP Development", href: "/services/mvp-development" },
      { label: "Webflow Development", href: "/services/webflow-development" },
      { label: "Landing Page", href: "/services/landing-page" },
      { label: "Mobile Development", href: "/services/mobile-development" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "MVP Design", href: "/solutions/mvp-design" },
      { label: "Product Redesign", href: "/solutions/product-redesign" },
      { label: "Team Extension", href: "/solutions/team-extension" },
    ],
  },
];

const industryLinks = [
  { label: "Web 3, Blockchain", href: "/industries/web3" },
  { label: "SaaS", href: "/industries/saas" },
  { label: "Fintech", href: "/industries/fintech" },
  { label: "AI & ML", href: "/industries/ai-ml" },
  { label: "Healthcare & Wellness", href: "/industries/healthcare" },
];

const companyLinks = [
  { label: "Works", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Referral", href: "/referral" },
  { label: "Contact", href: "/contact" },
];

const clutchBadges = [
  { src: ClutchDev, alt: "Clutch 2026 — Top Web Developers", label: "Top Web Developers" },
  { src: ClutchPPC, alt: "Clutch 2026 — Top PPC Company", label: "Top PPC Company" },
  { src: ClutchMarketing, alt: "Clutch 2026 — Top Digital Marketing Company", label: "Top Digital Marketing Company" },
  { src: ClutchSEO, alt: "Clutch 2026 — Top SEO Company", label: "Top SEO Company" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Editorial Policy", href: "/editorial-policy" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div
      className="transition-transform duration-300 shrink-0 flex items-center justify-center rounded-full"
      style={{
        width: 40, height: 40,
        background: "#161618",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <line x1="9" y1="3" x2="9" y2="14" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4.5 9.5L9 14.5L13.5 9.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} className="ml-2 text-white hover:text-white transition-colors duration-200" title="Copy email">
      {copied ? (
        <svg width="30" height="30" viewBox="0 0 16 16" fill="none">
          <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M11 5V4C11 3.17 10.33 2.5 9.5 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9.5C2.5 10.33 3.17 11 4 11H5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

export default function Footer() {
  const [showServices, setShowServices] = useState(false);
  const [showLocations, setShowLocations] = useState(false);

  return (
    <footer className="relative overflow-hidden" style={{ background: "#ffffff0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Shade 1 — left */}
      <Image
        src={FooterShade1}
        alt=""
        className="absolute pointer-events-none select-none"
        style={{ left: 0, top: 0, zIndex: 0 }}
      />
      {/* Shade 2 — right */}
      <Image
        src={FooterShade2}
        alt=""
        className="absolute pointer-events-none select-none"
        style={{ right: 0, top: 0, zIndex: 0 }}
      />
      <div className="container py-14 lg:py-32 relative" style={{ zIndex: 1 }}>

        {/* Top grid: logo col + nav columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 pb-8 lg:pb-8">

          {/* Left — logo, tagline, email */}
          <div className="flex flex-col gap-4 pb-4 lg:pb-0">
            <Link href="/">
              <Image src={Logo} alt="Tamatos" width={160} height={20} className="w-40 lg:w-60" />
            </Link>
            <p className="text-white font-medium leading-relaxed mt-3 lg:mt-7.5" style={{ fontSize: "clamp(16px, 1.3vw, 20px)", letterSpacing: "-0.02em" }}>
              Ready to Thrive Online?<br />Drop us a Line
            </p>
            <div className="flex items-center">
              <a
                href="mailto:hello@tamatos.com"
                className="text-white font-medium hover:text-white transition-colors duration-200"
                style={{ fontSize: "clamp(20px, 1.5vw, 24px)", letterSpacing: "-0.02em" }}
              >
                hello@tamatos.com
              </a>
              <CopyButton text="hello@tamatos.com" />
            </div>
          </div>

          {/* Right — nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            {navColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3 lg:gap-4">
                <p
                  className="text-white font-medium"
                  style={{ fontSize: "clamp(18px, 1.2vw, 22px)", letterSpacing: "-0.05em" }}
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors duration-200 font-normal"
                        style={{ fontSize: "clamp(16px, 1vw, 18px)", letterSpacing: "-0.05em", lineHeight: "1.8" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Second row — Industries + Company */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 py-8 lg:py-16">
          <div className="hidden lg:block" /> {/* spacer — desktop only */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex flex-col gap-3 lg:gap-4">
              <p className="text-white font-medium" style={{ fontSize: "clamp(18px, 1.2vw, 20px)", letterSpacing: "-0.05em" }}>
                Industries
              </p>
              <ul className="flex flex-col gap-2">
                {industryLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 font-normal"
                      style={{ fontSize: "clamp(16px, 1vw, 16px)", letterSpacing: "-0.05em", lineHeight: "1.8" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 lg:gap-4">
              <p className="text-white font-medium" style={{ fontSize: "clamp(18px, 1.2vw, 20px)", letterSpacing: "-0.05em" }}>
                Company
              </p>
              <ul className="flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-200 font-normal"
                      style={{ fontSize: "clamp(16px, 1vw, 16px)", letterSpacing: "-0.05em", lineHeight: "1.8" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clutch badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 py-6 lg:py-8">
          {clutchBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 lg:gap-3 rounded-2xl py-5 lg:py-10 px-3 lg:px-4"
              style={{ background: "rgb(255 255 255 / 5%)" }}
            >
              <Image src={badge.src} alt={badge.alt} width={80} height={120} className="object-contain  " />
              <div className="text-center">
                <p className="text-white font-semibold" style={{ fontSize: "clamp(14px, 1.2vw, 20px)", letterSpacing: "-0.05em" }}>
                  Clutch 2026
                </p>
                <p className="text-white font-normal mt-0.5" style={{ fontSize: "clamp(10px, 0.9vw, 14px)", letterSpacing: "-0.05em" }}>
                  {badge.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-3 lg:gap-0">
          {/* Show More Services */}
          <div className="transition-colors duration-200 font-normal lg:mb-5 px-5 lg:px-8 py-4 lg:py-5 rounded-2xl lg:rounded-[20px] cursor-pointer"
            style={{ background: "rgb(255 255 255 / 5%)" }}
          >
            <button
              onClick={() => setShowServices((v) => !v)}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <span className="text-white font-medium" style={{ fontSize: "clamp(16px, 1.1vw, 18px)", letterSpacing: "-0.05em" }}>
                Show More Services
              </span>
              <ChevronIcon open={showServices} />
            </button>
            {showServices && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-5">
                {[
                  "E-commerce Design", "SaaS Design", "Dashboard Design", "Startup Branding",
                  "Social Media Design", "Presentation Design", "Motion Design", "3D Design",
                  "Email Design", "Print Design",
                ].map((s) => (
                  <Link
                    key={s}
                    href="/services"
                    className="text-white/50 hover:text-white transition-colors duration-200 font-normal"
                    style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.01em" }}
                  >
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Show More Locations */}
          <div className="transition-colors duration-200 font-normal px-5 lg:px-8 py-4 lg:py-5 rounded-2xl lg:rounded-[20px] cursor-pointer"
            style={{ background: "rgb(255 255 255 / 5%)" }}
          >
            <button
              onClick={() => setShowLocations((v) => !v)}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <span className="text-white font-medium" style={{ fontSize: "clamp(16px, 1.1vw, 18px)", letterSpacing: "-0.02em" }}>
                Show More Locations
              </span>
              <ChevronIcon open={showLocations} />
            </button>
            {showLocations && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-5">
                {["Karachi", "Dubai", "Toronto"].map((loc) => (
                  <span
                    key={loc}
                    className="text-white/50 font-normal"
                    style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.01em" }}
                  >
                    {loc}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-4 pt-10 lg:pt-14">

          {/* Social icons — first on mobile */}
          <div className="flex items-center gap-6 order-1 sm:order-2">
            <a href="https://www.facebook.com/tamatosdigital" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/tamatosdigital/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/tamatos" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-colors duration-200">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="https://www.behance.net/tamatos" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity duration-200">
              <Image src={BehanceIcon} alt="Behance" width={30} height={30} />
            </a>
            <a href="https://clutch.co/profile/tamatos" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity duration-200">
              <Image src={ClutchIcon} alt="Clutch" width={30} height={30} />
            </a>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 flex-wrap justify-center order-2 sm:order-1">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/70 hover:text-white transition-colors duration-200 font-normal"
                style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.05em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/70 font-normal text-center order-3" style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.01em" }}>
            © 2021 - 2026 Tamatos — All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
}
