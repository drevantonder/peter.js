import { q, sanityImage, type Selection, type TypeFromSelection } from 'groqd'
import { defineType } from 'sanity'

export const heroQuery = {
  title: q.string(),
  subtitle: q.string().nullable(),
  ctas: q
    .array(
      q.object({
        title: q.string(),
        link: q.string().url(),
      })
    )
    .nullable(),
  image: sanityImage('image', {
    withHotspot: true,
    isList: false,
    additionalFields: {
      alt: q.string(),
    },
  }).nullable(),
} satisfies Selection

export type Hero = TypeFromSelection<typeof heroQuery>

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
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
