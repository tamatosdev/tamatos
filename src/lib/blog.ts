import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "@/sanity/lib/client";
import {
  postBySlugQuery,
  postsQuery,
  recentPostsQuery,
} from "@/sanity/queries/posts";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  contentText?: string;
  body?: PortableTextBlock[];
  categories?: { nodes: { name: string }[] };
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  authorGroup?: {
    authorName?: string;
    authorImage?: { node: { sourceUrl: string } };
  };
};

type SanityPost = {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  categories?: { title: string }[];
  mainImage?: { alt?: string; asset?: { url?: string } };
  author?: {
    name?: string;
    image?: { asset?: { url?: string } };
  };
};

function portableTextToPlainText(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return "";

  return blocks
    .map((block) => {
      if (block._type !== "block" || !("children" in block) || !Array.isArray(block.children)) {
        return "";
      }

      return block.children
        .map((child) => ("text" in child && typeof child.text === "string" ? child.text : ""))
        .join("");
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapSanityPost(post: SanityPost): BlogPost {
  const contentText = portableTextToPlainText(post.body);

  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    date: post.publishedAt ?? new Date().toISOString(),
    excerpt: post.excerpt,
    contentText,
    body: post.body,
    categories: post.categories?.length
      ? { nodes: post.categories.map((category) => ({ name: category.title })) }
      : undefined,
    featuredImage: post.mainImage?.asset?.url
      ? {
          node: {
            sourceUrl: post.mainImage.asset.url,
            altText: post.mainImage.alt || post.title,
          },
        }
      : undefined,
    authorGroup: post.author
      ? {
          authorName: post.author.name,
          authorImage: post.author.image?.asset?.url
            ? { node: { sourceUrl: post.author.image.asset.url } }
            : undefined,
        }
      : undefined,
  };
}

export async function getPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const posts = limit
      ? await sanityClient.fetch<SanityPost[]>(recentPostsQuery, { limit })
      : await sanityClient.fetch<SanityPost[]>(postsQuery);

    return (posts ?? []).map(mapSanityPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await sanityClient.fetch<SanityPost | null>(postBySlugQuery, { slug });
    return post ? mapSanityPost(post) : null;
  } catch {
    return null;
  }
}

export async function getNextPost(currentSlug: string): Promise<BlogPost | null> {
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.slug === currentSlug);
  return posts[index + 1] ?? posts[0] ?? null;
}

export function formatDate(dateStr: string) {
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

export function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${String(mins).padStart(2, "0")} Mins Read`;
}

export function getExcerpt(text: string, maxLen = 200) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized.length > maxLen ? normalized.slice(0, maxLen).trimEnd() + "…" : normalized;
}

export function getPostReadingTime(post: BlogPost) {
  const text = post.contentText || post.excerpt || "";
  return text ? getReadingTime(text) : "03 Mins Read";
}

export function getPostExcerpt(post: BlogPost, maxLen = 200) {
  if (post.excerpt) return getExcerpt(post.excerpt, maxLen);
  if (post.contentText) return getExcerpt(post.contentText, maxLen);
  return "";
}
