import { RichText } from 'cms/selections'
import { PortableText } from '@portabletext/react'

export function RichTextBlock({ content }: { content: RichText }) {
  return (
    <div className="container mx-auto prose prose-headings:font-display">
      <PortableText value={content.body} />
    </div>
  )
}
