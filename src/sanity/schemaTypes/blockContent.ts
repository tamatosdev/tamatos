import { defineType, defineArrayMember } from 'sanity'
import { BlockContentInput } from '../components/BlockContentInput'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  components: {
    input: BlockContentInput,
  },
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
    defineArrayMember({
      type: 'table',
      title: 'Table',
    }),
    defineArrayMember({
      name: 'ctaBlock',
      title: 'CTA Button',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Heading (optional)',
          type: 'string',
          description: 'Leave heading and text empty to show only the button.',
        },
        {
          name: 'text',
          title: 'Text (optional)',
          type: 'text',
          rows: 2,
        },
        {
          name: 'label',
          title: 'Button label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'url',
          title: 'Button link',
          type: 'url',
          description: 'A full URL (https://…) or a site path like /contact.',
          validation: (Rule) =>
            Rule.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
        },
        {
          name: 'openInNewTab',
          title: 'Open in a new tab',
          type: 'boolean',
          initialValue: false,
        },
      ],
      preview: {
        select: { title: 'label', subtitle: 'url' },
        prepare: ({ title, subtitle }) => ({ title: `CTA: ${title || 'Button'}`, subtitle }),
      },
    }),
  ],
})
