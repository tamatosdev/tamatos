export const revalidate = 0;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import arrow_shade from "@/assets/arrow-shade.png";
import footerShade1 from "@/assets/footer-shade1.png";
import footerShade2 from "@/assets/footer-shade2.png";
import BlogStickyBar from "@/components/BlogStickyBar";
import CtaSection2 from "@/components/CtaSection2";
import PortableTextContent from "@/components/PortableTextContent";
import {
  formatDate,
  getNextPost,
  getPostBySlug,
  getPostExcerpt,
  getPostReadingTime,
} from "@/lib/blog";
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

  return (
    <>
      {/* Shade — full viewport width, outside any container */}
      <div className="absolute top-0 right-0 pointer-events-none select-none" style={{ zIndex: 0 }}>
        <Image src={arrow_shade} alt="" priority />
      </div>

      <main className="relative" style={{ overflowX: "clip", zIndex: 1 }}>

        {/* Hero */}
        <section id="blog-hero" className="relative z-10 pt-36 pb-10 lg:pt-48 lg:pb-14">
          <div className="container">

            {/* Breadcrumb */}
            <div className="mb-8 lg:mb-12">
              <div
                className="inline-flex items-center gap-2 px-7 py-2 rounded-full text-white/70 font-medium"
                style={{
                  fontSize: "clamp(16px, 1.04vw, 20px)",
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
                    style={{ fontSize: "clamp(28px, 3vw, 54px)", letterSpacing: "-0.04em" }}
                  >
                    {post.title}
                  </h1>

                  {/* Category ✱ Reading time */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
                    >
                      {category}
                    </span>
                    <span className="text-[#9DF560] text-2xl leading-none">✱</span>
                    <span
                      className="text-white font-medium"
                      style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
                    >
                      {readingTime}
                    </span>
                  </div>
                </div>

                {/* Summarize with */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-normal" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>
                    Summarize with
                  </span>
                  {(() => {
                    const postUrl = `https://tamatos.com/blog/${post.slug}`;
                    const prompt = encodeURIComponent(`Summarize and analyze the key insights from '${postUrl}' ${post.title}`);
                    return (
                      <div className="flex items-center gap-3">
                        {/* ChatGPT */}
                        <a href={`https://chatgpt.com/?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" title="Summarize with ChatGPT">
                          <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>
                        </a>
                        {/* Perplexity */}
                        <a href={`https://www.perplexity.ai/?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" title="Summarize with Perplexity">
                          <svg fill="currentColor" width="24" height="24" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M5.4524 2.22217L10.5984 7.17779V2.2336H11.6002V7.19996L16.7693 2.22217V7.87235H18.8915V16.0222H16.7758V21.0534L11.6002 16.3007V21.1079H10.5984V16.379L5.45824 21.1111V16.0222H3.33594V7.87235H5.4524V2.22217ZM9.8432 8.90656H4.33775V14.9879H5.45702V13.0696L9.8432 8.90656ZM6.45987 13.5286V18.8033L10.5984 14.9934V9.59965L6.45987 13.5286ZM11.629 14.9429V9.59457L15.7687 13.5237V16.0222H15.7741V18.7493L11.629 14.9429ZM16.7758 14.9879H17.8897V8.90656H12.4252L16.7758 13.0265V14.9879ZM15.7675 7.87235V4.60109L12.3706 7.87235H15.7675ZM9.85104 7.87235H6.45416V4.60109L9.85104 7.87235Z"/></svg>
                        </a>
                        {/* Claude */}
                        <a href={`https://claude.ai/new?q=${prompt}`} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-200" title="Summarize with Claude">
                          <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"/></svg>
                        </a>
                      </div>
                    );
                  })()}
                </div>

                {/* Bottom — Author + Date on one line */}
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
                  <span
                    className="text-white font-medium"
                    style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                  >
                    {authorGroup?.authorName ?? "Tamatos"}
                  </span>
                  <span className="text-white/40">•</span>
                  <span
                    className="text-white font-normal"
                    style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                  >
                    {formatDate(post.date)}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Post content */}
        {post.body && post.body.length > 0 && (
          <section id="blog-content" className="relative pb-16 lg:pb-24 overflow-hidden">
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
            <div className="container relative" style={{ zIndex: 1 }}>
              <div className="blog-content max-w-4xl">
                <PortableTextContent value={post.body} />
              </div>
            </div>
          </section>
        )}

        <BlogStickyBar title={post.title} slug={post.slug} />

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
                style={{ fontSize: "clamp(24px, 2.5vw, 50px)", letterSpacing: "-0.04em" }}
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
                      style={{ fontSize: "clamp(24px, 2.6vw, 50px)", letterSpacing: "-0.03em" }}
                    >
                      {np.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>{npCategory}</span>
                    <span className="text-[#9DF560] text-2xl leading-none">✱</span>
                    <span className="text-white font-medium" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>{npReadingTime}</span>
                  </div>

                  {npExcerpt && (
                    <p className="text-white/80 font-normal leading-relaxed flex-1" 
                    style={{ fontSize: "clamp(16px, 0.94vw, 18px)", 
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
                      <span className="text-white font-medium" style={{ fontSize: "clamp(16px, 0.94vw, 18px)", letterSpacing: "-0.02em" }}>{npAuthor?.authorName ?? "Tamatos"}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-white font-normal" style={{ fontSize: "clamp(16px, 0.94vw, 18px)", letterSpacing: "-0.02em" }}>{formatDate(np.date)}</span>
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
