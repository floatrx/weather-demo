/**
 * This middleware is used to redirect users to the correct
 * locale based on their browser settings.
 * Code was taken from the Next.js documentation
 */
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIES_LOCALE_KEY } from '@/config/const';

import { i18n } from './i18n-config';

import type { NextRequest } from 'next/server';

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-expect-error
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-locale matcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = cookies().get(COOKIES_LOCALE_KEY)?.value || getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|ico).*)'],
};
