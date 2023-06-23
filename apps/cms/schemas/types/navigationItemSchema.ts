import {defineType} from 'sanity'

export const navigationItemSchema = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'link',
      type: 'link',
      title: 'Link',
    },
  ],
})
