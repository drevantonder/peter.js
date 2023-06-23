import {q, type Selection, type TypeFromSelection} from 'groqd'
import { navigationItemSelection } from '..'

export const navigationMenuSelection = {
  _type: q.literal('navigationMenu'),
  title: q.string(),
  position: q.string(),
  items: q('items').filter().select({
    '_type == "navigationItem"': navigationItemSelection,
  }),
} satisfies Selection

export type NavigationMenu = TypeFromSelection<typeof navigationMenuSelection>
