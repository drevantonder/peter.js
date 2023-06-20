export * from './types'
export * from './blocks'
export * from './documents'

import { typeSchemas } from './types'
import { blockSchemas } from './blocks'
import { documentSchemas } from './documents'

export const schemas = [...typeSchemas, ...blockSchemas, ...documentSchemas]
