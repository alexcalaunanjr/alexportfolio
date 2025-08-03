import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cairo, Cabin } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
// analytics
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  description: 'Full-Stack Web Developer building robust and scalable solutions with expertise in React, Next.js, and Node.js. Passionate about Agentic AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.className} ${cabin.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
        
        {/* analytics and insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
