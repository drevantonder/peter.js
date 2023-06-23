import { defineType } from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigationMenuSchema = defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  icon: MenuIcon,
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
          { title: 'Header', value: 'header' },
          { title: 'Footer', value: 'footer' },
        ],
      },
    },
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{ type: 'navigationItem' }],
    },
  ],
})
