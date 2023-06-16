import {defineType} from 'sanity'

export default defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'position',
      type: 'string',
      title: 'Position',
      options: {
        list: [
          {title: 'Header', value: 'header'},
          {title: 'Footer', value: 'footer'},
        ],
      },
    },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{type: 'navigationItem'}],
    },
  ],
})
