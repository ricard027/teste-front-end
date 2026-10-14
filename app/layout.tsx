import type { Metadata, Viewport } from 'next'
import '@/styles/main.scss'
import { seoConfig } from '@/config/seo'
import { getPublicSiteUrl } from '@/config/site'
import { WebsiteJsonLd } from '@/components/seo/website-json-ld'

export function generateMetadata(): Metadata {
  const siteUrl = getPublicSiteUrl()
  const isIndexable = siteUrl !== null

  return {
    ...(siteUrl ? { metadataBase: siteUrl } : {}),
    title: seoConfig.title,
    description: seoConfig.description,
    applicationName: seoConfig.applicationName,
    alternates: siteUrl ? { canonical: '/' } : undefined,
    robots: {
      index: isIndexable,
      follow: isIndexable,
      googleBot: {
        index: isIndexable,
        follow: isIndexable,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: seoConfig.title,
      description: seoConfig.description,
      locale: seoConfig.locale,
      siteName: seoConfig.applicationName,
      ...(siteUrl ? { url: '/' } : {}),
    },
    twitter: {
      card: 'summary',
      title: seoConfig.title,
      description: seoConfig.description,
    },
    icons: { icon: '/icon.svg' },
    formatDetection: { email: false, address: false, telephone: false },
  }
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#ffffff' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getPublicSiteUrl()
  return (
    <html lang="pt-BR">
      <head><link rel="preload" as="image" href="/assets/hero.jpg" /></head>
      <body><WebsiteJsonLd siteUrl={siteUrl} />{children}</body>
    </html>
  )
}
