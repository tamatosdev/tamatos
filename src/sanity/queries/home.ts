import { defineQuery } from "next-sanity";

const imageFields = /* groq */ `
  alt,
  "url": asset->url
`;

export const homePageQuery = defineQuery(/* groq */ `
  *[_type == "homePage" && _id == "homePage"][0] {
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
    hero {
      line1BeforeBold,
      boldWord,
      line1AfterBold,
      line2Word,
      line2ItalicWord,
      line3,
      boldHighlightColor,
      leftPills[] { label, top, left, right, insetNarrow },
      rightPills[] { label, top, left, right, insetNarrow },
      mobilePills[] { label, top, bottom, left, right },
      cta { label, href }
    },
    aboutStrip {
      icon { ${imageFields} },
      text,
      scrollLabel
    },
    logoMarquee {
      logos[] {
        name,
        image { ${imageFields} }
      }
    },
    agencyStatement {
      mainText,
      dimText,
      inlineImage { ${imageFields} }
    },
    ctaSection {
      person {
        name,
        role,
        image { ${imageFields} }
      },
      heading,
      description,
      button { label, href }
    },
    stats {
      items[] { value, title, description }
    },
    services {
      titleLine1,
      titleEmphasis,
      titleLine2,
      categories[] {
        title,
        backgroundColor,
        hoverColor,
        items[] { label, href }
      }
    },
    compareStrip {
      leftText,
      rightText
    },
    scrollReveal {
      text,
      highlights[] { word, color }
    },
    caseStudies {
      items[] {
        pills[] {
          label,
          flag { ${imageFields} }
        },
        heading,
        paragraphs,
        author {
          name,
          designation,
          image { ${imageFields} }
        },
        images[] { ${imageFields} }
      }
    },
    team {
      headingLine1,
      headingAccent,
      column1Text,
      column2Text,
      members[] {
        orbit,
        baseAngle,
        size,
        image { ${imageFields} }
      }
    },
    awards {
      headingMain,
      headingEmphasis,
      headingEnd,
      subheading,
      items[] {
        yearLabel,
        title,
        image { ${imageFields} }
      }
    },
    reviews {
      headingStart,
      headingHighlight,
      headingMiddle,
      headingItalic,
      headingLine2,
      items[] {
        logo { ${imageFields} },
        content,
        author,
        role,
        photo { ${imageFields} },
        backgroundColor
      }
    },
    industries {
      headingBefore,
      headingEmphasis,
      headingAfter,
      image { ${imageFields} },
      items[] { title, tags }
    },
    blogSection {
      headingBefore,
      headingEmphasis,
      headingAfter,
      button { label, href },
      postsLimit
    },
    finalCta {
      heading,
      description,
      primaryButton { label, href },
      secondaryButton { label, href }
    }
  }
`);
