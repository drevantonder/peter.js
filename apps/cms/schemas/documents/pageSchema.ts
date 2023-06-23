import {defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const pageSchema = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({title, slug}) {
      return {
        title: title,
        subtitle: slug.current === '@' ? '/' : `/${slug.current}`,
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
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      validation: (Rule) => Rule.required(),
      description:
        'Use "@" for the home page. The slug is used to generate the page URL: e.g. in /about the slug is "about"',
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{type: 'hero'}, {type: 'richText'}],
    },
  ],
})
