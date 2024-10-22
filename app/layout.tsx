import localFont from 'next/font/local';

import { ThemeProvider } from '@/components/context/ThemeProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { API_KEY } from '@/config/const';

import type { Metadata } from 'next';

import '../styles/globals.css';

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
  title: 'Weather widget | Demo',
  description: 'Just another demo Nextjs app',
  icons: [
    { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon.svg', type: 'mage/svg+xml' },
  ],
};

/**
 * This default root layout component includes
 * the main site layout components...
 * @param children
 * @constructor
 */
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="container space-y-2">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
