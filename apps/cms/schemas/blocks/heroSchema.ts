import { defineType } from 'sanity'
import {StarIcon} from '@sanity/icons'

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title,
        subtitle: 'Hero',
        media: media,
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'richTextDescription',
      title: 'Description',
    },
    {
      name: 'ctas',
      type: 'array',
      title: 'Call to actions',
      of: [{ type: 'cta' }],
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
  ],
})
