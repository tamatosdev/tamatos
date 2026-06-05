export const revalidate = 0;

import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import Image from "next/image";
import CtaSection2 from "@/components/CtaSection2";
import blogShade from "@/assets/blog-shade.png";

const client = new GraphQLClient("https://tamatos.com/graphql", {
  fetch: (url, options) => fetch(url, { ...options, cache: "no-store" }),
});

const query = gql`
  {
    posts(first: 50) {
      nodes {
        id
        title
        slug
        date
        excerpt
        content
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        authorGroup {
          authorName
          authorImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

type Post = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  categories?: { nodes: { name: string }[] };
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  authorGroup?: { authorName?: string; authorImage?: { node: { sourceUrl: string } } };
};

async function getPosts(): Promise<Post[]> {
  try {
    const data = await client.request<{ posts: { nodes: Post[] } }>(query);
    return data.posts.nodes;
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString("en-GB", { month: "long" });
  const year = d.getFullYear();
  const suffix =
    day % 10 === 1 && day !== 11 ? "st"
    : day % 10 === 2 && day !== 12 ? "nd"
    : day % 10 === 3 && day !== 13 ? "rd"
    : "th";
  return `${day}${suffix} ${month} ${year}`;
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${String(mins).padStart(2, "0")} Mins Read`;
}

function getExcerpt(html: string, maxLen = 200) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
    {/* Shade — full viewport width, outside any container */}
    <div className="absolute top-0 left-0 w-full pointer-events-none select-none" style={{ zIndex: 0 }}>
      <Image src={blogShade} alt="" className="w-full" priority />
    </div>

    <main className="relative" style={{ overflowX: "clip", zIndex: 1 }}>

      {/* Hero */}
      <section className="relative z-10 pt-36 pb-14 lg:pt-48 lg:pb-30">
        <div className="container">

          {/* Breadcrumb */}
          <div className="mb-8 lg:mb-12">
            <div
              className="inline-flex items-center gap-2 px-7 py-2 rounded-full text-white/70 font-medium"
              style={{
                fontSize: "20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid #ffffff26",
                boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
              }}
            >
              <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-white">Blogs</span>
            </div>
          </div>

          {/* Heading + description */}
          <div className="relative">
            <h1
              className="text-white font-medium leading-[1.1] tracking-[-0.04em]"
              style={{ fontSize: "clamp(36px, 5.5vw, 90px)" }}
            >
              <span className="block">Musings On{" "}<em className="italic text-white/50">Design,</em></span>
              <span className="block"><em className="italic text-white/50">Experience</em>{" "}And Technology<span className="text-[#9DF560]">.</span></span>
            </h1>
            <p
              className="mt-6 lg:mt-0 lg:absolute lg:top-0 lg:right-0 lg:max-w-70 text-white/60 font-normal leading-relaxed"
              style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
            >
              Fresh insights, great ideas, bold trends, and revolutionary innovations in business, software, and tech.
            </p>
          </div>

        </div>
      </section>

      {/* Posts list */}
      <section className="container pb-20">
        {posts.length === 0 ? (
          <p className="text-white/40 text-center py-20">No posts found.</p>
        ) : (
          <div className="flex flex-col">
            {posts.map((post, index) => {
              const authorGroup = post.authorGroup;
              const readingTime = post.content ? getReadingTime(post.content) : "03 Mins Read";
              const category = post.categories?.nodes?.[0]?.name ?? "Article";
              const excerpt = post.excerpt
                ? getExcerpt(post.excerpt)
                : post.content
                ? getExcerpt(post.content)
                : "";

              return (
                <div key={post.id}>
                  {/* Divider */}
                  <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} />

                  <div className="py-10 sm:py-12 lg:py-16 flex flex-col sm:flex-row gap-6 lg:gap-20 group">

                    {/* Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="shrink-0 w-full sm:w-80 lg:w-120 rounded-2xl overflow-hidden h-[240px] sm:h-[360px] lg:h-[560px]"
                    >
                      {post.featuredImage?.node?.sourceUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5" />
                      )}
                    </Link>

                    {/* Content */}
                    <div className="flex flex-col flex-1 gap-3">

                      {/* Title */}
                      <Link href={`/blog/${post.slug}`}>
                        <h2
                          className="text-white font-medium leading-tight hover:text-white/80 transition-colors duration-200"
                          style={{ fontSize: "clamp(24px, 2.6vw, 50px)", letterSpacing: "-0.03em" }}
                        >
                          {post.title}
                        </h2>
                      </Link>

                      {/* Category + asterisk + reading time */}
                      <div className="flex items-center gap-3">
                        <span
                          className="text-white font-medium"
                          style={{ fontSize: "24px", letterSpacing: "-0.02em" }}
                        >
                          {category}
                        </span>
                        <span className="text-[#9DF560] text-2xl leading-none">✱</span>
                        <span
                          className="text-white font-medium"
                          style={{ fontSize: "24px", letterSpacing: "-0.02em" }}
                        >
                          {readingTime}
                        </span>
                      </div>

                      {/* Excerpt */}
                      {excerpt && (
                        <p
                          className="text-white/80 font-normal leading-relaxed flex-1"
                          style={{ fontSize: "clamp(16px, 0.94vw, 18px)", letterSpacing: "-0.01em" }}
                        >
                          {excerpt}
                        </p>
                      )}

                      {/* Bottom - 2 rows on 1024px and lower, 1 row on 1280px+ */}
                      <div className="mt-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 lg:gap-6">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-black font-medium hover:bg-white/80 transition-colors duration-300 px-6 py-3 sm:text-lg lg:text-xl lg:px-8 lg:py-4 shrink-0"
                          style={{ letterSpacing: "-0.02em" }}
                        >
                          Read More
                        </Link>

                        <div className="flex items-center gap-3 shrink-0 justify-start xl:justify-end">
                          {authorGroup?.authorImage?.node?.sourceUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={authorGroup.authorImage.node.sourceUrl}
                              alt={authorGroup.authorName || "Author"}
                              className="w-10 h-10 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-white/20 shrink-0" />
                          )}
                          <span
                            className="text-white font-medium"
                            style={{ fontSize: "clamp(14px, 2vw, 18px)", letterSpacing: "-0.02em" }}
                          >
                            {authorGroup?.authorName ?? "Tamatos"}
                          </span>
                          <span className="text-white/30">•</span>
                          <span
                            className="text-white font-normal"
                            style={{ fontSize: "clamp(14px, 2vw, 18px)", letterSpacing: "-0.02em" }}
                          >
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Last item bottom divider */}
                  {index === posts.length - 1 && (
                    <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>


        <CtaSection2 />

    </main>
    </>
  );
}
