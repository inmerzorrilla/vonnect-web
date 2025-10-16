
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CookieConsent } from '@/components/cookie-consent'
import { DiagnosticWidget } from '@/components/diagnostic-widget'
import { WhatsAppChatWidget } from '@/components/whatsapp-chat-widget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'vonnect: connecting talent and solutions',
  description: 'Build your remote team with top tech professionals from around the world. We match culture, not just skills. Experience recruitment that prioritizes authentic connections.',
  keywords: [
    'tech recruitment',
    'remote hiring',
    'software developers',
    'talent acquisition',
    'headhunting',
    'IT recruitment',
    'tech jobs',
    'remote jobs',
    'startup hiring',
    'developer recruitment'
  ],
  authors: [{ name: 'Vonnect' }],
  creator: 'Vonnect',
  publisher: 'Vonnect',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vonnect.net',
    title: 'vonnect: connecting talent and solutions',
    description: 'Build your remote team with top tech professionals from around the world. We match culture, not just skills.',
    siteName: 'Vonnect',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vonnect: connecting talent and solutions',
    description: 'Build your remote team with top tech professionals from around the world.',
    creator: '@vonnect',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-28">
              {children}
            </main>
            <Footer />
          </div>
          <CookieConsent />
          <DiagnosticWidget />
          <WhatsAppChatWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
