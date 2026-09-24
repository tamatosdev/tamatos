export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CtaSection2 from "@/components/CtaSection2";
import BlogListing from "@/components/BlogListing";
import blogShade from "@/assets/blog-shade.png";
import { getPosts } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Fresh insights, great ideas, bold trends, and revolutionary innovations in business, software, and tech.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description:
      "Fresh insights, great ideas, bold trends, and revolutionary innovations in business, software, and tech.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
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
            </div>
          </div>
        </section>

        <BlogListing posts={posts} />

        <CtaSection2 />
      </main>
    </>
  );
}
