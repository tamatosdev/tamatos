"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ctaImage from "@/assets/cta-2-shadow.png";
import ctaShadeMobile from "@/assets/cta-shade-mobile.png";
import type { FinalCtaData } from "@/lib/home";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="text-[#0A0A0C]/70 hover:text-[#0A0A0C] transition-colors duration-200"
      title={copied ? "Copied" : "Copy email"}
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      {copied ? (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8L6.5 11.5L13 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path
            d="M11 5V4C11 3.17 10.33 2.5 9.5 2.5H4C3.17 2.5 2.5 3.17 2.5 4V9.5C2.5 10.33 3.17 11 4 11H5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function CtaSection2({ data }: { data?: FinalCtaData }) {
  const heading = "Got a Kickass Idea?\nWe'll help you make it Real.";
  const description =
    "You've now seen what we've built and what our clients say. The only thing left for you is starting. Drop us your brief or just say hi. Either works.";
  const buttonLabel = data?.primaryButton?.label ?? "Book a Free Consultation";
  const buttonHref =
    data?.primaryButton?.href ?? "https://calendly.com/nabeeldanishrafiq/tamatos";
  const email = "hello@tamatos.com";

  const headingParts = heading.split("\n");
  const isExternal = buttonHref.startsWith("http");

  return (
    <section className="container relative py-14 lg:py-32 px-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 overflow-hidden relative rounded-[28px] lg:rounded-[40px] bg-white px-5 py-10 lg:p-[70px_110px]">
        <Image
          src={ctaImage}
          alt=""
          className="hidden lg:block absolute right-[10%] lg:top-17.5 w-[60%] object-fill pointer-events-none select-none"
          priority
        />
        <Image
          src={ctaShadeMobile}
          alt=""
          className="block lg:hidden absolute right-0 top-0 h-full w-auto object-top-right pointer-events-none select-none"
          priority
        />

        <div className="flex flex-col gap-6 lg:gap-8 relative z-10">
          <h2
            className="text-[#0A0A0C] font-medium leading-[1.2]"
            style={{ fontSize: "clamp(28.44px, 4.5vw, 50.06px)", letterSpacing: "-0.05em" }}
          >
            {headingParts.map((line, i) => {
              const kickassMatch = line.match(/^(.*)(Kickass)(.*)$/i);
              if (kickassMatch) {
                return (
                  <span key={i}>
                    {kickassMatch[1]}
                    <em className="italic text-[#0A0A0C]/70">{kickassMatch[2]}</em>
                    {kickassMatch[3]}
                    {i < headingParts.length - 1 && <br />}
                  </span>
                );
              }
              return (
                <span key={i}>
                  {line}
                  {i < headingParts.length - 1 && <br />}
                </span>
              );
            })}
          </h2>

          <p
            className="block lg:hidden font-medium leading-relaxed"
            style={{ fontSize: "18px", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}
          >
            {description}
          </p>

          {isExternal ? (
            <a
              href={buttonHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full font-medium text-white bg-[#1D17E0] hover:bg-[#0A0A0C] transition-colors duration-300 py-4 px-5 lg:py-4 lg:px-8"
              style={{ fontSize: "clamp(18px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}
            >
              {buttonLabel}
            </a>
          ) : (
            <Link
              href={buttonHref}
              className="inline-flex w-fit items-center justify-center rounded-full font-medium text-white bg-[#1D17E0] hover:bg-[#0A0A0C] transition-colors duration-300 py-4 px-5 lg:py-4 lg:px-8"
              style={{ fontSize: "clamp(18px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}
            >
              {buttonLabel}
            </Link>
          )}

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`mailto:${email}`}
              className="text-[#0A0A0C] font-semibold"
              style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
            >
              {email}
            </a>
            <CopyButton text={email} />
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:max-w-85 relative z-10">
          <p
            className="font-medium leading-relaxed"
            style={{ fontSize: "clamp(18px, 1.2vw, 18px)", letterSpacing: "-0.02em", color: "rgba(10,10,12,0.8)" }}
          >
            {description}
          </p>
          <div className="mt-8 inline-flex items-center gap-2">
            <a
              href={`mailto:${email}`}
              className="text-[#0A0A0C] font-semibold hover:opacity-80 transition-opacity"
              style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
            >
              {email}
            </a>
            <CopyButton text={email} />
          </div>
        </div>
      </div>
    </section>
  );
}
