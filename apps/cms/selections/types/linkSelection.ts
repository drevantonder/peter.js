import {q, type Selection, type TypeFromSelection} from 'groqd'

export const linkSelection = {
  _type: q.literal('link'),
  isExternal: q.boolean(),
  internalLink: q('internalLink').deref().grab$({
    slug: q.slug('slug'),
  }),
  externalLink: q.string().url().optional(),
} satisfies Selection

export type Link = TypeFromSelection<typeof linkSelection>
