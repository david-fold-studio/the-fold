import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import BuilderRegistry from '@/lib/builder-registry'
import BuilderVisualCopilot from '@/Builder/BuilderVisualCopilot'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'The Fold Studio - Custom Software Design & Development',
  description: 'Creative bubble agency template',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <BuilderRegistry />
        <BuilderVisualCopilot />
        {children}
        
        {/* Builder.io Visual Editing Script */}
        <Script
          src="https://cdn.builder.io/js/editor"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
