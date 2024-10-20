import React from 'react';

import { cn } from '@/lib/utils/cn';

interface CardProps extends ComponentProps<'section'> {
  className?: string;
  title?: string;
}

/**
 * Simple card component with title and icon
 * Section contains a class @container
 * @param children - content
 * @param className - extra classes
 * @param title - card title (optional)
 * @constructor
 */
export const SimpleCard: FC<CardProps> = ({ children, className, title, ...props }) => (
  <section className={cn(`card min-w-[170px] max-w-[590px] flex-1 select-none @container min-h-[160px] p-4`, className)} {...props}>
    {title && (
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">{title}</h2>
      </div>
    )}
    {children}
  </section>
);
