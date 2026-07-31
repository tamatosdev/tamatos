import type { Metadata } from "next";
import type { CmsImage } from "@/lib/home";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export type SeoSchemaSettings = {
  enabled?: boolean;
  type?: "organization" | "website" | "webPage" | "localBusiness" | "custom";
  name?: string;
  url?: string;
  description?: string;
  logo?: CmsImage;
  customJsonLd?: string;
};

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: CmsImage;
  ogType?: string;
  ogSiteName?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: CmsImage;
  twitterSite?: string;
  twitterCreator?: string;
  schema?: SeoSchemaSettings;
};

function resolveTitle(seo?: SeoData) {
  return seo?.metaTitle ?? `${SITE_NAME} — Design & Development Agency`;
}

function resolveDescription(seo?: SeoData) {
  return seo?.metaDescription ?? DEFAULT_DESCRIPTION;
}

function resolveOgTitle(seo?: SeoData) {
  return seo?.ogTitle ?? resolveTitle(seo);
}

function resolveOgDescription(seo?: SeoData) {
  return seo?.ogDescription ?? resolveDescription(seo);
}

function resolveOgImage(seo?: SeoData) {
  return seo?.ogImage?.url ?? seo?.twitterImage?.url;
}

function resolveTwitterTitle(seo?: SeoData) {
  return seo?.twitterTitle ?? resolveOgTitle(seo);
}

function resolveTwitterDescription(seo?: SeoData) {
  return seo?.twitterDescription ?? resolveOgDescription(seo);
}

function resolveTwitterImage(seo?: SeoData) {
  return seo?.twitterImage?.url ?? resolveOgImage(seo);
}

export function buildPageMetadata(seo?: SeoData): Metadata {
  const title = resolveTitle(seo);
  const description = resolveDescription(seo);
  const ogTitle = resolveOgTitle(seo);
  const ogDescription = resolveOgDescription(seo);
  const ogImageUrl = resolveOgImage(seo);
  const twitterTitle = resolveTwitterTitle(seo);
  const twitterDescription = resolveTwitterDescription(seo);
  const twitterImageUrl = resolveTwitterImage(seo);
  const canonical = seo?.canonicalUrl || SITE_URL;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: (seo?.ogType as "website" | "article") ?? "website",
      siteName: seo?.ogSiteName ?? SITE_NAME,
      url: canonical,
      images: ogImageUrl
        ? [{ url: ogImageUrl, alt: seo?.ogImage?.alt ?? seo?.twitterImage?.alt ?? title }]
        : undefined,
    },
    twitter: {
      card: seo?.twitterCard ?? "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
      site: seo?.twitterSite,
      creator: seo?.twitterCreator,
    },
  };
}

export function buildJsonLd(seo?: SeoData): Record<string, unknown> | null {
  const schema = seo?.schema;

  if (schema?.enabled === false) return null;

  if (schema?.type === "custom" && schema.customJsonLd?.trim()) {
    try {
      return JSON.parse(schema.customJsonLd) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  const name = schema?.name ?? SITE_NAME;
  const url = schema?.url ?? seo?.canonicalUrl ?? SITE_URL;
  const description = schema?.description ?? resolveDescription(seo);
  const logo = schema?.logo?.url;

  const base = {
    "@context": "https://schema.org",
    name,
    url,
    description,
    ...(logo ? { logo } : {}),
  };

  switch (schema?.type ?? "organization") {
    case "website":
      return { ...base, "@type": "WebSite" };
    case "webPage":
      return {
        ...base,
        "@type": "WebPage",
        name: schema?.name ?? resolveTitle(seo),
      };
    case "localBusiness":
      return { ...base, "@type": "LocalBusiness" };
    case "organization":
    default:
      return { ...base, "@type": "Organization" };
  }
}
