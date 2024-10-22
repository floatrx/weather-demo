import localFont from 'next/font/local';

import { LocaleProvider } from '@/components/context/LocaleProvider';
import { ThemeProvider } from '@/components/context/ThemeProvider';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { API_KEY } from '@/config/const';
import { type Locale, i18n } from '@/i18n-config';
import { getDictionary } from '@/lib/i18n/getDictionary';

import type { Metadata } from 'next';

import '../../styles/globals.css';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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
 * @param params - includes the current locale
 * @constructor
 */
export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { lang: Locale } }>) {
  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LocaleProvider lang={params.lang} dict={dict}>
            <Header />
            <main className="container space-y-2">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
