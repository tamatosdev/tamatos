import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { getPortfolioSlugs } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/site";

// Rebuild hourly so new Sanity posts and projects show up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, portfolioSlugs] = await Promise.all([getPosts(), getPortfolioSlugs()]);
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
  { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  { url: `${SITE_URL}/work`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/services/development`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services/digital`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/services/design`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioSlugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...portfolioRoutes];
}
