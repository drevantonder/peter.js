export * from './cta'
export * from './link'
export * from './navigationItem'

import { ctaSchema } from './cta'
import { linkSchema } from './link'
import { navigationItemSchema } from './navigationItem'

export const typeSchemas = [ctaSchema, linkSchema, navigationItemSchema]
