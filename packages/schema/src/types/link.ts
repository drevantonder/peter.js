import { defineField, defineType } from 'sanity'

export const linkSchema = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      title: 'External Link',
      name: 'isExternal',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to use external links (links to other websites)',
    }),
    defineField({
      title: 'Internal Link',
      name: 'internalLink',
      description: 'Select pages for navigation',
      type: 'reference',
      to: [{ type: 'page' }],
      hidden: ({ parent }) => parent?.isExternal,
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      description: 'Use fully qualified URLS for external link',
      type: 'url',
      hidden: ({ parent }) => !parent?.isExternal,
    }),
  ],
})
