import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tawhid Connected - Communauté Musulmane',
    template: '%s | Tawhid Connected',
  },
  description:
    'Plateforme communautaire dédiée aux musulmans sunnites. Accédez à des contenus religieux de qualité, participez aux événements et posez vos questions aux oustazes.',
  keywords: [
    'islam',
    'musulman',
    'communauté',
    'oustaze',
    'audio islamique',
    'vidéo islamique',
    'association musulmane',
    'sénégal',
    'tawhid',
  ],
  authors: [{ name: 'Tawhid Connected' }],
  creator: 'Tawhid Connected',
  publisher: 'Tawhid Connected',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tawhid-connected.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://tawhid-connected.com',
    title: 'Tawhid Connected - Communauté Musulmane',
    description:
      'Plateforme communautaire dédiée aux musulmans sunnites. Accédez à des contenus religieux de qualité.',
    siteName: 'Tawhid Connected',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tawhid Connected',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawhid Connected - Communauté Musulmane',
    description:
      'Plateforme communautaire dédiée aux musulmans sunnites. Accédez à des contenus religieux de qualité.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
