import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

const client = new GraphQLClient("https://tamatos.com/graphql");

const query = gql`
  {
    posts(first: 3) {
      nodes {
        id
        title
        slug
        date
        content
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
  content?: string;
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
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${day}${suffix} ${month} ${year}`;
}

function getReadingTime(html: string) {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${String(mins).padStart(2, "0")} Mins Read`;
}

export default async function BlogSection() {
  const posts = await getPosts();

  if (!posts.length) return null;

  return (
    <section className="container py-32 md:py-24"> 
      {/* Heading row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-8 md:mb-12">
        <h2
          className="text-white font-medium leading-[1.1]"
          style={{ fontSize: "clamp(28px, 4.5vw, 64px)", letterSpacing: "-0.05em" }}
        >
          Latest from<br />the Blog
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
          const readingTime = post.content ? getReadingTime(post.content) : "03 Mins Read";

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-[20px] overflow-hidden transition-transform duration-300"
       
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-[20px]" style={{ height: "300px" }}>
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
              <div className="flex flex-col gap-3 p-5 flex-1">
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
                  style={{ fontSize: "clamp(24px, 1.3vw, 18px)", letterSpacing: "-0.03em" }}
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
