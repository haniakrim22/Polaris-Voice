import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Polaris Voice+ | AI-Powered Decision Intelligence',
  description: 'Intelligent Decision Intelligence System for B2B environments. Triangulates customer feedback, employee sentiment, and performance KPIs.',
  keywords: 'AI, Decision Intelligence, VoC, VoE, KPI, Executive Dashboard, Business Intelligence',
  authors: [{ name: 'Polaris Executive Unit' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00D0FF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} font-satoshi bg-dark-bg text-white min-h-screen`}>
        <Providers>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 ml-64 p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}