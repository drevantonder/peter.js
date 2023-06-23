import { q, type Selection, type TypeFromSelection } from 'groqd'
import { defineType } from 'sanity'

export const richTextQuery = {
  body: q.array(q.contentBlock()),
} satisfies Selection

export type RichText = TypeFromSelection<typeof richTextQuery>

export const richTextSchema = defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: 'block',
        },
      ],
    },
  ],
})
