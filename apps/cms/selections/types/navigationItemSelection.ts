import {q, type Selection, type TypeFromSelection} from 'groqd'
import { linkSelection } from './linkSelection'

export const navigationItemSelection = {
  _type: q.literal('navigationItem'),
  title: q.string(),
  link: q('link').grab$(linkSelection),
} satisfies Selection

export type NavigationItem = TypeFromSelection<typeof navigationItemSelection>
