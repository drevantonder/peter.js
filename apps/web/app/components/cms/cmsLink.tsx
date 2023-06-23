import { Link as LinkType } from "cms/selections";
import Link from "next/link";

export function CmsLink({ content, children, ...restProps }: { content: LinkType, children: React.ReactNode } & Omit<React.ComponentProps<typeof Link> | React.ComponentProps<'a'>, 'href' | 'content'>
) {
  if (content.isExternal) {
    return (
      <a href={content.externalLink} {...restProps as Omit<React.ComponentProps<'a'>, 'href'>}>
        {children}
      </a>
    )
  } else {
    let slug = content.internalLink?.slug
    if (slug === '@') {
      slug = ''
    }

    return (
      <Link href={`/${slug}`} {...restProps as Omit<React.ComponentProps<typeof Link>, 'href'>}>
        {children}
      </Link>
    )
  }
}