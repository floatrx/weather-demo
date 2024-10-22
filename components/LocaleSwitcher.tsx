'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { COOKIES_LOCALE_KEY } from '@/config/const';
import { i18n, type Locale } from '@/i18n-config';
import { setCookie } from '@/lib/helpers/cookies';
import { redirectedPathname } from '@/lib/helpers/redirectedPathname';

export function LocaleSwitcher() {
  const pathname = usePathname();

  // TODO: Double think about this approach
  const storeLocaleToCookies = (locale: Locale) => {
    setCookie(COOKIES_LOCALE_KEY, locale);
  };

  return (
    <ul className="flex gap-3">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link onClick={() => storeLocaleToCookies(locale)} href={redirectedPathname(locale, pathname)}>
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
