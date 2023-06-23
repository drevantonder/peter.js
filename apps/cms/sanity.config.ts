import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemas} from './schemas'
import {groqdPlaygroundTool} from 'groqd-playground'

export default defineConfig({
  name: 'default',
  title: 'black-koala',

  // TODO: validate with zod
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || '',

  plugins: [
    deskTool(),
    visionTool(),
    groqdPlaygroundTool({
      defaultDataset: process.env.SANITY_STUDIO_DATASET || '',
    }),
  ],

  schema: {
    types: schemas,
  },
})
