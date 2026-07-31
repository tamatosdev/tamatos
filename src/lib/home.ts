import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/queries/home";

export type CmsImage = {
  url?: string;
  alt?: string;
};

export type CmsLink = {
  label?: string;
  href?: string;
};

export type HeroDesktopPill = {
  label: string;
  top?: string;
  left?: string;
  right?: string;
  insetNarrow?: string;
};

export type HeroMobilePill = {
  label: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

export type HeroData = {
  line1BeforeBold?: string;
  boldWord?: string;
  line1AfterBold?: string;
  line2Word?: string;
  line2ItalicWord?: string;
  line3?: string;
  boldHighlightColor?: string;
  leftPills?: HeroDesktopPill[];
  rightPills?: HeroDesktopPill[];
  mobilePills?: HeroMobilePill[];
  cta?: CmsLink;
};

export type AboutStripData = {
  icon?: CmsImage;
  text?: string;
  scrollLabel?: string;
};

export type LogoMarqueeData = {
  logos?: { name?: string; image?: CmsImage }[];
};

export type AgencyStatementData = {
  mainText?: string;
  dimText?: string;
  inlineImage?: CmsImage;
};

export type CtaCardData = {
  person?: { name?: string; role?: string; image?: CmsImage };
  heading?: string;
  description?: string;
  button?: CmsLink;
};

export type StatItem = {
  value?: string;
  title?: string;
  description?: string;
};

export type ServiceCategory = {
  title?: string;
  backgroundColor?: string;
  hoverColor?: string;
  items?: { label?: string; href?: string }[];
};

export type ServicesData = {
  titleLine1?: string;
  titleEmphasis?: string;
  titleLine2?: string;
  categories?: ServiceCategory[];
};

export type CompareStripData = {
  leftText?: string;
  rightText?: string;
};

export type ScrollRevealData = {
  text?: string;
  highlights?: { word?: string; color?: string }[];
};

export type CaseStudyData = {
  pills?: { label?: string; flag?: CmsImage }[];
  heading?: string;
  paragraphs?: string[];
  author?: { name?: string; designation?: string; image?: CmsImage };
  images?: CmsImage[];
};

export type TeamMemberData = {
  orbit?: number;
  baseAngle?: number;
  size?: number;
  image?: CmsImage;
};

export type TeamData = {
  headingLine1?: string;
  headingAccent?: string;
  column1Text?: string;
  column2Text?: string;
  members?: TeamMemberData[];
};

export type AwardItem = {
  yearLabel?: string;
  title?: string;
  image?: CmsImage;
};

export type AwardsData = {
  headingMain?: string;
  headingEmphasis?: string;
  headingEnd?: string;
  subheading?: string;
  items?: AwardItem[];
};

export type TestimonialItem = {
  logo?: CmsImage;
  content?: PortableTextBlock[];
  author?: string;
  role?: string;
  photo?: CmsImage;
  backgroundColor?: string;
};

export type ReviewsData = {
  headingStart?: string;
  headingHighlight?: string;
  headingMiddle?: string;
  headingItalic?: string;
  headingLine2?: string;
  items?: TestimonialItem[];
};

export type IndustryItem = {
  title?: string;
  tags?: string[];
};

export type IndustriesData = {
  headingBefore?: string;
  headingEmphasis?: string;
  headingAfter?: string;
  image?: CmsImage;
  items?: IndustryItem[];
};

export type HomeBlogData = {
  headingBefore?: string;
  headingEmphasis?: string;
  headingAfter?: string;
  button?: CmsLink;
  postsLimit?: number;
};

export type FinalCtaData = {
  heading?: string;
  description?: string;
  primaryButton?: CmsLink;
  secondaryButton?: CmsLink;
};

export type HomePageData = {
  seo?: import("@/lib/seo").SeoData;
  hero?: HeroData;
  aboutStrip?: AboutStripData;
  logoMarquee?: LogoMarqueeData;
  agencyStatement?: AgencyStatementData;
  ctaSection?: CtaCardData;
  stats?: { items?: StatItem[] };
  services?: ServicesData;
  compareStrip?: CompareStripData;
  scrollReveal?: ScrollRevealData;
  caseStudies?: { items?: CaseStudyData[] };
  team?: TeamData;
  awards?: AwardsData;
  reviews?: ReviewsData;
  industries?: IndustriesData;
  blogSection?: HomeBlogData;
  finalCta?: FinalCtaData;
};

export async function getHomePage(): Promise<HomePageData | null> {
  try {
    return await sanityClient.fetch<HomePageData | null>(homePageQuery);
  } catch (error) {
    console.error("Failed to fetch home page:", error);
    return null;
  }
}

export function scrollRevealHighlightsToMap(
  highlights?: { word?: string; color?: string }[]
): Record<string, string> {
  if (!highlights?.length) return { grow: "#9DF560" };

  return highlights.reduce<Record<string, string>>((acc, item) => {
    if (item.word) acc[item.word] = item.color || "#9DF560";
    return acc;
  }, {});
}
