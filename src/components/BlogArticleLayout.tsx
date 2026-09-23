"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blogHeadings";
import { formatDateNumeric } from "@/lib/blog";
import SummarizeButtons from "@/components/SummarizeButtons";
import BlogAuthorProfile from "@/components/BlogAuthorProfile";

type AuthorProfile = {
  authorName?: string;
  designation?: string;
  bio?: string;
  authorImage?: { node: { sourceUrl: string } };
  socialProfiles?: { name?: string; url?: string }[];
};

type Props = {
  title: string;
  slug: string;
  postedAt: string;
  updatedAt?: string;
  headings: BlogHeading[];
  author?: AuthorProfile;
  children: React.ReactNode;
};

function ShareButton({
  label,
  href,
  onClick,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const className =
    "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white hover:text-[#0A0A0C] transition-colors duration-200";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} title={label} className={className}>
      {children}
    </button>
  );
}

export default function BlogArticleLayout({
  title,
  slug,
  postedAt,
  updatedAt,
  headings,
  author,
  children,
}: Props) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(`https://tamatos.com/blog/${slug}`);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${slug}`);
  }, [slug]);

  useEffect(() => {
    if (!headings.length) return;

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="container relative" style={{ zIndex: 1 }}>
      <div className="grid grid-cols-1 lg:grid-cols-[72px_minmax(0,1fr)_280px] xl:grid-cols-[88px_minmax(0,1fr)_300px] gap-8 lg:gap-10 xl:gap-14 items-start">
        {/* Left — Share */}
        <aside className="lg:sticky lg:top-32 self-start order-2 lg:order-1 z-20">
          <div className="flex lg:flex-col items-center lg:items-start gap-3">
            <p
              className="text-white/40 font-medium uppercase tracking-[0.14em] mr-1 lg:mr-0 lg:mb-1"
              style={{ fontSize: "11px" }}
            >
              Share
            </p>
            <div className="flex lg:flex-col gap-2.5">
              <ShareButton
                label="Share on LinkedIn"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </ShareButton>
              <ShareButton
                label="Share on Facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </ShareButton>
              <ShareButton
                label="Share on X"
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </ShareButton>
              <ShareButton label={copied ? "Copied" : "Copy link"} onClick={copyLink}>
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M3 8L6.5 11.5L13 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M11 5V4C11 3.17 10.33 2.5 9.5 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9.5C2.5 10.33 3.17 11 4 11H5"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </ShareButton>
            </div>
          </div>
        </aside>

        {/* Center — Content */}
        <div className="order-1 lg:order-2 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <p className="text-white/50 font-medium" style={{ fontSize: "15px", letterSpacing: "-0.02em" }}>
              Posted: {formatDateNumeric(postedAt)}
            </p>
            {updatedAt ? (
              <p className="text-white/50 font-medium" style={{ fontSize: "15px", letterSpacing: "-0.02em" }}>
                Updated: {formatDateNumeric(updatedAt)}
              </p>
            ) : null}
          </div>
          <div className="blog-content max-w-3xl">{children}</div>
          <div className="max-w-3xl">
            <BlogAuthorProfile author={author} />
          </div>
        </div>

        {/* Right — TOC + Summarize + CTA */}
        <aside className="lg:sticky lg:top-32 self-start order-3 z-20 space-y-4">
          {headings.length > 0 ? (
            <div
              className="rounded-[20px] p-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <p
                className="text-white font-semibold mb-4"
                style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
              >
                Table of contents
              </p>
              <nav className="max-h-72 overflow-y-auto pr-1 space-y-1">
                {headings.map((heading, index) => {
                  const isActive = activeId === heading.id;
                  return (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`flex gap-3 rounded-lg px-3 py-2 transition-colors duration-200 ${
                        isActive
                          ? "bg-white/10 text-[#9DF560]"
                          : "text-white/55 hover:text-white hover:bg-white/5"
                      }`}
                      style={{
                        fontSize: "14px",
                        letterSpacing: "-0.02em",
                        borderLeft: isActive ? "3px solid #9DF560" : "3px solid transparent",
                      }}
                    >
                      <span className="shrink-0 opacity-60">{index + 1}.</span>
                      <span className={heading.style === "h3" ? "pl-1" : ""}>{heading.text}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          ) : null}

          <div
            className="rounded-full px-4 py-3 flex items-center justify-between gap-3"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="text-white/50 font-medium uppercase tracking-[0.1em] shrink-0"
              style={{ fontSize: "11px" }}
            >
              Summarise with
            </span>
            <SummarizeButtons title={title} slug={slug} />
          </div>

          <a
            href="https://calendly.com/nabeeldanishrafiq/tamatos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300 py-4 px-6"
            style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
          >
            Book a Call
          </a>
        </aside>
      </div>
    </div>
  );
}
