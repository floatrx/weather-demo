import { FC } from 'react';
import dayjs from 'dayjs';
import { cn } from '@/lib/utils/cn';

interface DateTimeProps {
  timestamp: number;
  format?: string;
  className?: string;
}

export const DateTime: FC<DateTimeProps> = ({ timestamp, format = 'D MMM', className }) => {
  const formattedDate = dayjs.unix(timestamp).format(format);

  return <span className={cn('text-nowrap opacity-55', className)}>{formattedDate}</span>;
};
