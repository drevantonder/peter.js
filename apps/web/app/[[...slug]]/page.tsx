import groq from 'groq'
import { sanityClientFetch } from '../sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '../components/hero'

type Props = {
  params: { slug: string[] | undefined }
}

async function getPage(slug?: string) {
  const query = groq`*[_type == "page" && ((!defined($slug) && !defined(slug)) || (slug.current == $slug))][0]{
    title,
    body
  }`

  const page = await sanityClientFetch(query, { slug: slug || null })

  if (!page) {
    notFound()
  }

  return page
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug?.[0])

  return {
    title: page.title,
  }
}

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug?.[0])

  return (
    <>
      <Hero content={page.body[0]} />
    </>
  )
}
