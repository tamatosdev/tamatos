import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
