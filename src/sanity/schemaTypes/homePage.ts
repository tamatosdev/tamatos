import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: '1. Hero / Banner' },
    { name: 'aboutStrip', title: '2. About Strip' },
    { name: 'logoMarquee', title: '3. Logo Marquee' },
    { name: 'agencyStatement', title: '4. Agency Statement' },
    { name: 'cta1', title: '5. CTA Card' },
    { name: 'stats', title: '6. Stats' },
    { name: 'services', title: '7. Services' },
    { name: 'compare', title: '8. Compare Strip' },
    { name: 'scrollReveal', title: '9. Scroll Reveal' },
    { name: 'caseStudies', title: '10. Case Studies' },
    { name: 'team', title: '11. Team Orbit' },
    { name: 'awards', title: '12. Awards' },
    { name: 'reviews', title: '13. Reviews' },
    { name: 'industries', title: '14. Industries' },
    { name: 'blog', title: '15. Blog Preview' },
    { name: 'cta2', title: '16. Final CTA' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero / Banner',
      type: 'heroSection',
      group: 'hero',
    }),
    defineField({
      name: 'aboutStrip',
      title: 'About Strip',
      type: 'aboutStripSection',
      group: 'aboutStrip',
    }),
    defineField({
      name: 'logoMarquee',
      title: 'Logo Marquee',
      type: 'logoMarqueeSection',
      group: 'logoMarquee',
    }),
    defineField({
      name: 'agencyStatement',
      title: 'Agency Statement',
      type: 'agencyStatementSection',
      group: 'agencyStatement',
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Card',
      type: 'ctaCardSection',
      group: 'cta1',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'statsSection',
      group: 'stats',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'servicesSection',
      group: 'services',
    }),
    defineField({
      name: 'compareStrip',
      title: 'Compare Strip',
      type: 'compareStripSection',
      group: 'compare',
    }),
    defineField({
      name: 'scrollReveal',
      title: 'Scroll Text Reveal',
      type: 'scrollRevealSection',
      group: 'scrollReveal',
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'caseStudiesSection',
      group: 'caseStudies',
    }),
    defineField({
      name: 'team',
      title: 'Team Orbit',
      type: 'teamSection',
      group: 'team',
    }),
    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'awardsSection',
      group: 'awards',
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'reviewsSection',
      group: 'reviews',
    }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'industriesSection',
      group: 'industries',
    }),
    defineField({
      name: 'blogSection',
      title: 'Blog Preview',
      type: 'homeBlogSection',
      group: 'blog',
    }),
    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'finalCtaSection',
      group: 'cta2',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
