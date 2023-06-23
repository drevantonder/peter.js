import { Hero } from 'cms/selections'
import { SanityImage } from './SanityImage'

export function HeroBlock({ content }: { content: Hero }) {
  return (
    <div className="relative aspect-video flex items-center justify-center">
      {content.image && (
        <div className="absolute inset-0 -z-10">
          <SanityImage
            src={content.image.asset._ref}
            alt={content.image.alt}
            placeholder="blur"
            fill={true}
          />
        </div>
      )}
      <div className="bg-neutral-200/10 backdrop-blur rounded-lg overflow-clip p-8">
        <h1 className="text-6xl font-extrabold text-neutral-900">
          {content.title}
        </h1>
        {content.subtitle && (
          <h2 className="text-2xl font-semibold text-neutral-800">
            {content.subtitle}
          </h2>
        )}
        {content.ctas && (
          <ul>
            {content.ctas.map((cta, index) => (
              <li key={index}>
                <a href={cta.link}>{cta.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
