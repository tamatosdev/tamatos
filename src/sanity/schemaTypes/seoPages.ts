import { defineField, defineType } from "sanity";
import type { ComponentType } from "react";

type SeoPageOptions = {
  name: string;
  title: string;
  icon?: ComponentType;
  description?: string;
};

/** Lightweight singleton page docs used only for SEO / schema controls in Studio. */
export function createSeoPageType({
  name,
  title,
  icon,
  description,
}: SeoPageOptions) {
  return defineType({
    name,
    title,
    type: "document",
    icon,
    description,
    groups: [{ name: "seo", title: "SEO", default: true }],
    fields: [
      defineField({
        name: "title",
        title: "Internal label",
        type: "string",
        initialValue: title,
        hidden: true,
      }),
      defineField({
        name: "seo",
        title: "SEO",
        type: "seoFields",
        group: "seo",
      }),
    ],
    preview: {
      prepare: () => ({ title }),
    },
  });
}

export const aboutPage = createSeoPageType({
  name: "aboutPage",
  title: "About Page",
  description: "SEO settings for /about",
});

export const workPage = createSeoPageType({
  name: "workPage",
  title: "Work Page",
  description: "SEO settings for /work",
});

export const blogPage = createSeoPageType({
  name: "blogPage",
  title: "Blog Page",
  description: "SEO settings for /blog",
});

export const digitalPage = createSeoPageType({
  name: "digitalPage",
  title: "Digital Services Page",
  description: "SEO settings for /services/digital",
});

export const designPage = createSeoPageType({
  name: "designPage",
  title: "Design Services Page",
  description: "SEO settings for /services/design",
});

export const developmentPage = createSeoPageType({
  name: "developmentPage",
  title: "Development Services Page",
  description: "SEO settings for /services/development",
});
