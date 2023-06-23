import {q, type Selection, type TypeFromSelection} from 'groqd'

export const richTextSelection = {
  _type: q.literal('richText'),
  body: q.array(q.contentBlock()),
} satisfies Selection

export type RichText = TypeFromSelection<typeof richTextSelection>
