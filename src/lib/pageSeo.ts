import { defineQuery } from "next-sanity";
import { sanityClient } from "@/sanity/lib/client";
import type { SeoData } from "@/lib/seo";

export type SeoPageId =
  | "aboutPage"
  | "workPage"
  | "blogPage"
  | "digitalPage"
  | "designPage"
  | "developmentPage"
  | "homePage"
  | "contactPage";

const seoFieldsProjection = /* groq */ `
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    ogTitle,
    ogDescription,
    ogImage {
      alt,
      "url": asset->url + "?auto=format&fit=max&w=1200&q=75"
    },
    ogType,
    ogSiteName,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage {
      alt,
      "url": asset->url + "?auto=format&fit=max&w=1200&q=75"
    },
    twitterSite,
    twitterCreator,
    schema {
      enabled,
      type,
      name,
      url,
      description,
      logo {
        alt,
        "url": asset->url + "?auto=format&fit=max&w=512&q=75"
      },
      customJsonLd
    }
  }
`;

const seoPageByIdQuery = defineQuery(/* groq */ `
  *[_id == $id][0] {
    ${seoFieldsProjection}
  }
`);

export async function getPageSeo(id: SeoPageId): Promise<SeoData | undefined> {
  try {
    const doc = await sanityClient.fetch<{ seo?: SeoData } | null>(seoPageByIdQuery, {
      id,
    });
    return doc?.seo;
  } catch (error) {
    console.error(`Failed to fetch SEO for ${id}:`, error);
    return undefined;
  }
}
