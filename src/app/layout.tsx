import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { PillNav } from '@/components/layout/PillNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { StickyContactBar } from '@/components/layout/StickyContactBar';

// 1. Bebas Neue — High-impact, architectural, bold luxury display typeface
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading-var',
  display: 'swap',
});

// 2. Jost — Clean, geometric modern sans for legible body copy
const jost = localFont({
  src: '../fonts/Jost-VariableFont_wght.ttf',
  variable: '--font-body-var',
  display: 'swap',
});

// 3. IBM Plex Mono — Technical tabular data, dimensions, and schedules
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono-var',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'RioPipes',
    template: '%s | RioPipes',
  },
  description:
    'Manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings. Durable plumbing solutions for clean water flow and long-lasting irrigation. Based in Rajkot, Gujarat.',
  keywords: [
    'RioPipes',
    'RIO Pipes',
    'CPVC pipes',
    'UPVC pipes',
    'SWR pipes',
    'Agriculture pipes',
    'PVC fittings',
    'Reva Polyplast',
    'Rajkot',
    'plumbing solutions',
  ],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/images/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'RioPipes',
    description:
      'Manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings. Durable plumbing solutions for residential, commercial, and industrial needs across India.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${jost.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Reva Polyplast',
              brand: 'RioPipes',
              url: 'https://riopipes.com',
              foundingDate: '2015',
              address: {
                '@type': 'PostalAddress',
                streetAddress:
                  'Plot No. G-2408/B, Road No. F-2, Almighty Gate, Metoda G.I.D.C.',
                addressLocality: 'Rajkot',
                addressRegion: 'Gujarat',
                postalCode: '360021',
                addressCountry: 'IN',
              },
              telephone: '+919316928238',
              email: 'info@riopipes.com',
              sameAs: [
                'https://www.facebook.com/Riopipesandfitting/',
                'https://www.instagram.com/reva.polyplast/',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden relative">
        {/* Floating Pill Navigation */}
        <PillNav />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Site Footer & Sticky Action Bar */}
        <SiteFooter />
        <StickyContactBar />
      </body>
    </html>
  );
}
