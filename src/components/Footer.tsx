"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "@/assets/Logo.svg";
import Clutch50Badge from "@/assets/clutch-50.png";
import KlaviyoBadge from "@/assets/klaviyo-bedge.png";
import OdooBadge from "@/assets/odoo-bedge.png";
import ShopifyPartnerBadge from "@/assets/shopify-parthner-bedge.png";
import BehanceIcon from "@/assets/behance.svg";
import ClutchIcon from "@/assets/clutch.svg";
import FooterShade1 from "@/assets/footer-shade1.png";
import FooterShade2 from "@/assets/footer-shade2.png";

const navColumns = [
  {
    title: "Development Services",
    titleHref: "/services/development",
    links: [
      { label: "Websites", href: "/services/development" },
      { label: "Mobile Applications", href: "/services/development" },
      { label: "E-Commerce Solutions", href: "/services/development" },
      { label: "SaaS Platforms", href: "/services/development" },
      { label: "Custom Web Application", href: "/services/development" },
      { label: "Customer Portals & Dashboards", href: "/services/development" },
      { label: "ODOO Implementation", href: "/services/development" },
      { label: "API & System Integrations", href: "/services/development" },
      { label: "AI Workflows & Agents", href: "/services/development" },
    ],
  },
  {
    title: "Digital Services",
    titleHref: "/services/digital",
    links: [
      { label: "Social Media Marketing", href: "/services/digital" },
      { label: "Search Engine Optimization", href: "/services/digital" },
      { label: "Influencer Marketing", href: "/services/digital" },
      { label: "Email & WhatsApp Automation", href: "/services/digital" },
      { label: "Content Creation & Strategy", href: "/services/digital" },
      { label: "Analytics & Growth Analysis", href: "/services/digital" },
    ],
  },
  {
    title: "Design Services",
    titleHref: "/services/design",
    links: [
      { label: "Website UX/UI Design", href: "/services/design" },
      { label: "Mobile App Design", href: "/services/design" },
      { label: "Brand Strategy", href: "/services/design" },
      { label: "Brand Identity", href: "/services/design" },
      { label: "Pitch Deck Design", href: "/services/design" },
      { label: "Print & Marketing Collateral", href: "/services/design" },
    ],
  },
];

const industryLinks = [
  { label: "Industrial & Energy" },
  { label: "SaaS & Tech Startups" },
  { label: "E-Commerce & Retail" },
  { label: "Food & Beverage" },
  { label: "Healthcare" },
];

const companyLinks = [
  { label: "Works", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const partnerBadges = [
  { src: Clutch50Badge, alt: "Clutch — 5 Star Rated", label: "5 Star Rated" },
  { src: KlaviyoBadge, alt: "Klaviyo Partner", label: "Klaviyo Partners" },
  { src: OdooBadge, alt: "Odoo Partner", label: "Odoo Partners" },
  { src: ShopifyPartnerBadge, alt: "Shopify Partners", label: "Shopify Partners" },
];

const legalLinks = [
  { label: "Privacy Policy" },
  { label: "Cookie Policy" },
  { label: "Editorial Policy" },
];

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
            <p className="text-white font-medium leading-relaxed mt-3 lg:mt-7.5" style={{ fontSize: "clamp(16px, 1.3vw, 17.78px)", letterSpacing: "-0.02em" }}>
              Ready to Thrive Online?<br />Drop us a Line
            </p>
            <div className="flex items-center">
              <a
                href="mailto:hello@tamatos.com"
                className="text-white font-medium hover:text-white transition-colors duration-200"
                style={{ fontSize: "clamp(17.78px, 1.5vw, 21.33px)", letterSpacing: "-0.02em" }}
              >
                hello@tamatos.com
              </a>
              <CopyButton text="hello@tamatos.com" />
            </div>
          </div>

          {/* Right — nav columns */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            {navColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3 lg:gap-4">
                {col.titleHref ? (
                  <Link
                    href={col.titleHref}
                    className="text-white font-medium transition-colors duration-200 hover:text-white/80"
                    style={{ fontSize: "clamp(16px, 1.2vw, 19.56px)", letterSpacing: "-0.05em" }}
                  >
                    {col.title}
                  </Link>
                ) : (
                  <p
                    className="text-white font-medium"
                    style={{ fontSize: "clamp(16px, 1.2vw, 19.56px)", letterSpacing: "-0.05em" }}
                  >
                    {col.title}
                  </p>
                )}
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
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
            ))}
          </div>
        </div>

        {/* Second row — Industries + Company */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 py-8 lg:py-16">
          <div className="hidden lg:block" /> {/* spacer — desktop only */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col gap-3 lg:gap-4">
              <p className="text-white font-medium" style={{ fontSize: "clamp(16px, 1.2vw, 17.78px)", letterSpacing: "-0.05em" }}>
                Industries
              </p>
              <ul className="flex flex-col gap-2">
                {industryLinks.map((link) => (
                  <li key={link.label}>
                    <span
                      className="text-white/70 font-normal"
                      style={{ fontSize: "clamp(16px, 1vw, 16px)", letterSpacing: "-0.05em", lineHeight: "1.8" }}
                    >
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 lg:gap-4">
              <p className="text-white font-medium" style={{ fontSize: "clamp(16px, 1.2vw, 17.78px)", letterSpacing: "-0.05em" }}>
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

        {/* Partner badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 py-6 lg:py-8">
          {partnerBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex h-[247px] flex-col items-center justify-center gap-3 rounded-2xl px-3 lg:px-4"
              style={{ background: "rgb(255 255 255 / 5%)" }}
            >
              <Image
                src={badge.src}
                alt={badge.alt}
                width={140}
                height={60}
                className="h-8 w-auto object-contain sm:h-9 lg:h-10"
              />
              <p
                className="text-center text-white font-medium"
                style={{ fontSize: "clamp(14px, 1.4667vw, 21.12px)", letterSpacing: "-0.05em" }}
              >
                {badge.label}
              </p>
            </div>
          ))}
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
              <span
                key={link.label}
                className="text-white/70 font-normal"
                style={{ fontSize: "clamp(14px, 1vw, 16px)", letterSpacing: "-0.05em" }}
              >
                {link.label}
              </span>
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
