import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Cursor } from '../components/shared/Cursor';
import { MotionProvider } from '../components/layout/MotionProvider';
import { SITE } from '../constants/site';
import { IMAGES } from '../constants/images';

// Self-hosted at build time: no render-blocking request to Google, no layout shift.
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

const defaultTitle = `${SITE.name} — ${SITE.tagline}`;
const ogImage = IMAGES.TEAM_COLLABORATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: defaultTitle, template: `%s | ${SITE.name}` },
  description: SITE.subline,
  applicationName: SITE.name,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    title: defaultTitle,
    description: SITE.subline,
    images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: `${SITE.name} team` }]
  },
  twitter: { card: 'summary_large_image', title: defaultTitle, description: SITE.subline, images: [ogImage.src] }
};

export const viewport: Viewport = {
  themeColor: '#f8fafc'
};

const jsonLd = [
{
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/icon.svg`,
  description: SITE.subline,
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phoneIntl,
    contactType: 'customer service',
    email: SITE.email
  },
  sameAs: SITE.socials.map((s) => s.href)
},
{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: SITE.name,
  description: SITE.subline,
  publisher: { '@id': `${SITE.url}/#organization` }
}];


export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative min-h-screen w-full bg-bg font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <MotionProvider>
          <Cursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>);

}
