import { createClient } from 'next-sanity'
import { cache } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { makeSafeQueryRunner } from 'groqd'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
})

export const sanityClientFetch = cache<typeof sanityClient.fetch>(
  sanityClient.fetch.bind(sanityClient)
)

export const sanityImagebuilder = imageUrlBuilder(sanityClient)

export const safeSanityFetch = makeSafeQueryRunner(
  (query: string, params: Record<string, number | string | null> = {}) =>
    sanityClientFetch(query, params)
)
