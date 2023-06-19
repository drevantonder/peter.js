import { q, sanityImage, type Selection, type TypeFromSelection } from 'groqd'
import { SanityImage } from './SanityImage'

export const heroSelection = {
  title: q.string(),
  subtitle: q.string(),
  ctas: q.array(
    q.object({
      title: q.string(),
      link: q.string().url(),
    })
  ),
  image: sanityImage('image', {
    withHotspot: true,
    isList: false,
    additionalFields: {
      alt: q.string(),
    },
  }),
} satisfies Selection

type Props = {
  content: TypeFromSelection<typeof heroSelection>
}

export function Hero({ content }: Props) {
  return (
    <div className="relative aspect-video flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <SanityImage
          src={content.image.asset._ref}
          alt={content.image.alt}
          placeholder="blur"
          fill={true}
        />
      </div>
      <div className="bg-neutral-200/10 backdrop-blur rounded-lg overflow-clip p-8">
        <h1 className="text-6xl font-extrabold text-neutral-900">
          {content.title}
        </h1>
        <h2 className="text-2xl font-semibold text-neutral-800">
          {content.subtitle}
        </h2>
        <ul>
          {content.ctas.map((cta, index) => (
            <li key={index}>
              <a href={cta.link}>{cta.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
