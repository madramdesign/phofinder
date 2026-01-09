import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PhoFinder - Find the Best Pho Restaurants',
  description: 'Discover pho restaurants by state and city. Read reviews and ratings from pho enthusiasts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
