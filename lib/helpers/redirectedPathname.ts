import type { Locale } from '@/i18n-config';

export const redirectedPathname = (locale: Locale, pathname: string) => {
  if (!pathname) return '/';
  const segments = pathname.split('/');
  segments[1] = locale;
  return segments.join('/');
};
