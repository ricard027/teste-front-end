import type { Metadata, Viewport } from 'next'
import '@/styles/main.scss'

export const metadata: Metadata = {
  title: 'Econverse | Ofertas e produtos para você',
  description: 'Encontre ofertas, tecnologia, moda, supermercado e muito mais na Econverse.',
  applicationName: 'Econverse',
  authors: [{ name: 'Econverse' }],
  openGraph: { title: 'Econverse | Ofertas e produtos para você', description: 'Confira nossas ofertas e produtos em destaque.', type: 'website', locale: 'pt_BR' },
  twitter: { card: 'summary', title: 'Econverse | Ofertas e produtos para você' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#ffffff' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>
}
