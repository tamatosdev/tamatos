import { sanityClient } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/queries/contact";
import type { SeoData } from "@/lib/seo";

export type CmsImage = {
  url?: string;
  alt?: string;
};

export type ContactPhone = {
  label?: string;
  href?: string;
};

export type GlobalFootprintLocation = {
  key?: string;
  isoNumericId?: number;
  city?: string;
  countryName?: string;
  countryCode?: string;
  flag?: CmsImage;
  location?: string;
  longitude?: number;
  latitude?: number;
  labelOffsetX?: number;
  labelOffsetY?: number;
};

export type GlobalFootprintData = {
  headingBefore?: string;
  headingAccent?: string;
  headingAfter?: string;
  description?: string;
  locations?: GlobalFootprintLocation[];
};

export type ContactPageData = {
  seo?: SeoData;
  breadcrumbLabel?: string;
  cardBackground?: CmsImage;
  profileImage?: CmsImage;
  profileName?: string;
  profileRole?: string;
  headingBefore?: string;
  headingItalic?: string;
  headingAfter?: string;
  phoneLabel?: string;
  phones?: ContactPhone[];
  emailLabel?: string;
  email?: string;
  infoCtaLabel?: string;
  infoCtaHref?: string;
  formHeadingBefore?: string;
  formHeadingItalic?: string;
  formHeadingAfter?: string;
  queryTabLabel?: string;
  projectTabLabel?: string;
  querySubmitLabel?: string;
  projectSubmitLabel?: string;
  consentText?: string;
  budgetLabel?: string;
  budgetOptions?: string[];
  serviceInterestLabel?: string;
  projectDetailsLabel?: string;
  globalFootprint?: GlobalFootprintData;
};

export async function getContactPage(): Promise<ContactPageData | null> {
  try {
    return await sanityClient.fetch<ContactPageData | null>(contactPageQuery);
  } catch (error) {
    console.error("Failed to fetch contact page:", error);
    return null;
  }
}
