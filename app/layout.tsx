import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' })
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' })
const prefix = process.env.NODE_ENV === 'production' ? '/lab' : ''
export const metadata: Metadata = {
  metadataBase: new URL('https://hurrr-ops.github.io/lab/'),
  title: 'HuRRR LAB — L’instinct de créer. La puissance de l’IA.',
  description: 'Un laboratoire numérique indépendant. Projets, vibe coding et expérimentations à la rencontre du code et de l’intelligence artificielle.',
  icons: { icon: `${prefix}/mark.svg` },
  openGraph: { title: 'HuRRR LAB', description: 'L’instinct de créer. La puissance de l’IA.', locale: 'fr_FR', type: 'website', images: [`${prefix}/images/core.png`] },
}
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#050507' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>
}
