import {defineType} from 'sanity'

export const ctaSchema = defineType({
  name: 'cta',
  type: 'object',
  title: 'Call to action',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'link',
      type: 'link',
      title: 'Link',
      validation: (Rule) => Rule.required(),
    },
  ],
})
