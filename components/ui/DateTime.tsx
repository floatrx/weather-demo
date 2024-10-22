import { FC } from 'react';

import { useLocale } from '@/components/context/LocaleProvider';
import { useDayjs } from '@/lib/dayjs';
import { cn } from '@/lib/utils/cn';

import type { Locale } from '@/i18n-config';

interface DateTimeProps {
  timestamp: number;
  format?: string;
  className?: string;
}

const processFormat = (format: string, lang: Locale) => {
  if (lang === 'uk') {
    return format.replace('h A', 'HH:mm');
  }
  return format;
};

export const DateTime: FC<DateTimeProps> = ({ timestamp, format = 'D MMM', className }) => {
  const { lang } = useLocale();

  const dayjs = useDayjs();
  const formattedDate = dayjs.unix(timestamp).format(processFormat(format, lang));

  return <span className={cn('text-nowrap opacity-55 capitalize', className)}>{formattedDate}</span>;
};
