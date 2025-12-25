import { getPWAMetadata, getPWAViewport } from '@/shared/lib/pwa'
import { PWAProvider } from '@/shared/providers'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

const pwaMetadata = getPWAMetadata()

export const metadata: Metadata = {
  ...pwaMetadata,
  title: pwaMetadata.title,
  description: pwaMetadata.description,
  manifest: pwaMetadata.manifest,
  applicationName: pwaMetadata.applicationName,
  appleWebApp: pwaMetadata.appleWebApp,
  icons: pwaMetadata.icons,
  other: pwaMetadata.other,
}

export const viewport: Viewport = getPWAViewport()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${inter.variable} antialiased`}>
        <PWAProvider />
        {children}
      </body>
    </html>
  )
}
