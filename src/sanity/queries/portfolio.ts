import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  alt,
  "url": asset->url + "?auto=format&fit=max&w=1600&q=75"
`;

const portfolioFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  orderRank,
  tags,
  featuredImage { ${imageFields} },
  hoverImages[] { ${imageFields} },
  "services": services[]->{ _id, title, "slug": slug.current },
  "industries": industries[]->{ _id, title, "slug": slug.current }
`;

export const portfoliosQuery = defineQuery(/* groq */ `
  *[_type == "portfolio" && defined(slug.current)] | order(orderRank asc) {
    ${portfolioFields}
  }
`);

export const portfolioServiceTagsQuery = defineQuery(/* groq */ `
  *[_type == "portfolioServiceTag"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const portfolioIndustryTagsQuery = defineQuery(/* groq */ `
  *[_type == "portfolioIndustryTag"] | order(lower(title) == "others", title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);

export const portfolioBySlugQuery = defineQuery(/* groq */ `
  *[_type == "portfolio" && slug.current == $slug][0] {
    ${portfolioFields},
    body,
    gallery[] { ${imageFields} }
  }
`);

export const portfolioSlugsQuery = defineQuery(/* groq */ `
  *[_type == "portfolio" && defined(slug.current)]{ "slug": slug.current }
`);
