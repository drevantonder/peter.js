import { PortableText } from "@portabletext/react";
import { richTextDescriptionType } from "cms/selections";
import { InferType } from "groqd";

export function CmsRichTextDescription({ content }: { content: InferType<typeof richTextDescriptionType> }) {
  return <PortableText value={content} />
}