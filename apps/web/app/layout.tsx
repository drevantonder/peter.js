import type { Metadata } from 'next'
import { safeSanityFetch } from './sanity'

// These styles apply to every route in the application
import './globals.css'

import { CmsLink } from './components/cms/cmsLink'
import { q } from 'groqd'
import { navigationMenuSelection } from 'cms/selections'

export const metadata: Metadata = {
  title: 'Peter.js',
  description: "On this framework I'll build my church website.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerNavMenu = (await safeSanityFetch(
    q("*")
      .filter('_type == "navigationMenu" && position == "header"')
      .grab$(navigationMenuSelection)
  ))[0]

  const footerNavMenu = (await safeSanityFetch(
    q("*")
      .filter('_type == "navigationMenu" && position == "footer"')
      .grab$(navigationMenuSelection)
  ))[0]

  return (
    <html lang="en">
      <body>
        <header className="bg-white">
          <nav className="container mx-auto px-4 py-4 flex items-center">
            <ul className="flex space-x-8">
              {headerNavMenu.items?.map((item, index) => (
                <li key={index}>
                  {item._type == 'navigationItem' && (
                    <CmsLink content={item.link} className="text-neutral-900 font-semibold text-xl">{item.title}</CmsLink>
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
                {footerNavMenu?.items?.map((item, index) => (
                  <li key={index}>
                    {item._type == 'navigationItem' && (
                      <CmsLink content={item.link} className="text-neutral-600 text-sm">{item.title}</CmsLink>
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
