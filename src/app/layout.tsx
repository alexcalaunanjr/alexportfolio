import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cairo, Cabin } from 'next/font/google';
import './globals.css';
// providers
import QueryProvider from '@/components/providers/QueryProvider';
import { Toaster } from '@/components/ui/sonner';
// analytics
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
// nonce
import { getNonce } from '@/lib/server-nonce';

// fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['latin'],
});

const cabin = Cabin({
  variable: '--font-cabin',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alex Calaunan Jr',
  description:
    'Full-Stack Web Developer building scalable solutions with the user in mind, and my expertise lie React, Next.js, Vite, and Node.js. Interested in Agentic AI',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = await getNonce();

  return (
    <html lang='en'>
      <head>
        {/* Include nonce in meta tag for client-side access */}
        <meta name='csp-nonce' content={nonce} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.className} ${cabin.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>

        {/* sonner toast */}
        <Toaster richColors closeButton />

        {/* analytics and insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
