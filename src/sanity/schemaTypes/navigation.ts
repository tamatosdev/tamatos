import { defineArrayMember, defineField, defineType } from 'sanity'
import { LinkIcon, MenuIcon } from '@sanity/icons'

export const megaMenuItem = defineType({
  name: 'megaMenuItem',
  title: 'Service link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Upload a square icon (PNG or SVG recommended)',
      options: { hotspot: false },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'label',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'string',
      description: 'Short line shown under the title (e.g. "Grow your social presence")',
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'e.g. /services/seo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      options: { layout: 'checkbox' },
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'subtext',
      media: 'icon',
    },
  },
})

export const megaMenuCategory = defineType({
  name: 'megaMenuCategory',
  title: 'Category',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Category name',
      type: 'string',
      description: 'e.g. Digital, Development, Design',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hoverColor',
      title: 'Hover color',
      type: 'string',
      description: 'Hex color — Digital: 9DF560, Development: FC7031, Design: 03E4AC',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value || typeof value !== 'string') return 'Required'
          const hex = value.replace('#', '')
          if (!/^[0-9A-Fa-f]{6}$/.test(hex)) return 'Use a 6-digit hex color'
          return true
        }),
    }),
    defineField({
      name: 'href',
      title: 'Category URL',
      type: 'string',
      description: 'Optional page link for this category (e.g. /services/design)',
    }),
    defineField({
      name: 'items',
      title: 'Service links',
      type: 'array',
      of: [defineArrayMember({ type: 'megaMenuItem' })],
      validation: (rule) => rule.min(1),
      options: { sortable: true },
    }),
  ],
  preview: {
    select: {
      title: 'label',
      hoverColor: 'hoverColor',
      href: 'href',
      items: 'items',
    },
    prepare({ title, hoverColor, href, items }) {
      const linkNote = href ? ` · ${href}` : ''
      return {
        title,
        subtitle: `${items?.length ?? 0} links · #${(hoverColor ?? '').replace('#', '')}${linkNote}`,
      }
    },
  },
})

export const navItem = defineType({
  name: 'navItem',
  title: 'Menu item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'Page link (also used as fallback for mega menu items)',
      initialValue: '/',
    }),
    defineField({
      name: 'menuType',
      title: 'Menu type',
      type: 'string',
      options: {
        list: [
          { title: 'Simple link', value: 'link' },
          { title: 'Mega menu (hover dropdown)', value: 'megaMenu' },
        ],
        layout: 'radio',
      },
      initialValue: 'link',
    }),
    defineField({
      name: 'megaMenuCategories',
      title: 'Mega menu categories',
      type: 'array',
      of: [defineArrayMember({ type: 'megaMenuCategory' })],
      hidden: ({ parent }) => parent?.menuType !== 'megaMenu',
      description: 'Add categories like Digital, Development, Design. Each category has its own links.',
      options: { sortable: true },
    }),
    // Legacy fields kept for existing documents
    defineField({
      name: 'hasMegaMenu',
      title: 'Has mega menu (legacy)',
      type: 'boolean',
      hidden: true,
    }),
    defineField({
      name: 'megaMenu',
      title: 'Mega menu (legacy)',
      type: 'object',
      hidden: true,
      fields: [
        defineField({
          name: 'categories',
          type: 'array',
          of: [defineArrayMember({ type: 'megaMenuCategory' })],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      href: 'href',
      menuType: 'menuType',
      hasMegaMenu: 'hasMegaMenu',
    },
    prepare({ title, href, menuType, hasMegaMenu }) {
      const isMega = menuType === 'megaMenu' || hasMegaMenu
      return {
        title,
        subtitle: isMega ? 'Mega menu' : href,
      }
    },
  },
})

export const siteNavigation = defineType({
  name: 'siteNavigation',
  title: 'Site Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Header menu',
      type: 'array',
      of: [defineArrayMember({ type: 'navItem' })],
      description:
        'Add menu items here. For Services, set Menu type to "Mega menu" then add categories and service links with icon, title, subtext & URL.',
      options: { sortable: true },
    }),
    defineField({
      name: 'contactButton',
      title: 'Contact button',
      type: 'link',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Navigation' }
    },
  },
})
