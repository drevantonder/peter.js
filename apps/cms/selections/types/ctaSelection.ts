import {q, type Selection, type TypeFromSelection} from 'groqd'
import { linkSelection } from './linkSelection'

export const ctaSelection = {
  _type: q.literal('cta'),
  title: q.string(),
  link: q('link').grab$(linkSelection),
} satisfies Selection

export type CTA = TypeFromSelection<typeof ctaSelection>
