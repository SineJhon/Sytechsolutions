import { Plus_Jakarta_Sans } from 'next/font/google'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { FloatingContact } from '@/components/shared/FloatingContact'
import AiAssistant from '@/components/shared/AiAssistant'
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from 'next'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SY Tech Solutions — Premium Web Development in Ethiopia',
  description:
    'SY Tech Solutions builds custom websites, web apps, and digital products for Ethiopian businesses. Based in Arba Minch. Built for the world.',
  keywords: [
    'web development Ethiopia',
    'website design Arba Minch',
    'tech solutions Ethiopia',
    'custom web app Ethiopia',
    'SY Tech Solutions',
  ],
  openGraph: {
    title: 'SY Tech Solutions',
    description: 'We Build the Technology Your Business Runs On',
    url: 'https://sytech.solutions',
    siteName: 'SY Tech Solutions',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          {children}
          <FloatingContact
            telegramUsername={process.env.NEXT_PUBLIC_TELEGRAM_USERNAME!}
            whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!}
          />
          <AiAssistant />
        </SmoothScroll>
      </body>
    </html>
  )
}