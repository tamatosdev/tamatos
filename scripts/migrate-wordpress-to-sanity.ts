/**
 * Migrates WordPress blog posts from tamatos.com GraphQL into Sanity.
 *
 * Required env (.env.local):
 *   SANITY_API_WRITE_TOKEN=...   (Editor token from sanity.io/manage)
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   NEXT_PUBLIC_SANITY_API_VERSION
 *
 * Usage: npm run migrate:wordpress
 */

import { createClient } from "@sanity/client";
import { Schema } from "@sanity/schema";
import { htmlToBlocks } from "@portabletext/block-tools";
import { JSDOM } from "jsdom";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { schemaTypes } from "../src/sanity/schemaTypes";

const WP_GRAPHQL_URL = "https://tamatos.com/graphql";
const SNAPSHOT_DIR = path.join(process.cwd(), "scripts", "data");

type WpPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  categories?: { nodes: { name: string; slug?: string }[] };
  featuredImage?: { node: { sourceUrl: string; altText?: string } };
  authorGroup?: {
    authorName?: string;
    authorImage?: { node: { sourceUrl?: string } };
  };
};

type WpPostsResponse = {
  data?: {
    posts?: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: WpPost[];
    };
  };
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "dqyqsbas";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error(
    "\nMissing SANITY_API_WRITE_TOKEN in .env.local\n" +
      "Create a token at https://www.sanity.io/manage → API → Tokens (Editor)\n"
  );
  process.exit(1);
}

const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const compiledSchema = Schema.compile({ types: schemaTypes });
const blockContentType = compiledSchema.get("blockContent");

if (!blockContentType || blockContentType.jsonType !== "array") {
  throw new Error("Could not compile blockContent schema type.");
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function htmlToPortableText(html: string) {
  if (!html?.trim()) return [];

  return htmlToBlocks(html, blockContentType, {
    parseHtml: (source) => new JSDOM(source).window.document,
  });
}

async function fetchAllWordPressPosts(): Promise<WpPost[]> {
  const posts: WpPost[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  const query = `
    query GetPosts($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          title
          slug
          date
          excerpt
          content
          categories { nodes { name slug } }
          featuredImage { node { sourceUrl altText } }
          authorGroup {
            authorName
            authorImage { node { sourceUrl } }
          }
        }
      }
    }
  `;

  while (hasNextPage) {
    const response = await fetch(WP_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { first: 50, after } }),
    });

    if (!response.ok) {
      throw new Error(`WordPress GraphQL failed: ${response.status} ${response.statusText}`);
    }

    const json = (await response.json()) as WpPostsResponse;
    const page = json.data?.posts;

    if (!page) {
      throw new Error("Unexpected WordPress GraphQL response.");
    }

    posts.push(...page.nodes);
    hasNextPage = page.pageInfo.hasNextPage;
    after = page.pageInfo.endCursor;
    console.log(`Fetched ${posts.length} posts so far...`);
  }

  return posts;
}

async function uploadImageFromUrl(
  url: string,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await sanity.assets.upload("image", buffer, { filename });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (error) {
    console.warn(`  ! Failed to upload image: ${url}`, error);
    return null;
  }
}

async function main() {
  console.log("Fetching WordPress posts...");
  const wpPosts = await fetchAllWordPressPosts();
  console.log(`Found ${wpPosts.length} WordPress posts.`);

  await mkdir(SNAPSHOT_DIR, { recursive: true });
  const snapshotPath = path.join(SNAPSHOT_DIR, "wordpress-posts.json");
  await writeFile(snapshotPath, JSON.stringify(wpPosts, null, 2), "utf8");
  console.log(`Snapshot saved to ${snapshotPath}`);

  const authorMap = new Map<string, string>();
  const categoryMap = new Map<string, string>();
  let createdAuthors = 0;
  let createdCategories = 0;
  let createdPosts = 0;
  let skippedPosts = 0;

  for (const post of wpPosts) {
    const authorName = post.authorGroup?.authorName?.trim() || "Tamatos";
    const authorSlug = slugify(authorName) || "tamatos";
    const authorId = `wp-author-${authorSlug}`;

    if (!authorMap.has(authorName)) {
      let authorImage;
      const authorImageUrl = post.authorGroup?.authorImage?.node?.sourceUrl;
      if (authorImageUrl) {
        authorImage = await uploadImageFromUrl(
          authorImageUrl,
          `author-${authorSlug}.jpg`
        );
      }

      await sanity.createOrReplace({
        _id: authorId,
        _type: "author",
        name: authorName,
        slug: { _type: "slug", current: authorSlug },
        ...(authorImage ? { image: authorImage } : {}),
      });

      authorMap.set(authorName, authorId);
      createdAuthors++;
      console.log(`Author: ${authorName}`);
    }

    for (const category of post.categories?.nodes ?? []) {
      const categorySlug = category.slug || slugify(category.name);
      const categoryId = `wp-category-${categorySlug}`;

      if (!categoryMap.has(categorySlug)) {
        await sanity.createOrReplace({
          _id: categoryId,
          _type: "category",
          title: category.name,
          slug: { _type: "slug", current: categorySlug },
        });
        categoryMap.set(categorySlug, categoryId);
        createdCategories++;
        console.log(`Category: ${category.name}`);
      }
    }
  }

  for (const post of wpPosts) {
    const postSlug = post.slug;
    const postId = `wp-post-${postSlug}`;
    const authorName = post.authorGroup?.authorName?.trim() || "Tamatos";
    const authorId = authorMap.get(authorName);

    let mainImage;
    const imageUrl = post.featuredImage?.node?.sourceUrl;
    if (imageUrl) {
      const uploaded = await uploadImageFromUrl(imageUrl, `post-${postSlug}.jpg`);
      if (uploaded) {
        mainImage = {
          ...uploaded,
          alt: post.featuredImage?.node?.altText || post.title,
        };
      }
    }

    const body = post.content ? htmlToPortableText(post.content) : [];
    const excerpt = post.excerpt ? stripHtml(post.excerpt) : undefined;

    const categoryRefs = (post.categories?.nodes ?? []).map((category) => {
      const categorySlug = category.slug || slugify(category.name);
      const categoryId = categoryMap.get(categorySlug);
      return categoryId
        ? { _type: "reference" as const, _ref: categoryId, _key: categorySlug }
        : null;
    }).filter(Boolean);

    if (!post.title || !postSlug) {
      skippedPosts++;
      console.warn(`Skipping post without title/slug: ${post.id}`);
      continue;
    }

    await sanity.createOrReplace({
      _id: postId,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: postSlug },
      publishedAt: post.date,
      ...(excerpt ? { excerpt } : {}),
      ...(body.length ? { body } : {}),
      ...(authorId ? { author: { _type: "reference", _ref: authorId } } : {}),
      ...(categoryRefs.length ? { categories: categoryRefs } : {}),
      ...(mainImage ? { mainImage } : {}),
    });

    createdPosts++;
    console.log(`Post: ${post.title}`);
  }

  console.log("\nMigration complete.");
  console.log(`Authors created/updated: ${createdAuthors}`);
  console.log(`Categories created/updated: ${createdCategories}`);
  console.log(`Posts created/updated: ${createdPosts}`);
  console.log(`Posts skipped: ${skippedPosts}`);
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
