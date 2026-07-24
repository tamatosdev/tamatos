import { defineQuery } from "next-sanity";

const postFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body,
  "categories": categories[]->{ title },
  mainImage {
    alt,
    asset->{ url }
  },
  author->{
    name,
    image {
      asset->{ url }
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
