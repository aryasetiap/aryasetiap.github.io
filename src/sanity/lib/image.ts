import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: Image) {
  return builder.image(source)
}
