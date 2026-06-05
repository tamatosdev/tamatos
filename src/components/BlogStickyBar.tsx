"use client";

import { useEffect, useState, useCallback } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function BlogStickyBar({ title, slug }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleScroll = useCallback(() => {
    const hero = document.getElementById("blog-hero");
    const content = document.getElementById("blog-content");
    if (!hero || !content) return;

    const scrollY = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const contentStart = content.offsetTop;
    const contentEnd = content.offsetTop + content.offsetHeight;

    // Show after hero section is scrolled past
    const started = scrollY > heroBottom - 80;
    // Hide when content ends
    const ended = scrollY + window.innerHeight > contentEnd + 60;

    setVisible(started && !ended);

    // Progress: 0% at content start → 100% at content end
    if (started) {
      const scrolled = scrollY - contentStart;
      const total = content.offsetHeight - window.innerHeight;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const raf = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [handleScroll]);

  const handleShare = async () => {
    const url = `${window.location.origin}/blog/${slug}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title, url }); return; } catch {}
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center transition-transform duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <div
        className="container bg-white overflow-hidden"
        style={{ borderRadius: "50px 50px 0 0", boxShadow: "0 -4px 40px rgba(0,0,0,0.18)" }}
      >
        {/* Content row */}
        <div className="flex items-center justify-between py-4 px-4 sm:py-10 sm:px-10 gap-6">
          <p
            className="text-[#0A0A0C] font-medium leading-tight flex-1"
            style={{ fontSize: "clamp(18px, 1.25vw, 24px)", letterSpacing: "-0.03em" }}
          >
            {title}
          </p>
          <button
            onClick={handleShare}
            className="shrink-0 rounded-full bg-[#0A0A0C] text-white font-medium hover:bg-black/70 transition-colors duration-200"
            style={{ fontSize: "18px", padding: "8px 20px", letterSpacing: "-0.01em" }}
          >
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Green progress bar — bottom of panel */}
        <div className="h-1.25 w-full bg-black/8">
          <div
            className="h-full bg-[#9DF560] transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
