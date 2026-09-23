"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDateNumeric } from "@/lib/blog";

const PAGE_SIZE = 9;

type Props = {
  posts: BlogPost[];
};

export default function BlogListing({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState("All topics");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((post) => {
      post.categories?.nodes?.forEach((cat) => {
        if (cat.name) set.add(cat.name);
      });
    });
    return ["All topics", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeCategory === "All topics") return posts;
    return posts.filter((post) =>
      post.categories?.nodes?.some((cat) => cat.name === activeCategory),
    );
  }, [posts, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(totalPages, Math.ceil(visible.length / PAGE_SIZE) || 1);
  const hasMore = visible.length < filtered.length;

  const onCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="container pb-20 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)] gap-10 lg:gap-14">
        {/* Category sidebar — Arounda-style wrapping pills */}
        <aside className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-8">
          <nav className="flex flex-wrap gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategoryChange(category)}
                  className={`rounded-full font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-white text-[#0A0A0C]"
                      : "bg-[#2A2A2E] text-white hover:bg-[#3A3A40]"
                  }`}
                  style={{
                    fontSize: "15px",
                    letterSpacing: "-0.02em",
                    padding: "10px 18px",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </nav>

          <a
            href="https://calendly.com/nabeeldanishrafiq/tamatos"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex w-fit items-center justify-center rounded-full bg-white text-[#0A0A0C] font-medium hover:bg-[#9DF560] transition-colors duration-300 py-4 px-8"
            style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
          >
            Book a Call
          </a>
        </aside>

        {/* Cards feed */}
        <div>
          {filtered.length === 0 ? (
            <p className="text-white/40 text-center py-20">No posts found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
                {visible.map((post) => {
                  const authorGroup = post.authorGroup;
                  const tags = post.categories?.nodes?.map((c) => c.name).filter(Boolean) ?? [];

                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col"
                    >
                      <div className="relative overflow-hidden rounded-[22px] aspect-[4/3] bg-white/5">
                        {post.featuredImage?.node?.sourceUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}

                        {tags.length > 0 ? (
                          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 z-10">
                            {tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full text-white font-medium"
                                style={{
                                  fontSize: "13px",
                                  letterSpacing: "-0.02em",
                                  padding: "7px 14px",
                                  background: "rgba(255,255,255,0.18)",
                                  backdropFilter: "blur(10px)",
                                  WebkitBackdropFilter: "blur(10px)",
                                  border: "1px solid rgba(255,255,255,0.12)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-3 pt-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {authorGroup?.authorImage?.node?.sourceUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={authorGroup.authorImage.node.sourceUrl}
                                alt={authorGroup.authorName || "Author"}
                                className="w-8 h-8 rounded-full object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white/15 shrink-0" />
                            )}
                            <span
                              className="text-white/75 font-medium truncate"
                              style={{ fontSize: "15px", letterSpacing: "-0.02em" }}
                            >
                              {authorGroup?.authorName ?? "Tamatos"}
                            </span>
                          </div>
                          <span
                            className="text-white/45 font-normal shrink-0"
                            style={{ fontSize: "14px", letterSpacing: "-0.02em" }}
                          >
                            {formatDateNumeric(post.date)}
                          </span>
                        </div>

                        <h2
                          className="text-white font-medium leading-snug group-hover:text-white/80 transition-colors duration-200"
                          style={{
                            fontSize: "clamp(18px, 1.35vw, 22px)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {post.title}
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p
                  className="text-white/45 font-medium"
                  style={{ fontSize: "15px", letterSpacing: "-0.02em" }}
                >
                  {currentPage} / {totalPages}
                </p>

                {hasMore ? (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="inline-flex items-center justify-center rounded-full border border-white/30 text-white font-medium hover:bg-white hover:text-black transition-colors duration-300 px-8 py-3.5"
                    style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
                  >
                    Load more
                  </button>
                ) : (
                  <span className="text-white/30" style={{ fontSize: "15px" }}>
                    {filtered.length} article{filtered.length === 1 ? "" : "s"}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
