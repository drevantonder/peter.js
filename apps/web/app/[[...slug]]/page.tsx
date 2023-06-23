import { sanityClientFetch } from '../sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroBlock } from '../components/hero'
import { pageSelection } from 'cms/selections'
import { RichTextBlock } from '../components/richText'
import { q, makeSafeQueryRunner } from 'groqd'

type Props = {
  params: { slug: string[] | undefined }
}

const runQuery = makeSafeQueryRunner(
  (query: string, params: Record<string, number | string | null> = {}) =>
    sanityClientFetch(query, params)
)

async function getPage(slug?: string) {
  const query = q('*')
    .filter(
      '_type == "page" && ((!defined($slug) && !defined(slug)) || (slug.current == $slug))'
    )
    .grab$(pageSelection)
  // const query = groq`*[_type == "page" && ((!defined($slug) && !defined(slug)) || (slug.current == $slug))][0]{
  //   title,
  //   body
  // }`

  const pages = await runQuery(query, { slug: slug ?? '@' })
  const page = pages[0]

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

const sanityTypeToComponent = {
  hero: HeroBlock,
  richText: RichTextBlock,
}

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug?.[0])

  return (
    <>
      {page.body.map((block, index) => {
        const Component = sanityTypeToComponent[block._type]

        if (!Component) {
          return null
        }

        return <Component key={index} content={block} />
      })}
    </>
  )
}
