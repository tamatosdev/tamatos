import { defineArrayMember, defineField, defineType } from 'sanity'

export const heroDesktopPill = defineType({
  name: 'heroDesktopPill',
  title: 'Desktop pill',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'top', title: 'Top position', type: 'string', description: 'e.g. 6%' }),
    defineField({ name: 'left', title: 'Left position', type: 'string', description: 'For left-side pills' }),
    defineField({ name: 'right', title: 'Right position', type: 'string', description: 'For right-side pills' }),
    defineField({
      name: 'insetNarrow',
      title: 'Narrow viewport inset',
      type: 'string',
      description: 'Horizontal inset at ≤1600px (e.g. 2.5rem)',
    }),
  ],
  preview: { select: { title: 'label' } },
})

export const heroMobilePill = defineType({
  name: 'heroMobilePill',
  title: 'Mobile pill',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'top', title: 'Top', type: 'string' }),
    defineField({ name: 'bottom', title: 'Bottom', type: 'string' }),
    defineField({ name: 'left', title: 'Left', type: 'string' }),
    defineField({ name: 'right', title: 'Right', type: 'string' }),
  ],
  preview: { select: { title: 'label' } },
})

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero / Banner',
  type: 'object',
  fields: [
    defineField({
      name: 'line1BeforeBold',
      title: 'Headline line 1 (before bold)',
      type: 'string',
      initialValue: 'We Turn',
    }),
    defineField({
      name: 'boldWord',
      title: 'Bold highlighted word',
      type: 'string',
      initialValue: 'BOLD',
    }),
    defineField({
      name: 'line1AfterBold',
      title: 'Headline line 1 (after bold)',
      type: 'string',
      initialValue: 'Ideas Into Digital',
    }),
    defineField({
      name: 'line2Word',
      title: 'Headline line 2',
      type: 'string',
      initialValue: 'Experiences',
    }),
    defineField({
      name: 'line2ItalicWord',
      title: 'Headline line 2 (italic)',
      type: 'string',
      initialValue: 'Businesses',
    }),
    defineField({
      name: 'line3',
      title: 'Headline line 3',
      type: 'string',
      initialValue: 'Grow With.',
    }),
    defineField({
      name: 'boldHighlightColor',
      title: 'Bold word background color',
      type: 'string',
      initialValue: '#E8601C',
    }),
    defineField({
      name: 'leftPills',
      title: 'Left floating pills (desktop)',
      type: 'array',
      of: [defineArrayMember({ type: 'heroDesktopPill' })],
    }),
    defineField({
      name: 'rightPills',
      title: 'Right floating pills (desktop)',
      type: 'array',
      of: [defineArrayMember({ type: 'heroDesktopPill' })],
    }),
    defineField({
      name: 'mobilePills',
      title: 'Mobile floating pills',
      type: 'array',
      of: [defineArrayMember({ type: 'heroMobilePill' })],
    }),
    defineField({
      name: 'cta',
      title: 'CTA button',
      type: 'link',
    }),
  ],
})

export const aboutStripSection = defineType({
  name: 'aboutStripSection',
  title: 'About Strip',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon image',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'scrollLabel',
      title: 'Scroll label',
      type: 'string',
      initialValue: 'Scroll Down',
    }),
  ],
})

export const logoMarqueeSection = defineType({
  name: 'logoMarqueeSection',
  title: 'Logo Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'marqueeLogo',
          fields: [
            defineField({ name: 'image', title: 'Logo', type: 'imageWithAlt', validation: (r) => r.required() }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        }),
      ],
    }),
  ],
})

export const agencyStatementSection = defineType({
  name: 'agencyStatementSection',
  title: 'Agency Statement',
  type: 'object',
  fields: [
    defineField({
      name: 'mainText',
      title: 'Main text',
      type: 'text',
      rows: 3,
      description: 'Primary white text before the dimmed section',
    }),
    defineField({
      name: 'dimText',
      title: 'Dimmed text',
      type: 'text',
      rows: 3,
      description: 'Secondary text shown at lower opacity',
    }),
    defineField({
      name: 'inlineImage',
      title: 'Inline decorative image',
      type: 'imageWithAlt',
      description: 'Small image shown inside the statement text',
    }),
  ],
})

export const personCard = defineType({
  name: 'personCard',
  title: 'Person',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / designation', type: 'string' }),
    defineField({ name: 'image', title: 'Photo', type: 'imageWithAlt' }),
  ],
})

export const ctaCardSection = defineType({
  name: 'ctaCardSection',
  title: 'CTA Card',
  type: 'object',
  fields: [
    defineField({ name: 'person', title: 'Person', type: 'personCard' }),
    defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'button', title: 'Button', type: 'link' }),
  ],
})

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'title' },
  },
})

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats / Numbers',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({ type: 'statItem' })],
      validation: (rule) => rule.max(3),
    }),
  ],
})

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'Link URL', type: 'string', initialValue: '/services' }),
  ],
})

export const serviceCategory = defineType({
  name: 'serviceCategory',
  title: 'Service category',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Category title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'backgroundColor',
      title: 'Card background color',
      type: 'string',
      initialValue: '#FFFFFF1A',
    }),
    defineField({
      name: 'hoverColor',
      title: 'Hover color',
      type: 'string',
      description: 'Hex color used on hover (e.g. #9DF560)',
    }),
    defineField({
      name: 'items',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceItem' })],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services',
  type: 'object',
  fields: [
    defineField({ name: 'titleLine1', title: 'Title line 1', type: 'string', initialValue: 'Design & Development' }),
    defineField({ name: 'titleEmphasis', title: 'Title emphasis (italic)', type: 'string', initialValue: 'Services' }),
    defineField({ name: 'titleLine2', title: 'Title line 2', type: 'string', initialValue: 'We Offer' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'serviceCategory' })],
    }),
  ],
})

export const compareStripSection = defineType({
  name: 'compareStripSection',
  title: 'Compare Strip',
  type: 'object',
  fields: [
    defineField({ name: 'leftText', title: 'Left text', type: 'string' }),
    defineField({ name: 'rightText', title: 'Right text', type: 'string' }),
  ],
})

export const scrollRevealHighlight = defineType({
  name: 'scrollRevealHighlight',
  title: 'Highlight',
  type: 'object',
  fields: [
    defineField({ name: 'word', title: 'Word to highlight', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'color', title: 'Color', type: 'string', initialValue: '#9DF560' }),
  ],
  preview: { select: { title: 'word', subtitle: 'color' } },
})

export const scrollRevealSection = defineType({
  name: 'scrollRevealSection',
  title: 'Scroll Text Reveal',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
    defineField({
      name: 'highlights',
      title: 'Highlighted words',
      type: 'array',
      of: [defineArrayMember({ type: 'scrollRevealHighlight' })],
    }),
  ],
})

export const caseStudyPill = defineType({
  name: 'caseStudyPill',
  title: 'Case study pill',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'flag', title: 'Flag image', type: 'imageWithAlt' }),
  ],
  preview: {
    select: { title: 'label', media: 'flag' },
  },
})

export const caseStudyItem = defineType({
  name: 'caseStudyItem',
  title: 'Case study',
  type: 'object',
  fields: [
    defineField({
      name: 'pills',
      title: 'Tags / pills',
      type: 'array',
      of: [defineArrayMember({ type: 'caseStudyPill' })],
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 3 }),
    defineField({
      name: 'paragraphs',
      title: 'Body paragraphs',
      type: 'array',
      of: [defineArrayMember({ type: 'text' })],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'designation', title: 'Designation', type: 'string' }),
        defineField({ name: 'image', title: 'Photo', type: 'imageWithAlt' }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Project images',
      type: 'array',
      of: [defineArrayMember({ type: 'imageWithAlt' })],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'images.0' },
  },
})

export const caseStudiesSection = defineType({
  name: 'caseStudiesSection',
  title: 'Case Studies',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Case studies',
      type: 'array',
      of: [defineArrayMember({ type: 'caseStudyItem' })],
    }),
  ],
})

export const teamMemberOrbit = defineType({
  name: 'teamMemberOrbit',
  title: 'Team member (orbit)',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Photo', type: 'imageWithAlt', validation: (r) => r.required() }),
    defineField({ name: 'orbit', title: 'Orbit ring (1–2)', type: 'number', initialValue: 1 }),
    defineField({ name: 'baseAngle', title: 'Base angle', type: 'number' }),
    defineField({ name: 'size', title: 'Avatar size (px)', type: 'number' }),
  ],
  preview: {
    select: { media: 'image' },
  },
})

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team / Orbit',
  type: 'object',
  fields: [
    defineField({ name: 'headingLine1', title: 'Heading line 1', type: 'string', initialValue: 'Digital Design Experts' }),
    defineField({ name: 'headingAccent', title: 'Heading accent (italic)', type: 'string', initialValue: 'Fuel Growth.' }),
    defineField({ name: 'column1Text', title: 'Column 1 text', type: 'text', rows: 2 }),
    defineField({ name: 'column2Text', title: 'Column 2 text', type: 'text', rows: 2 }),
    defineField({
      name: 'members',
      title: 'Team members',
      type: 'array',
      of: [defineArrayMember({ type: 'teamMemberOrbit' })],
    }),
  ],
})

export const awardItem = defineType({
  name: 'awardItem',
  title: 'Award',
  type: 'object',
  fields: [
    defineField({ name: 'image', title: 'Badge image', type: 'imageWithAlt', validation: (r) => r.required() }),
    defineField({ name: 'yearLabel', title: 'Year label', type: 'string', initialValue: 'Clutch 2026' }),
    defineField({ name: 'title', title: 'Award title', type: 'string', validation: (r) => r.required(), description: 'e.g. Top Web Developers' }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})

export const awardsSection = defineType({
  name: 'awardsSection',
  title: 'Awards',
  type: 'object',
  fields: [
    defineField({ name: 'headingMain', title: 'Heading (main)', type: 'string', initialValue: 'Not just' }),
    defineField({ name: 'headingEmphasis', title: 'Heading (italic)', type: 'string', initialValue: 'Trusted.' }),
    defineField({ name: 'headingEnd', title: 'Heading (end)', type: 'string', initialValue: 'Officially recognized.' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Awards',
      type: 'array',
      of: [defineArrayMember({ type: 'awardItem' })],
      validation: (rule) => rule.max(4),
    }),
  ],
})

export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'logo', title: 'Company logo', type: 'imageWithAlt' }),
    defineField({
      name: 'content',
      title: 'Quote',
      type: 'blockContent',
      description: 'Use italic emphasis for highlighted phrases in the quote',
    }),
    defineField({ name: 'author', title: 'Author name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Author role', type: 'string' }),
    defineField({ name: 'photo', title: 'Author photo', type: 'imageWithAlt' }),
    defineField({
      name: 'backgroundColor',
      title: 'Card background color',
      type: 'string',
      description: 'Hex color (e.g. #9DF560)',
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'role', media: 'logo' },
  },
})

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Reviews / Testimonials',
  type: 'object',
  fields: [
    defineField({ name: 'headingStart', title: 'Heading start', type: 'string', initialValue: 'Verified' }),
    defineField({ name: 'headingHighlight', title: 'Heading highlight', type: 'string', initialValue: 'reviews' }),
    defineField({ name: 'headingMiddle', title: 'Heading middle', type: 'string', initialValue: 'From' }),
    defineField({ name: 'headingItalic', title: 'Heading italic text', type: 'string', initialValue: 'Real Clients' }),
    defineField({ name: 'headingLine2', title: 'Heading line 2', type: 'string', initialValue: 'That Hold us Accountable' }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'testimonialItem' })],
    }),
  ],
})

export const industryItem = defineType({
  name: 'industryItem',
  title: 'Industry',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})

export const industriesSection = defineType({
  name: 'industriesSection',
  title: 'Industries',
  type: 'object',
  fields: [
    defineField({ name: 'headingBefore', title: 'Heading before emphasis', type: 'string', initialValue: "We've" }),
    defineField({ name: 'headingEmphasis', title: 'Heading emphasis (italic)', type: 'string', initialValue: 'Shipped' }),
    defineField({
      name: 'headingAfter',
      title: 'Heading after emphasis',
      type: 'string',
      initialValue: "for Industries that Don't Forgive Average",
    }),
    defineField({ name: 'image', title: 'Section image', type: 'imageWithAlt' }),
    defineField({
      name: 'items',
      title: 'Industries',
      type: 'array',
      of: [defineArrayMember({ type: 'industryItem' })],
    }),
  ],
})

export const homeBlogSection = defineType({
  name: 'homeBlogSection',
  title: 'Home Blog Section',
  type: 'object',
  fields: [
    defineField({ name: 'headingBefore', title: 'Heading start', type: 'string', initialValue: 'Get Real' }),
    defineField({ name: 'headingEmphasis', title: 'Heading emphasis (italic)', type: 'string' }),
    defineField({
      name: 'headingAfter',
      title: 'Heading end',
      type: 'string',
      initialValue: 'and Proven Tactics For Digital Success',
    }),
    defineField({ name: 'button', title: 'Read more button', type: 'link' }),
    defineField({
      name: 'postsLimit',
      title: 'Number of posts to show',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
})

export const finalCtaSection = defineType({
  name: 'finalCtaSection',
  title: 'Final CTA',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'primaryButton', title: 'Primary button', type: 'link' }),
    defineField({ name: 'secondaryButton', title: 'Secondary button', type: 'link' }),
  ],
})

export const seoSchemaSettings = defineType({
  name: 'seoSchemaSettings',
  title: 'Structured data',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable JSON-LD schema',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'type',
      title: 'Schema type',
      type: 'string',
      options: {
        list: [
          { title: 'Organization', value: 'organization' },
          { title: 'WebSite', value: 'website' },
          { title: 'WebPage', value: 'webPage' },
          { title: 'Local Business', value: 'localBusiness' },
          { title: 'Custom JSON-LD', value: 'custom' },
        ],
        layout: 'radio',
      },
      initialValue: 'organization',
    }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Canonical site or page URL used in schema',
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'imageWithAlt' }),
    defineField({
      name: 'customJsonLd',
      title: 'Custom JSON-LD',
      type: 'text',
      rows: 14,
      description: 'Paste valid JSON-LD. Used when schema type is Custom JSON-LD.',
    }),
  ],
})

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  groups: [
    { name: 'basic', title: 'Basic', default: true },
    { name: 'openGraph', title: 'Open Graph' },
    { name: 'twitter', title: 'Twitter' },
    { name: 'schema', title: 'Schema' },
  ],
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'basic',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'basic',
    }),
    defineField({
      name: 'ogTitle',
      title: 'OG title',
      type: 'string',
      description: 'Falls back to meta title if empty',
      group: 'openGraph',
    }),
    defineField({
      name: 'ogDescription',
      title: 'OG description',
      type: 'text',
      rows: 3,
      description: 'Falls back to meta description if empty',
      group: 'openGraph',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG image',
      type: 'imageWithAlt',
      group: 'openGraph',
    }),
    defineField({
      name: 'ogType',
      title: 'OG type',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Article', value: 'article' },
        ],
      },
      initialValue: 'website',
      group: 'openGraph',
    }),
    defineField({
      name: 'ogSiteName',
      title: 'OG site name',
      type: 'string',
      group: 'openGraph',
    }),
    defineField({
      name: 'twitterCard',
      title: 'Twitter card type',
      type: 'string',
      options: {
        list: [
          { title: 'Summary', value: 'summary' },
          { title: 'Summary Large Image', value: 'summary_large_image' },
          { title: 'App', value: 'app' },
          { title: 'Player', value: 'player' },
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
      group: 'twitter',
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter title',
      type: 'string',
      description: 'Falls back to OG title, then meta title',
      group: 'twitter',
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter description',
      type: 'text',
      rows: 3,
      description: 'Falls back to OG description, then meta description',
      group: 'twitter',
    }),
    defineField({
      name: 'twitterImage',
      title: 'Twitter image',
      type: 'imageWithAlt',
      description: 'Falls back to OG image if empty',
      group: 'twitter',
    }),
    defineField({
      name: 'twitterSite',
      title: 'Twitter site handle',
      type: 'string',
      description: 'e.g. @tamatos',
      group: 'twitter',
    }),
    defineField({
      name: 'twitterCreator',
      title: 'Twitter creator handle',
      type: 'string',
      description: 'e.g. @tamatos',
      group: 'twitter',
    }),
    defineField({
      name: 'schema',
      title: 'Schema / JSON-LD',
      type: 'seoSchemaSettings',
      group: 'schema',
    }),
  ],
})
