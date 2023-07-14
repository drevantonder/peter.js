import { defineType } from "sanity";
import fonts from '@googleforcreators/fonts/fonts.json'

export const settingsSchema = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Church Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      type: 'image',
      title: 'Church Logo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'displayFont',
      type: 'string',
      title: 'Display Font',
      options: {
        list: fonts.map((font) => font.family),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bodyFont',
      type: 'string',
      title: 'Body Font',
      options: {
        list: fonts.map((font) => font.family),
      },
      validation: (Rule) => Rule.required(),
    },
  ]
})
