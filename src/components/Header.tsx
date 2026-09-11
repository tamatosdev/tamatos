"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.svg";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";
import type { NavItem, SiteNavigation } from "@/lib/navigation";
import { defaultSiteNavigation, getMegaMenuFromNavItem, navItemHasMegaMenu, normalizeHexColor } from "@/lib/navigation";

type HeaderProps = {
  navigation?: SiteNavigation;
};

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M2.5 4.5L6 8L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isNavActive(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

function categoryAccentColor(label: string, hoverColor?: string) {
  const key = label.trim().toLowerCase();
  const fallback =
    key === "design" ? "#03E4AC" : key === "development" ? "#FC7031" : "#9DF560";
  return normalizeHexColor(hoverColor, fallback);
}

export default function Header({ navigation = defaultSiteNavigation }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileMegaCategory, setMobileMegaCategory] = useState(0);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  const navLinks = navigation.items ?? defaultSiteNavigation.items ?? [];
  const contactButton = navigation.contactButton ?? defaultSiteNavigation.contactButton;

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
    if (!sidebarOpen) {
      setMobileExpanded(null);
      setMobileMegaCategory(0);
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      if (originalBodyOverflow) {
        document.body.style.overflow = originalBodyOverflow;
      } else {
        document.body.style.removeProperty("overflow");
      }
      if (originalHtmlOverflow) {
        document.documentElement.style.overflow = originalHtmlOverflow;
      } else {
        document.documentElement.style.removeProperty("overflow");
      }
    }

    return () => {
      if (originalBodyOverflow) {
        document.body.style.overflow = originalBodyOverflow;
      } else {
        document.body.style.removeProperty("overflow");
      }
      if (originalHtmlOverflow) {
        document.documentElement.style.overflow = originalHtmlOverflow;
      } else {
        document.documentElement.style.removeProperty("overflow");
      }
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!openMegaMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!headerContainerRef.current?.contains(event.target as Node)) {
        setOpenMegaMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMegaMenu]);

  const activeMegaLink = navLinks.find((link) => {
    if (openMegaMenu !== link.label) return false;
    return navItemHasMegaMenu(link) && !!getMegaMenuFromNavItem(link);
  });
  const activeMegaMenu = activeMegaLink ? getMegaMenuFromNavItem(activeMegaLink) : undefined;

  const renderDesktopNavItem = (link: NavItem) => {
    const isActive = isNavActive(pathname, link.href);
    const megaMenu = getMegaMenuFromNavItem(link);
    const hasMegaMenu = navItemHasMegaMenu(link) && !!megaMenu;
    const isMegaOpen = openMegaMenu === link.label;

    if (hasMegaMenu && megaMenu) {
      return (
        <div
          key={link.label}
          className={`flex items-center gap-0.5 rounded-full px-[15px] py-2.5 transition-all duration-200 ${
            isActive || isMegaOpen
              ? "bg-white text-[#0A0A0C]"
              : "text-white"
          }`}
        >
          {link.href ? (
            <Link
              href={link.href}
              className={`text-[15px] xl:text-[16px] font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive || isMegaOpen ? "text-[#0A0A0C]" : "text-white hover:text-white/70"
              }`}
            >
              {link.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setOpenMegaMenu(isMegaOpen ? null : link.label)}
              className={`text-[15px] xl:text-[16px] font-medium whitespace-nowrap transition-colors duration-200 ${
                isActive || isMegaOpen ? "text-[#0A0A0C]" : "text-white hover:text-white/70"
              }`}
            >
              {link.label}
            </button>
          )}
          <button
            type="button"
            aria-expanded={isMegaOpen}
            aria-label={`Toggle ${link.label} menu`}
            onClick={() => setOpenMegaMenu(isMegaOpen ? null : link.label)}
            className={`flex items-center justify-center rounded-full p-1 transition-colors duration-200 ${
              isActive || isMegaOpen ? "text-[#0A0A0C]" : "text-white hover:text-white/70"
            }`}
          >
            <ChevronDown
              className={`transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      );
    }

    if (!link.href) return null;

    return (
      <Link
        key={link.label}
        href={link.href}
        className={`text-[15px] xl:text-[16px] font-medium transition-all duration-200 whitespace-nowrap px-[15px] py-2.5 rounded-full ${
          isActive ? "bg-white text-[#0A0A0C]" : "text-white hover:text-white/70"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
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
        <div
          ref={headerContainerRef}
          className="container relative flex items-center justify-between"
        >
          <Link
            href="/"
            className={`flex items-center transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            <Image src={Logo} alt="Logo" className="w-34.75 lg:w-auto h-auto" priority />
          </Link>

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
            <nav className="relative flex items-center gap-2 xl:gap-3 px-2.5 py-2.5">
              {navLinks.map(renderDesktopNavItem)}
            </nav>
          </div>

          <Link
            href={contactButton?.href || "/contact"}
            className={`hidden lg:inline-flex px-6 xl:px-10 py-4 xl:py-5 rounded-full text-[15px] xl:text-[16px] font-medium text-white border border-white/30 hover:bg-white hover:text-black hover:border-white leading-none transition-all duration-500 ${scrolled ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            {contactButton?.label || "Contact Us"}
          </Link>

          {activeMegaMenu && (
            <div className="pointer-events-none absolute inset-x-0 top-full z-[80] hidden justify-center pt-4 lg:flex">
              <div className="pointer-events-auto">
                <ServicesMegaMenu
                  megaMenu={activeMegaMenu}
                  onNavigate={() => setOpenMegaMenu(null)}
                />
              </div>
            </div>
          )}

          <button
            className="flex lg:hidden flex-col gap-[5px] px-4 py-[11px] z-10 rounded-full"
            style={{ border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)" }}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300" />
            <span className="block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300" />
            <span className="block w-3 h-[1.5px] bg-white rounded-full ml-auto transition-all duration-300" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[70] flex h-full w-full max-w-[100vw] flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:max-w-[380px] ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: "rgba(10,10,12,0.98)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-5 sm:px-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <Image src={Logo} alt="Logo" width={120} height={28} priority />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto overscroll-contain px-5 pt-4 pb-4 sm:px-6">
          {navLinks.map((link) => {
            const megaMenu = getMegaMenuFromNavItem(link);
            const hasMegaMenu = navItemHasMegaMenu(link) && !!megaMenu;
            const isExpanded = mobileExpanded === link.label;
            const categories = megaMenu?.categories.filter((c) => c.items?.length) ?? [];
            const activeCategory =
              categories[mobileMegaCategory] ?? categories[0];

            if (hasMegaMenu && megaMenu && categories.length > 0) {
              return (
                <div
                  key={link.label}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (isExpanded) {
                        setMobileExpanded(null);
                      } else {
                        setMobileExpanded(link.label);
                        setMobileMegaCategory(0);
                      }
                    }}
                    className="flex w-full items-center justify-between py-3.5 text-left text-[20px] font-medium tracking-[-0.03em] text-white/70 transition-colors duration-200 hover:text-white sm:text-[22px]"
                  >
                    {link.label}
                    <ChevronDown
                      className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="pb-4">
                      {/* Category tabs — same model as desktop mega menu */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        {categories.map((category, index) => {
                          const isActive = index === mobileMegaCategory;
                          const color = categoryAccentColor(category.label, category.hoverColor);
                          return (
                            <button
                              key={category.label}
                              type="button"
                              onClick={() => setMobileMegaCategory(index)}
                              className="rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-[-0.02em] transition-colors duration-200"
                              style={{
                                background: isActive ? color : "rgba(255,255,255,0.06)",
                                color: isActive ? "#0A0A0C" : "rgba(255,255,255,0.55)",
                                border: isActive
                                  ? `1px solid ${color}`
                                  : "1px solid rgba(255,255,255,0.1)",
                              }}
                            >
                              {category.label}
                            </button>
                          );
                        })}
                      </div>

                      {activeCategory?.href && (
                        <Link
                          href={activeCategory.href}
                          onClick={() => setSidebarOpen(false)}
                          className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.02em] transition-opacity hover:opacity-80"
                          style={{
                            color: categoryAccentColor(
                              activeCategory.label,
                              activeCategory.hoverColor
                            ),
                          }}
                        >
                          View all {activeCategory.label}
                          <span aria-hidden>→</span>
                        </Link>
                      )}

                      <div className="flex flex-col gap-0.5 rounded-[14px] bg-white/[0.03] p-1.5">
                        {activeCategory?.items.map((item) => (
                          <Link
                            key={`${activeCategory.label}-${item.label}`}
                            href={item.href}
                            target={item.openInNewTab ? "_blank" : undefined}
                            rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                            onClick={() => setSidebarOpen(false)}
                            className="rounded-[10px] px-3 py-2.5 text-[14px] leading-snug tracking-[-0.02em] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (!link.href) return null;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="py-3.5 text-[20px] font-medium tracking-[-0.03em] text-white/70 transition-colors duration-200 hover:text-white sm:text-[22px]"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {!navLinks.some(
            (link) =>
              link.label.toLowerCase() === "contact us" ||
              link.href === "/contact" ||
              link.href === contactButton?.href
          ) && (
            <Link
              href={contactButton?.href || "/contact"}
              onClick={() => setSidebarOpen(false)}
              className="py-3.5 text-[20px] font-medium tracking-[-0.03em] text-white/70 transition-colors duration-200 hover:text-white sm:text-[22px]"
            >
              {contactButton?.label || "Contact Us"}
            </Link>
          )}
        </nav>

        <div className="px-5 py-5 sm:px-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link
            href={contactButton?.href || "/contact"}
            onClick={() => setSidebarOpen(false)}
            className="flex w-full items-center justify-center rounded-full py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{ border: "1px solid rgba(255,255,255,0.25)" }}
          >
            {contactButton?.label || "Contact Us"}
          </Link>
        </div>
      </aside>
    </>
  );
}
