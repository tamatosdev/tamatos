import { post } from './post'
import { author } from './author'
import { category } from './category'
import { tag } from './tag'
import { blockContent } from './blockContent'
import { link } from './objects/link'
import { imageWithAlt } from './objects/imageWithAlt'
import { homePage } from './homePage'
import { portfolio, portfolioServiceTag, portfolioIndustryTag } from './portfolio'
import {
  heroDesktopPill,
  heroMobilePill,
  heroSection,
  aboutStripSection,
  logoMarqueeSection,
  agencyStatementSection,
  personCard,
  ctaCardSection,
  statItem,
  statsSection,
  serviceItem,
  serviceCategory,
  servicesSection,
  compareStripSection,
  scrollRevealHighlight,
  scrollRevealSection,
  caseStudyPill,
  caseStudyItem,
  caseStudiesSection,
  teamMemberOrbit,
  teamSection,
  awardItem,
  awardsSection,
  testimonialItem,
  reviewsSection,
  industryItem,
  industriesSection,
  homeBlogSection,
  finalCtaSection,
  seoSchemaSettings,
  seoFields,
} from './home/sections'

export const schemaTypes = [
  // Shared objects
  blockContent,
  link,
  imageWithAlt,

  // Home page sections
  heroDesktopPill,
  heroMobilePill,
  heroSection,
  aboutStripSection,
  logoMarqueeSection,
  agencyStatementSection,
  personCard,
  ctaCardSection,
  statItem,
  statsSection,
  serviceItem,
  serviceCategory,
  servicesSection,
  compareStripSection,
  scrollRevealHighlight,
  scrollRevealSection,
  caseStudyPill,
  caseStudyItem,
  caseStudiesSection,
  teamMemberOrbit,
  teamSection,
  awardItem,
  awardsSection,
  testimonialItem,
  reviewsSection,
  industryItem,
  industriesSection,
  homeBlogSection,
  finalCtaSection,
  seoSchemaSettings,
  seoFields,

  // Documents
  homePage,
  portfolio,
  portfolioServiceTag,
  portfolioIndustryTag,
  post,
  author,
  category,
  tag,
]
