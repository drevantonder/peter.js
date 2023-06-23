import {q, type Selection, type TypeFromSelection} from 'groqd'
import {ctaSelection} from '..'
import { richTextDescriptionType } from '..'

export const heroSelection = {
  _type: q.literal('hero'),
  title: q.string(),
  description: richTextDescriptionType,
  ctas: q('ctas').filter().grab$(ctaSelection),
  image: q("image").grab$({
    alt: q.string(),
    asset: q("asset").grab$({
      _ref: q.string(),
    }),
  }),
} satisfies Selection

export type Hero = TypeFromSelection<typeof heroSelection>
