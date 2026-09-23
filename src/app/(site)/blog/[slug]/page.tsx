export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import arrow_shade from "@/assets/arrow-shade.png";
import footerShade1 from "@/assets/footer-shade1.png";
import footerShade2 from "@/assets/footer-shade2.png";
import BlogArticleLayout from "@/components/BlogArticleLayout";
import CtaSection2 from "@/components/CtaSection2";
import PortableTextContent from "@/components/PortableTextContent";
import SummarizeButtons from "@/components/SummarizeButtons";
import {
  formatDate,
  getNextPost,
  getPostBySlug,
  getPostExcerpt,
  getPostReadingTime,
} from "@/lib/blog";
import { extractBlogHeadings } from "@/lib/blogHeadings";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: `Post Not Found | ${SITE_NAME}` };
  }

  const description = getPostExcerpt(post, 160) || DEFAULT_DESCRIPTION;
  const image = post.featuredImage?.node?.sourceUrl;
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | ${SITE_NAME} Blog`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.date,
      ...(image ? { images: [{ url: image, alt: post.featuredImage?.node?.altText || post.title }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, nextPost] = await Promise.all([getPostBySlug(slug), getNextPost(slug)]);

  if (!post) notFound();

  const category = post.categories?.nodes?.[0]?.name ?? "Article";
  const readingTime = getPostReadingTime(post);
  const authorGroup = post.authorGroup;
  const headings = extractBlogHeadings(post.body);

  return (
    <>
      {/* Shade — full viewport width, outside any container */}
      <div className="absolute top-0 right-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <Image src={arrow_shade} alt="" priority />
      </div>

      <main className="relative" style={{ zIndex: 1 }}>

        {/* Hero */}
        <section id="blog-hero" className="relative z-10 pt-36 pb-10 lg:pt-48 lg:pb-14">
          <div className="container">

            {/* Breadcrumb */}
            <div className="mb-8 lg:mb-12">
              <div
                className="inline-flex items-center gap-2 px-7 py-2 rounded-full text-white/70 font-medium"
                style={{
                  fontSize: "clamp(18px, 1.04vw, 18px)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid #ffffff26",
                  boxShadow: "inset 5.33px 4px 12px 0px rgba(255,255,255,0.15)",
                }}
              >
                <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
                <span className="text-white/30">/</span>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">Blogs</Link>
                <span className="text-white/30">/</span>
                <span className="text-white ">{post.title}</span>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

              {/* Left — Featured Image */}
              <div className="w-full rounded-2xl overflow-hidden aspect-4/3 lg:aspect-auto lg:h-125">
                {post.featuredImage?.node?.sourceUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5" />
                )}
              </div>

              {/* Right — Meta */}
              <div className="flex flex-col justify-center gap-8 lg:h-125">

                {/* Top — title + category */}
                <div className="flex flex-col gap-5">
                  {/* Title */}
                  <h1
                    className="text-white font-semibold leading-[1.15]"
                    style={{ fontSize: "clamp(24.89px, 3vw, 48px)", letterSpacing: "-0.04em" }}
                  >
                    {post.title}
                  </h1>

                  {/* Category ✱ Reading time */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: "19.56px", letterSpacing: "-0.02em" }}
                    >
                      {category}
                    </span>
                    <span className="text-[#9DF560] text-2xl leading-none">✱</span>
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: "19.56px", letterSpacing: "-0.02em" }}
                    >
                      {readingTime}
                    </span>
                  </div>
                </div>

                {/* Summarize with */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-normal" style={{ fontSize: "21.33px", letterSpacing: "-0.02em" }}>
                    Summarize with
                  </span>
                  <SummarizeButtons title={post.title} slug={post.slug} />
                </div>

                {/* Bottom — Author + Date on one line */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    {authorGroup?.authorImage?.node?.sourceUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={authorGroup.authorImage.node.sourceUrl}
                        alt={authorGroup.authorName || "Author"}
                        className="w-10.75 h-10.75 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10.75 h-10.75 rounded-full bg-white/20 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span
                        className="block text-white font-medium leading-tight"
                        style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                      >
                        {authorGroup?.authorName ?? "Tamatos"}
                      </span>
                      {authorGroup?.designation ? (
                        <span
                          className="block text-white/55 font-normal mt-0.5"
                          style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
                        >
                          {authorGroup.designation}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-white/40">•</span>
                    <span
                      className="text-white font-normal"
                      style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                    >
                      {formatDate(post.date)}
                    </span>
                  </div>

                  {authorGroup?.socialProfiles?.length ? (
                    <div className="flex flex-wrap items-center gap-3">
                      {authorGroup.socialProfiles.map((profile) => (
                        <a
                          key={`${profile.name}-${profile.url}`}
                          href={profile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 font-medium hover:text-[#9DF560] transition-colors duration-200"
                          style={{ fontSize: "16px", letterSpacing: "-0.02em" }}
                        >
                          {profile.name}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Post content */}
        {post.body && post.body.length > 0 && (
          <section id="blog-content" className="relative pb-16 lg:pb-24">
            <Image
              src={footerShade1}
              alt=""
              className="absolute pointer-events-none select-none"
              style={{ left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 0 }}
            />
            <Image
              src={footerShade2}
              alt=""
              className="absolute pointer-events-none select-none"
              style={{ right: 0, bottom: 0, zIndex: 0 }}
            />
            <BlogArticleLayout
              title={post.title}
              slug={post.slug}
              postedAt={post.date}
              updatedAt={post.updatedAt}
              headings={headings}
              author={authorGroup}
            >
              <PortableTextContent value={post.body} />
            </BlogArticleLayout>
          </section>
        )}

        {/* BlogStickyBar hidden for now */}

        {/* Up Next */}
        {nextPost && (() => {
          const np = nextPost;
          const npCategory = np.categories?.nodes?.[0]?.name ?? "Article";
          const npReadingTime = getPostReadingTime(np);
          const npExcerpt = getPostExcerpt(np);
          const npAuthor = np.authorGroup;

          return (
            <section className="container pb-20 lg:pb-32">
              {/* Section heading */}
              <h2
                className="text-white font-medium mb-0"
                style={{ fontSize: "clamp(21.33px, 2.5vw, 44.44px)", letterSpacing: "-0.04em" }}
              >
                Up Next
              </h2>


              {/* Card */}
              <div className="py-10 flex flex-col sm:flex-row gap-6 lg:gap-20 group">

                {/* Image */}
                <Link
                  href={`/blog/${np.slug}`}
                  className="shrink-0 w-full sm:w-80 lg:w-120 rounded-2xl overflow-hidden"
                  style={{ height: "560px" }}
                >
                  {np.featuredImage?.node?.sourceUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={np.featuredImage.node.sourceUrl}
                      alt={np.featuredImage.node.altText || np.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 gap-3">
                  <Link href={`/blog/${np.slug}`}>
                    <h3
                      className="text-white font-medium leading-tight hover:text-white/80 transition-colors duration-200"
                      style={{ fontSize: "clamp(21.33px, 2.6vw, 44.44px)", letterSpacing: "-0.03em" }}
                    >
                      {np.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium" style={{ fontSize: "21.33px", letterSpacing: "-0.02em" }}>{npCategory}</span>
                    <span className="text-[#9DF560] text-2xl leading-none">✱</span>
                    <span className="text-white font-medium" style={{ fontSize: "21.33px", letterSpacing: "-0.02em" }}>{npReadingTime}</span>
                  </div>

                  {npExcerpt && (
                    <p className="text-white/80 font-normal leading-relaxed flex-1" 
                    style={{ fontSize: "clamp(18px, 0.94vw, 18px)", 
                    letterSpacing: "-0.01em" }}>
                      {npExcerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between gap-4 mt-2">
                    <Link
                      href={`/blog/${np.slug}`}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-black font-medium text-[18px] hover:bg-white/80 transition-colors duration-300"
                      style={{ padding: "15px 30px", letterSpacing: "-0.02em" }}
                    >
                      Read More
                    </Link>

                    <div className="flex items-center gap-3 shrink-0">
                      {npAuthor?.authorImage?.node?.sourceUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={npAuthor.authorImage.node.sourceUrl} alt={npAuthor.authorName || "Author"} className="w-10.75 h-10.75 rounded-full object-cover shrink-0" />
                      ) : (
                        <div className="w-10.75 h-10.75 rounded-full bg-white/20 shrink-0" />
                      )}
                      <span className="text-white font-medium" style={{ fontSize: "clamp(18px, 0.94vw, 18px)", letterSpacing: "-0.02em" }}>{npAuthor?.authorName ?? "Tamatos"}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white font-normal" style={{ fontSize: "clamp(18px, 0.94vw, 18px)", letterSpacing: "-0.02em" }}>{formatDate(np.date)}</span>
                    </div>
                  </div>
                </div>
              </div>

             
            </section>
          );
        })()}

        <CtaSection2 />

      </main>
    </>
  );
}
