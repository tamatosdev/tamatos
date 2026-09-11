import { defineQuery } from 'next-sanity'

const imageFields = /* groq */ `
  alt,
  "url": asset->url
`

const megaMenuCategoryFields = /* groq */ `
  label,
  hoverColor,
  href,
  items[] {
    label,
    "subtext": coalesce(subtext, description),
    href,
    openInNewTab,
    icon { ${imageFields} }
  }
`

export const siteNavigationQuery = defineQuery(/* groq */ `
  *[_type == "siteNavigation" && _id == "siteNavigation"][0] {
    items[] {
      label,
      href,
      menuType,
      hasMegaMenu,
      "megaMenuCategories": coalesce(
        megaMenuCategories[] { ${megaMenuCategoryFields} },
        megaMenu.categories[] { ${megaMenuCategoryFields} }
      )
    },
    contactButton {
      label,
      href
    }
  }
`)
