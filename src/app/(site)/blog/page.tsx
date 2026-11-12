// Serve a cached page and refresh it from Sanity at most once a minute.
export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import CtaSection2 from "@/components/CtaSection2";
import BlogListing from "@/components/BlogListing";
import JsonLd from "@/components/JsonLd";
import blogShade from "@/assets/blog-shade.webp";
import { getPosts } from "@/lib/blog";
import { getPageSeo } from "@/lib/pageSeo";
import { buildJsonLd, buildPageMetadata, mergeSeo } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const LINKEDIN_NEWSLETTER_URL =
  "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7521163588720291840";

export async function generateMetadata() {
  const seo = await getPageSeo("blogPage");
  return buildPageMetadata(
    mergeSeo(
      {
        metaTitle: "Tamatos Blog | SEO, Web Development & Startup Insights",
        metaDescription:
          "Expert insights on SEO, web development, UX design and building digital products. Practical reads for founders and marketers ready to grow online.",
        canonicalUrl: `${SITE_URL}/blog`,
      },
      seo,
    ),
  );
}

export default async function BlogPage() {
  const [posts, seo] = await Promise.all([getPosts(), getPageSeo("blogPage")]);
  const jsonLd = buildJsonLd(
    mergeSeo(
      {
        metaTitle: "Tamatos Blog | SEO, Web Development & Startup Insights",
        canonicalUrl: `${SITE_URL}/blog`,
        schema: { type: "webPage", name: `${SITE_NAME} Blog` },
      },
      seo,
    ),
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <div
        className="absolute top-0 left-0 w-full pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <Image src={blogShade} alt="" className="w-full" priority />
      </div>

      <main className="relative" style={{ overflowX: "clip", zIndex: 1 }}>
        <section className="relative z-10 pt-36 pb-12 lg:pt-48 lg:pb-20">
          <div className="container">
            <div className="mb-8 lg:mb-12">
              <div
                className="inline-flex items-center gap-2 px-7 py-2 rounded-full text-[16px] sm:text-[18px] text-white/70 font-medium"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #ffffff26",
                  boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
                }}
              >
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
                <span className="text-white/30">/</span>
                <span className="text-white">Blogs</span>
              </div>
            </div>

            <div className="relative max-w-5xl">
              <h1
                className="text-white font-medium leading-[1.1] tracking-[-0.04em]"
                style={{ fontSize: "clamp(32px, 5.2vw, 72px)" }}
              >
                <span className="block">
                  Musings On <em className="italic text-white/50">Design,</em>
                </span>
                <span className="block">
                  <em className="italic text-white/50">Experience</em> And Technology
                  <span className="text-[#9DF560]">.</span>
                </span>
              </h1>
              <p
                className="mt-6 max-w-xl text-white/60 font-normal leading-relaxed"
                style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
              >
                Fresh insights, great ideas, bold trends, and revolutionary innovations in
                business, software, and tech.
              </p>

              <a
                href={LINKEDIN_NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to our Newsletter on LinkedIn"
                className="linkedin-newsletter-btn mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[18px] font-medium leading-none tracking-[-0.02em] text-white"
              >
                Subscribe to our Newsletter on
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <BlogListing posts={posts} />

        <CtaSection2 />
      </main>
    </>
  );
}
