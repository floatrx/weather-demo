import localFont from 'next/font/local';

import { Providers } from '@/components/context/providers';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { API_KEY } from '@/config/const';
import { fetchWeatherDataByCoordinates } from '@/lib/api/openWeatherMap';
import { readLocationFromCookies } from '@/lib/helpers/readLocationFromCookies';

import type { TWeatherContextDefaults } from '@/types/widget';
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  // Get location info from cookies -> fetch weather data -> pass to widget context as defaults
  const location = await readLocationFromCookies();
  let defaults: TWeatherContextDefaults = null;
  if (location) {
    const weatherData = await fetchWeatherDataByCoordinates(location.coordinates);
    defaults = { location, weatherData };
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <Providers defaultWeatherData={defaults}>
          <Header />
          <main className="container space-y-2">{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
