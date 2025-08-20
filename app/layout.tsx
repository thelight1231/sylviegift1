import type { Metadata } from 'next'
import { Amiri, Cairo } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
})

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'الهوية الخفية',
  description: 'رحلة في أعماق الذات',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${amiri.variable} ${cairo.variable} bg-slate-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}