import { defineArrayMember, defineField, defineType } from 'sanity'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

export const portfolioServiceTag = defineType({
  name: 'portfolioServiceTag',
  title: 'Portfolio Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export const portfolioIndustryTag = defineType({
  name: 'portfolioIndustryTag',
  title: 'Portfolio Industry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export const portfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  orderings: [orderRankOrdering],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    orderRankField({ type: 'portfolio' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'imageWithAlt',
      group: 'content',
      validation: (rule) => rule.required(),
      description: 'Default image on the work listing card',
    }),
    defineField({
      name: 'hoverImages',
      title: 'Hover slideshow images',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      description:
        'Extra images shown while hovering the work listing card. Plays as a slideshow after the featured image. Leave empty to keep a single static image.',
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Shown on the work listing card',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Tags shown on the work listing card (e.g. UX/UI Design, Web Development)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'portfolioServiceTag' }] }],
      description: 'Used for sidebar filtering on the work page',
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'portfolioIndustryTag' }] }],
      description: 'Used for sidebar filtering on the work page',
    }),
    defineField({
      name: 'body',
      title: 'Inner page content',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery images',
      type: 'array',
      group: 'content',
      of: [{ type: 'imageWithAlt' }],
      description: 'Additional images for the portfolio detail page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
      description: 'Meta title, meta description, Open Graph, Twitter, and JSON-LD schema',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
  },
})
