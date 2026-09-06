import type { Metadata } from "next";
import localFont from 'next/font/local';
import { IBM_Plex_Mono } from 'next/font/google';
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyContactBar } from "@/components/layout/StickyContactBar";

// 1. Hammersmith One — Punchy, structural, modern industrial display font
const hammersmith = localFont({
  src: '../fonts/HammersmithOne-Regular.ttf',
  variable: '--font-heading-var',
  weight: '400',
  display: 'swap',
});

// 2. Spectral — Prestigious editorial serif for engineering standards & certifications
const spectral = localFont({
  src: '../fonts/Spectral-Bold.ttf',
  variable: '--font-display-var',
  weight: '700',
  display: 'swap',
});

// 3. Jost — Clean, geometric modern sans for ultra-legible body copy
const jost = localFont({
  src: '../fonts/Jost-VariableFont_wght.ttf',
  variable: '--font-body-var',
  display: 'swap',
});

// 4. IBM Plex Mono — Technical tabular data, dimensions, and schedules
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RIO PIPES & FITTINGS By Reva Polyplast",
    template: "%s - RIO PIPES & FITTINGS By Reva Polyplast",
  },
  description:
    "Manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings. Durable plumbing solutions for clean water flow and long-lasting irrigation. Based in Rajkot, Gujarat.",
  keywords: [
    "RIO Pipes",
    "CPVC pipes",
    "UPVC pipes",
    "SWR pipes",
    "Agriculture pipes",
    "PVC fittings",
    "Reva Polyplast",
    "Rajkot",
    "plumbing solutions",
  ],
  openGraph: {
    title: "RIO PIPES & FITTINGS By Reva Polyplast",
    description:
      "Manufacturer of CPVC, UPVC, SWR & Agricultural pipes and fittings. Durable plumbing solutions for residential, commercial, and industrial needs across India.",
    type: "website",
    locale: "en_IN",
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
      className={`${hammersmith.variable} ${spectral.variable} ${jost.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Reva Polyplast",
              brand: "RIO Pipes & Fittings",
              url: "https://riopipes.com",
              foundingDate: "2015",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Plot No. G-2408/B, Road No. F-2, Almighty Gate, Metoda G.I.D.C.",
                addressLocality: "Rajkot",
                addressRegion: "Gujarat",
                postalCode: "360021",
                addressCountry: "IN",
              },
              telephone: "+919316928238",
              email: "info@riopipes.com",
              sameAs: [
                "https://www.facebook.com/Riopipesandfitting/",
                "https://www.instagram.com/reva.polyplast/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
        <SiteFooter />
        <StickyContactBar />
      </body>
    </html>
  );
}
