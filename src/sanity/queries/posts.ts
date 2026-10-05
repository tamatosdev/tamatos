import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  _updatedAt,
  excerpt,
  body,
  "categories": categories[]->{ title },
  mainImage {
    alt,
    asset->{ url }
  },
  author->{
    name,
    designation,
    bio,
    image {
      asset->{ url }
    },
    socialProfiles[] {
      name,
      url
    }
  },
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

export const postsQuery = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`);

export const recentPostsQuery = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$limit] {
    ${postFields}
  }
`);

export const postBySlugQuery = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
  }
`);
