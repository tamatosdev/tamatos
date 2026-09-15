import { sanityClient } from '@/sanity/lib/client'
import { siteNavigationQuery } from '@/sanity/queries/navigation'
import { isLivePath, serviceCategoryPath, sortByServiceCategoryOrder } from '@/lib/routes'

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
      // No /services index page yet — open via mega menu / category pages
      menuType: 'megaMenu',
      megaMenuCategories: [
        {
          label: 'Development',
          hoverColor: '#FC7031',
          href: '/services/development',
          items: [
            {
              label: 'Web Development',
              subtext: 'Fast, scalable websites',
              href: '/services/development',
            },
            {
              label: 'MVP Development',
              subtext: 'Launch products quickly',
              href: '/services/development',
            },
            {
              label: 'Mobile App Development',
              subtext: 'Native & cross-platform apps',
              href: '/services/development',
            },
            {
              label: 'Webflow Development',
              subtext: 'No-code meets custom build',
              href: '/services/development',
            },
            {
              label: 'Landing Pages',
              subtext: 'Pages built to convert',
              href: '/services/development',
            },
            {
              label: 'Team Extension',
              subtext: 'Scale your dev capacity',
              href: '/services/development',
            },
          ],
        },
        {
          label: 'Digital',
          hoverColor: '#9DF560',
          href: '/services/digital',
          items: [
            {
              label: 'Social Media Marketing',
              subtext: 'Grow your social presence',
              href: '/services/digital',
            },
            {
              label: 'Influencer Marketing',
              subtext: 'Connect with trusted voices',
              href: '/services/digital',
            },
            {
              label: 'Email & WhatsApp Automation',
              subtext: 'Automate customer communication',
              href: '/services/digital',
            },
            {
              label: 'Analytics & Growth Optimization',
              subtext: 'Turn data into growth',
              href: '/services/digital',
            },
            {
              label: 'Search Engine Optimization',
              subtext: 'Boost search visibility',
              href: '/services/digital',
            },
            {
              label: 'Content Creation and Strategy',
              subtext: 'Content that drives results',
              href: '/services/digital',
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
              href: '/services/design',
            },
            {
              label: 'Web Design',
              subtext: 'Beautiful, conversion-focused sites',
              href: '/services/design',
            },
            {
              label: 'Brand Identity',
              subtext: 'Visual systems that stand out',
              href: '/services/design',
            },
            {
              label: 'Logo Design',
              subtext: 'Memorable brand marks',
              href: '/services/design',
            },
            {
              label: 'Pitch Deck Design',
              subtext: 'Presentations that persuade',
              href: '/services/design',
            },
            {
              label: 'Website Redesign',
              subtext: 'Refresh and elevate your site',
              href: '/services/design',
            },
          ],
        },
      ],
    },
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

/** Fill missing mega-menu category hrefs and remap dead item links to live category pages. */
function withSafeNavigationLinks(items: NavItem[]): NavItem[] {
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

  return items
    .map((item) => {
      const categories = item.megaMenuCategories ?? item.megaMenu?.categories

      if (categories?.length) {
        const patched = sortByServiceCategoryOrder(
          categories.map((category) => {
            const categoryHref =
              category.href && isLivePath(category.href)
                ? category.href
                : hrefByLabel.get(category.label.toLowerCase()) ??
                  serviceCategoryPath(category.label)

            return {
              ...category,
              href: categoryHref,
              items: (category.items ?? []).map((menuItem) => ({
                ...menuItem,
                href: isLivePath(menuItem.href) ? menuItem.href : categoryHref,
              })),
            }
          }),
          (category) => category.label
        )

        const next: NavItem = {
          ...item,
          // Drop dead /services index until that page exists
          href: item.href && isLivePath(item.href) ? item.href : undefined,
        }

        if (item.megaMenuCategories) {
          return { ...next, megaMenuCategories: patched }
        }

        return {
          ...next,
          megaMenu: item.megaMenu
            ? { ...item.megaMenu, categories: patched }
            : { categories: patched },
        }
      }

      // Plain links: keep only live routes
      if (item.href && !isLivePath(item.href)) {
        return null
      }

      return item
    })
    .filter((item): item is NavItem => item != null)
}

export async function getSiteNavigation(): Promise<SiteNavigation> {
  try {
    const data = await sanityClient.fetch<SiteNavigation | null>(siteNavigationQuery)
    if (!data?.items?.length) return defaultSiteNavigation
    return {
      items: withSafeNavigationLinks(data.items),
      contactButton: data.contactButton ?? defaultSiteNavigation.contactButton,
    }
  } catch (error) {
    console.error('Failed to fetch site navigation:', error)
    return defaultSiteNavigation
  }
}
