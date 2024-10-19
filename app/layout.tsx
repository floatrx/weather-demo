import localFont from 'next/font/local';
import Link from 'next/link';

import { Providers } from '@/components/context/providers';
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Providers>{children}</Providers>
        <footer className="container pb-4 text-sm">
          <p className="max-w-xl">
            &copy; Floatrx 2024 | Weather demo app. Nextjs14 + ShadCN + TailwindCSS (@container queries) + OpenWeatherMap API Source code:
            <Link className="px-2 underline" href="https://github.com/floatrx/weather-demo" rel="noopener" target="_blank">
              Weather-demo
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}
