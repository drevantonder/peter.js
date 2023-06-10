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
    <div className="relative">
      <div className="absolute inset-0 -z-10 aspect-video">
        <SanityImage
          src={content.image.asset._ref}
          alt={content.image.alt}
          placeholder="blur"
          fill={true}
        />
      </div>
      <h1>{content.title}</h1>
      <h2>{content.subtitle}</h2>
      <ul>
        {content.ctas.map((cta, index) => (
          <li key={index}>
            <a href={cta.link}>{cta.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
