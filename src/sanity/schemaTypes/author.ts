import { defineArrayMember, defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
      description: 'e.g. CEO, Head of Development',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
    }),
    defineField({
      name: 'socialProfiles',
      title: 'Social Profiles',
      type: 'array',
      description: 'Add social profile name + link (LinkedIn, X, Behance, etc.)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialProfile',
          fields: [
            defineField({
              name: 'name',
              title: 'Profile name',
              type: 'string',
              description: 'e.g. LinkedIn, X, Instagram, Behance',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Profile link',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'url' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'designation',
      media: 'image',
    },
  },
})
