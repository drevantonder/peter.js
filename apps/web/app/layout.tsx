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
        <header className="bg-white">
          <nav className="container mx-auto px-4 py-4 flex items-center">
            <ul className="flex space-x-8">
              {headerNavMenu?.items?.map((item) => (
                <li key={item._key}>
                  {item._type == 'navigationItem' && item.link.isExternal && (
                    <a
                      href={item.link.externalUrl}
                      className="text-neutral-900 font-semibold text-xl"
                    >
                      {item.title}
                    </a>
                  )}
                  {item._type == 'navigationItem' && !item.link.isExternal && (
                    <Link
                      href={`/${
                        item.link.internalLink.slug
                          ? item.link.internalLink.slug.current
                          : ''
                      }`}
                      className="text-neutral-900 font-semibold text-xl"
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
        <footer className="bg-white">
          <div className="container mx-auto px-4 py-8 flex justify-center items-center flex-col">
            <nav>
              <ul className="flex items-center space-x-12">
                {footerNavMenu?.items?.map((item) => (
                  <li key={item._key}>
                    {item._type == 'navigationItem' && item.link.isExternal && (
                      <a
                        href={item.link.externalUrl}
                        className="text-neutral-600 text-sm"
                      >
                        {item.title}
                      </a>
                    )}
                    {item._type == 'navigationItem' &&
                      !item.link.isExternal && (
                        <Link
                          href={`/${
                            item.link.internalLink.slug
                              ? item.link.internalLink.slug.current
                              : ''
                          }`}
                          className="text-neutral-600 text-sm"
                        >
                          {item.title}
                        </Link>
                      )}
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-6 text-center text-xs leading-5 text-gray-500">
              &copy; 2023 Your Company, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
