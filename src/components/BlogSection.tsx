import Link from "next/link";
import {
  formatDate,
  getPostReadingTime,
  getPosts,
} from "@/lib/blog";

export default async function BlogSection() {
  const posts = await getPosts(3);

  if (!posts.length) return null;

  return (
    <section className="container py-14 lg:py-24"> 
      {/* Heading row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-8 md:mb-12">
        <h2
          className="text-white font-medium leading-[1.2]"
          style={{ fontSize: "clamp(32px, 3.13vw, 60px)", letterSpacing: "-0.05em" }}
        >
          Get Real <span className="text-white/50 italic">Growth Insights</span> and Proven Tactics For Digital Success<span className="text-[#9DF560]">.</span>
        </h2>
        <Link
          href="/blog"
          className="text-white/100 font-normal  hover:bg-white : hover:text-black transition-colors duration-200 shrink-0
          px-[40px] py-[10px] border border-white/40 rounded-full"
          style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.03em" }}
        >
          Read More
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => {
          const authorGroup = post.authorGroup;
          const readingTime = getPostReadingTime(post);

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-[20px] overflow-hidden transition-transform duration-300"
       
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-[20px]" style={{ height: "225px" }}>
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
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-0 pt-5 sm:p-5 flex-1">
                {/* Date + reading time */}
                <p
                  className="text-white/80 font-medium"
                  style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                >
                  {formatDate(post.date)}&nbsp;&nbsp;•&nbsp;&nbsp;{readingTime}
                </p>

                {/* Title */}
                <h3
                  className="text-white font-semibold leading-tight flex-1"
                  style={{ fontSize: "clamp(16px, 1.25vw, 24px)", letterSpacing: "-0.03em" }}
                >
                  {post.title}
                </h3>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6">
                  {authorGroup?.authorImage?.node?.sourceUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={authorGroup.authorImage.node.sourceUrl}
                      alt={authorGroup.authorName || "Author"}
                      className="w-[50] h-[50] rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/20 shrink-0" />
                  )}
                  <div>
                    <p
                      className="text-white font-medium leading-tight"
                      style={{ fontSize: "18px", letterSpacing: "-0.02em" }}
                    >
                      {authorGroup?.authorName ?? "Tamatos"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
