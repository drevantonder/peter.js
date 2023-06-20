import { defineType } from 'sanity'

export const ctaSchema = defineType({
  name: 'cta',
  type: 'object',
  title: 'Call to action',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link',
    },
  ],
})
