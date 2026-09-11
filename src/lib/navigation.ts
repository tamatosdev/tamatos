import { sanityClient } from '@/sanity/lib/client'
import { siteNavigationQuery } from '@/sanity/queries/navigation'

export type MegaMenuItem = {
  label: string
  subtext?: string
  href: string
  openInNewTab?: boolean
  icon?: { url?: string; alt?: string }
}

export type MegaMenuCategory = {
  label: string
  hoverColor: string
  href?: string
  items: MegaMenuItem[]
}

export type MegaMenu = {
  categories: MegaMenuCategory[]
}

export type NavItem = {
  label: string
  href?: string
  menuType?: 'link' | 'megaMenu'
  hasMegaMenu?: boolean
  megaMenuCategories?: MegaMenuCategory[]
  megaMenu?: MegaMenu
}

export type SiteNavigation = {
  items?: NavItem[]
  contactButton?: { label?: string; href?: string }
}

export const defaultSiteNavigation: SiteNavigation = {
  items: [
    { label: 'Works', href: '/work', menuType: 'link' },
    {
      label: 'Services',
      href: '/services',
      menuType: 'megaMenu',
      megaMenuCategories: [
        {
          label: 'Digital',
          hoverColor: '#9DF560',
          href: '/services/digital',
          items: [
            {
              label: 'Social Media Marketing',
              subtext: 'Grow your social presence',
              href: '/services/social-media-marketing',
            },
            {
              label: 'Influencer Marketing',
              subtext: 'Connect with trusted voices',
              href: '/services/influencer-marketing',
            },
            {
              label: 'Email & WhatsApp Automation',
              subtext: 'Automate customer communication',
              href: '/services/email-whatsapp-automation',
            },
            {
              label: 'Analytics & Growth Optimization',
              subtext: 'Turn data into growth',
              href: '/services/analytics-growth-optimization',
            },
            {
              label: 'Search Engine Optimization',
              subtext: 'Boost search visibility',
              href: '/services/seo',
            },
            {
              label: 'Content Strategy & Production',
              subtext: 'Content that drives results',
              href: '/services/content-strategy',
            },
          ],
        },
        {
          label: 'Development',
          hoverColor: '#FC7031',
          href: '/services/development',
          items: [
            {
              label: 'Web Development',
              subtext: 'Fast, scalable websites',
              href: '/services/web-development',
            },
            {
              label: 'MVP Development',
              subtext: 'Launch products quickly',
              href: '/services/mvp-development',
            },
            {
              label: 'Mobile App Development',
              subtext: 'Native & cross-platform apps',
              href: '/services/mobile-development',
            },
            {
              label: 'Webflow Development',
              subtext: 'No-code meets custom build',
              href: '/services/webflow-development',
            },
            {
              label: 'Landing Pages',
              subtext: 'Pages built to convert',
              href: '/services/landing-pages',
            },
            {
              label: 'Team Extension',
              subtext: 'Scale your dev capacity',
              href: '/services/team-extension',
            },
          ],
        },
        {
          label: 'Design',
          hoverColor: '#03E4AC',
          href: '/services/design',
          items: [
            {
              label: 'UI/UX Design',
              subtext: 'Experiences users love',
              href: '/services/ui-ux-design',
            },
            {
              label: 'Web Design',
              subtext: 'Beautiful, conversion-focused sites',
              href: '/services/web-design',
            },
            {
              label: 'Brand Identity',
              subtext: 'Visual systems that stand out',
              href: '/services/brand-identity',
            },
            {
              label: 'Logo Design',
              subtext: 'Memorable brand marks',
              href: '/services/logo-design',
            },
            {
              label: 'Pitch Deck Design',
              subtext: 'Presentations that persuade',
              href: '/services/pitch-deck',
            },
            {
              label: 'Website Redesign',
              subtext: 'Refresh and elevate your site',
              href: '/services/website-redesign',
            },
          ],
        },
      ],
    },
    { label: 'Industries', href: '/industries', menuType: 'link' },
    { label: 'Pricing', href: '/pricing', menuType: 'link' },
    { label: 'About', href: '/about', menuType: 'link' },
    { label: 'Blog', href: '/blog', menuType: 'link' },
  ],
  contactButton: {
    label: 'Contact Us',
    href: '/contact',
  },
}

export function normalizeHexColor(color?: string, fallback = '#9DF560') {
  if (!color?.trim()) return fallback
  return color.startsWith('#') ? color : `#${color}`
}

export function getMegaMenuFromNavItem(item: NavItem): MegaMenu | undefined {
  const categories = item.megaMenuCategories ?? item.megaMenu?.categories
  if (!categories?.length) return undefined
  return { categories }
}

export function navItemHasMegaMenu(item: NavItem) {
  return item.menuType === 'megaMenu' || item.hasMegaMenu === true
}

/** Fill missing mega-menu category hrefs from local defaults (Sanity often omits them). */
function withDefaultCategoryHrefs(items: NavItem[]): NavItem[] {
  const defaultServices = defaultSiteNavigation.items?.find(
    (item) => item.label === 'Services' && navItemHasMegaMenu(item)
  )
  const defaultCategories =
    defaultServices?.megaMenuCategories ?? defaultServices?.megaMenu?.categories ?? []

  const hrefByLabel = new Map(
    defaultCategories
      .filter((category) => category.label && category.href)
      .map((category) => [category.label.toLowerCase(), category.href!])
  )

  return items.map((item) => {
    const categories = item.megaMenuCategories ?? item.megaMenu?.categories
    if (!categories?.length) return item

    const patched = categories.map((category) => {
      if (category.href) return category
      const fallbackHref = hrefByLabel.get(category.label.toLowerCase())
      return fallbackHref ? { ...category, href: fallbackHref } : category
    })

    if (item.megaMenuCategories) {
      return { ...item, megaMenuCategories: patched }
    }

    return {
      ...item,
      megaMenu: item.megaMenu ? { ...item.megaMenu, categories: patched } : { categories: patched },
    }
  })
}

export async function getSiteNavigation(): Promise<SiteNavigation> {
  try {
    const data = await sanityClient.fetch<SiteNavigation | null>(siteNavigationQuery)
    if (!data?.items?.length) return defaultSiteNavigation
    return {
      items: withDefaultCategoryHrefs(data.items),
      contactButton: data.contactButton ?? defaultSiteNavigation.contactButton,
    }
  } catch (error) {
    console.error('Failed to fetch site navigation:', error)
    return defaultSiteNavigation
  }
}
