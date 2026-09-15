import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  alt,
  "url": asset->url
`;

export const contactPageQuery = defineQuery(/* groq */ `
  *[_type == "contactPage" && _id == "contactPage"][0] {
    seo {
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage { ${imageFields} },
      ogType,
      ogSiteName,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage { ${imageFields} },
      twitterSite,
      twitterCreator,
      schema {
        enabled,
        type,
        name,
        url,
        description,
        logo { ${imageFields} },
        customJsonLd
      }
    },
    breadcrumbLabel,
    cardBackground { ${imageFields} },
    profileImage { ${imageFields} },
    profileName,
    profileRole,
    headingBefore,
    headingItalic,
    headingAfter,
    phoneLabel,
    phones[] {
      label,
      href
    },
    emailLabel,
    email,
    infoCtaLabel,
    infoCtaHref,
    formHeadingBefore,
    formHeadingItalic,
    formHeadingAfter,
    queryTabLabel,
    projectTabLabel,
    querySubmitLabel,
    projectSubmitLabel,
    consentText,
    budgetLabel,
    budgetOptions,
    serviceInterestLabel,
    projectDetailsLabel,
    "globalFootprint": {
      "headingBefore": footprintHeadingBefore,
      "headingAccent": footprintHeadingAccent,
      "headingAfter": footprintHeadingAfter,
      "description": footprintDescription,
      "locations": footprintLocations[] {
        key,
        isoNumericId,
        city,
        countryName,
        countryCode,
        flag { ${imageFields} },
        location,
        longitude,
        latitude,
        labelOffsetX,
        labelOffsetY
      }
    }
  }
`);
