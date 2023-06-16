import type { Metadata } from 'next'
import groq from 'groq'
import { sanityClientFetch } from './sanity'

// These styles apply to every route in the application
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Peter.js',
  description: "On this framework I'll build my church website.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerNavMenu = await sanityClientFetch(
    groq`*[_type == "navigationMenu" && position == "header"][0]{ ..., "items": items[]{ ..., "link": link { ..., "internalLink": { "slug": internalLink->slug } } } }`
  )
  const footerNavMenu = await sanityClientFetch(
    groq`*[_type == "navigationMenu" && position == "footer"][0]{ ..., "items": items[]{ ..., "link": link { ..., "internalLink": { "slug": internalLink->slug } } } }`
  )

  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul>
              {headerNavMenu?.items?.map((item) => (
                <li key={item._key}>
                  {item._type == 'navigationItem' && item.link.isExternal && (
                    <a href={item.link.externalUrl}>{item.title}</a>
                  )}
                  {item._type == 'navigationItem' && !item.link.isExternal && (
                    <Link
                      href={`/${
                        item.link.internalLink.slug
                          ? item.link.internalLink.slug.current
                          : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <nav>
            <ul>
              {footerNavMenu?.items?.map((item) => (
                <li key={item._key}>
                  {item._type == 'navigationItem' && item.link.isExternal && (
                    <a href={item.link.externalUrl}>{item.title}</a>
                  )}
                  {item._type == 'navigationItem' && !item.link.isExternal && (
                    <Link
                      href={`/${
                        item.link.internalLink.slug
                          ? item.link.internalLink.slug.current
                          : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </footer>
      </body>
    </html>
  )
}
