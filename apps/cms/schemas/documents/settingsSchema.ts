import { defineType } from "sanity";

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
    }
  ]
})
