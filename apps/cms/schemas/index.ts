import {typeSchemas} from './types'
import {blockSchemas} from './blocks'
import {documentSchemas} from './documents'

export const schemas = [...typeSchemas, ...blockSchemas, ...documentSchemas]
