export * from './navigationMenu'
export * from './page'

import { navigationMenuSchema } from './navigationMenu'
import { pageSchema } from './page'

export const documentSchemas = [navigationMenuSchema, pageSchema]
