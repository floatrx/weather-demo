import dayjs from 'dayjs';
import dayjsEn from 'dayjs/locale/en';
import dayjsUk from 'dayjs/locale/uk';

import { useLocale } from '@/components/context/LocaleProvider';

import type { Locale } from '@/i18n-config';

const dayjsLocale: Record<Locale, ILocale> = {
  en: dayjsEn,
  uk: dayjsUk,
};

export const useDayjs = () => {
  const { lang } = useLocale();
  dayjs.locale(dayjsLocale[lang]);
  return dayjs;
};
