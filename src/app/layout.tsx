import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const anybodyCondensed = localFont({
  src: './fonts/Anybody-Font.ttf',
  variable: '--font-anybody-condensed',
  weight: '100 900',
});

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Kacper Szarkiewicz',
  description:
    'Personal website of Kacper Szarkiewicz (Sharqi) - Frontend Engineer specializing in blockchain technologies',
  authors: [{ name: 'Kacper Szarkiewicz', url: 'https://szarkiewicz.com' }],
  keywords: [
    'developer',
    'blockchain',
    'web development',
    'full stack',
    'software engineer',
    'frontend engineer',
    'frontend developer',
    'blockchain engineer',
    'blockchain developer',
    'web3',
    'web3 developer',
    'web3 engineer',
    'frontend',
    'blockchain',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'szarkiewicz.com',
    description: 'Personal website of Kacper Szarkiewicz (Sharqi)',
    url: 'https://szarkiewicz.com',
    siteName: 'szarkiewicz.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'szarkiewicz.com',
    description: 'Personal website of Kacper Szarkiewicz (Sharqi)',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${anybodyCondensed.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
