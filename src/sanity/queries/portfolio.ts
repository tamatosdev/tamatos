import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  alt,
  "url": asset->url
`;

const portfolioFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  order,
  tags,
  featuredImage { ${imageFields} },
  "services": services[]->{ _id, title, "slug": slug.current },
  "industries": industries[]->{ _id, title, "slug": slug.current }
`;

export const portfoliosQuery = defineQuery(/* groq */ `
  *[_type == "portfolio" && defined(slug.current)] | order(order asc, _createdAt desc) {
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
  *[_type == "portfolioIndustryTag"] | order(title asc) {
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
