import type { Metadata } from 'next'
import { safeSanityFetch } from './sanity'

// These styles apply to every route in the application
import './globals.css'

import { CmsLink } from './components/cms/cmsLink'
import { q } from 'groqd'
import { navigationMenuSelection, settingsSelection } from 'cms/selections'
import Link from 'next/link'
import { SanityImage } from './components/SanityImage'

// Google Fonts
import fonts from '@googleforcreators/fonts/fonts.json'
import { getGoogleFontURL } from '@googleforcreators/fonts'
import { Font } from '@googleforcreators/fonts/dist-types/types'

export const metadata: Metadata = {
  title: 'Peter.js',
  description: "On this framework I'll build my church website.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = (await safeSanityFetch(q('*').filter('_type == "settings"').grab$(settingsSelection)))[0]

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
  
  const displayFont = fonts.find(font => font.family == settings.displayFont) as Font
  const bodyFont = fonts.find(font => font.family == settings.bodyFont) as Font
  const fontUrl = getGoogleFontURL([displayFont, bodyFont], "swap")

  return (
    <html lang="en" style={{
      '--font-display': settings.displayFont,
      '--font-body': settings.bodyFont
    } as React.CSSProperties}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={fontUrl} />
      </head>
      <body>
        <header className="bg-white">
          <nav className="container mx-auto px-4 py-4 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <SanityImage src={settings.logo.asset._ref} alt={settings.name} className="w-12 h-12" width={48} height={48} />
              <span className="text-neutral-800 font-bold text-2xl tracking-tight font-display">{settings.name}</span>
            </Link>
            
            <ul className="ml-12 flex space-x-8">
              {headerNavMenu.items?.map((item, index) => (
                <li key={index}>
                  {item._type == 'navigationItem' && (
                    <CmsLink content={item.link} className="text-neutral-900 font-semibold text-2xl">{item.title}</CmsLink>
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
              &copy; {(new Date()).getFullYear()} {settings.name}, Inc. All rights reserved.
            </p>
            <Link href="/" className='mt-5'>
              <SanityImage src={settings.logo.asset._ref} alt={settings.name} className="w-12 h-12" width={48} height={48} />
            </Link> 
          </div>
        </footer>
      </body>
    </html>
  )
}
