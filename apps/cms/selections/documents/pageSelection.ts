import {q, z, type Selection, type TypeFromSelection} from 'groqd'
import {heroSelection, richTextSelection} from '..'

export const pageSelection = {
  _type: q.literal('page'),
  title: q.string(),
  slug: q.slug('slug'),
  body: q("body").filter().select({
    '_type == "richText"': richTextSelection,
    '_type == "hero"': heroSelection,
  }),
} satisfies Selection

export type Page = TypeFromSelection<typeof pageSelection>
