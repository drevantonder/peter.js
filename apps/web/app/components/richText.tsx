import { RichText } from 'cms/selections'
import { PortableText } from '@portabletext/react'

export function RichTextBlock({ content }: { content: RichText }) {
  return (
    <div className="prose">
      <PortableText value={content.body} />
    </div>
  )
}
