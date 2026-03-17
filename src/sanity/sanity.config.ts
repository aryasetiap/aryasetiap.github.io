import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6n9xjaio',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
