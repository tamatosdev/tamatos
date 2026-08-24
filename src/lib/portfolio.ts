import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "@/sanity/lib/client";
import {
  portfolioBySlugQuery,
  portfolioIndustryTagsQuery,
  portfolioServiceTagsQuery,
  portfolioSlugsQuery,
  portfoliosQuery,
} from "@/sanity/queries/portfolio";

export type PortfolioTag = {
  _id: string;
  title: string;
  slug: string;
};

export type PortfolioImage = {
  url?: string;
  alt?: string;
};

export type PortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  orderRank?: string;
  tags?: string[];
  featuredImage?: PortfolioImage;
  hoverImages?: PortfolioImage[];
  services?: PortfolioTag[];
  industries?: PortfolioTag[];
};

/** Featured image first, then hover slideshow images (deduped by URL). */
export function getPortfolioCardImages(item: PortfolioItem): PortfolioImage[] {
  const images: PortfolioImage[] = [];
  const seen = new Set<string>();

  for (const image of [item.featuredImage, ...(item.hoverImages ?? [])]) {
    const url = image?.url?.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    images.push({ url, alt: image?.alt });
  }

  return images;
}

export type PortfolioDetail = PortfolioItem & {
  body?: PortableTextBlock[];
  gallery?: PortfolioImage[];
};

export async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    return await sanityClient.fetch<PortfolioItem[]>(portfoliosQuery);
  } catch (error) {
    console.error("Failed to fetch portfolios:", error);
    return [];
  }
}

export async function getPortfolioServiceTags(): Promise<PortfolioTag[]> {
  try {
    return await sanityClient.fetch<PortfolioTag[]>(portfolioServiceTagsQuery);
  } catch (error) {
    console.error("Failed to fetch portfolio service tags:", error);
    return [];
  }
}

export async function getPortfolioIndustryTags(): Promise<PortfolioTag[]> {
  try {
    return await sanityClient.fetch<PortfolioTag[]>(portfolioIndustryTagsQuery);
  } catch (error) {
    console.error("Failed to fetch portfolio industry tags:", error);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioDetail | null> {
  try {
    return await sanityClient.fetch<PortfolioDetail | null>(portfolioBySlugQuery, { slug });
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return null;
  }
}

export async function getPortfolioSlugs(): Promise<string[]> {
  try {
    const rows = await sanityClient.fetch<{ slug: string }[]>(portfolioSlugsQuery);
    return rows.map((row) => row.slug).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch portfolio slugs:", error);
    return [];
  }
}

export function filterPortfolios(
  items: PortfolioItem[],
  serviceSlug: string | null,
  industrySlug: string | null
): PortfolioItem[] {
  return items.filter((item) => {
    const serviceMatch =
      !serviceSlug || item.services?.some((tag) => tag.slug === serviceSlug);
    const industryMatch =
      !industrySlug || item.industries?.some((tag) => tag.slug === industrySlug);
    return serviceMatch && industryMatch;
  });
}

export function getPortfolioCardTags(item: PortfolioItem): string[] {
  if (item.tags?.length) {
    return item.tags.map((tag) => tag.trim()).filter(Boolean);
  }

  const legacy = [
    ...(item.services?.map((t) => t.title) ?? []),
    ...(item.industries?.map((t) => t.title) ?? []),
  ];
  return [...new Set(legacy)];
}
