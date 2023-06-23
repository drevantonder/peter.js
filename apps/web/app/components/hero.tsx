import { Hero } from 'cms/selections'
import { SanityImage } from './SanityImage'
import { CmsRichTextDescription } from './cms/cmsRichTextDescription'
import { CmsLink } from './cms/cmsLink'
import { Button } from './button'

export function HeroBlock({ content }: { content: Hero }) {
  return (
    <div className="relative aspect-video flex items-center justify-center">
      {content.image && (
        <div className="absolute inset-0 -z-10 brightness-75">
          <SanityImage
            src={content.image.asset._ref}
            alt={content.image.alt}
            placeholder="blur"
            fill={true}
          />
        </div>
      )}
      <div className="bg-neutral-100/75 backdrop-blur rounded-lg overflow-clip px-16 py-12 max-w-4xl">
        <h1 className="text-6xl font-extrabold text-neutral-900 text-center">
          {content.title}
        </h1>
        {content.description && (
          <div className="prose-lg mt-8 text-center">
            <CmsRichTextDescription content={content.description} />
          </div>
        )}
        {content.ctas && (
          <ul className="flex items-center justify-center mt-8">
            {content.ctas.map((cta, index) => (
              <li key={index} className="block">
                <Button asChild>
                  <CmsLink content={cta.link}>{cta.title}</CmsLink>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
