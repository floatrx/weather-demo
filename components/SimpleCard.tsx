import { cn } from '@/lib/utils/cn';
import React from 'react';

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
  <section className={cn(`@container card min-w-[170px] max-w-lg flex-1 select-none rounded-lg p-4 shadow-md`, className)} {...props}>
    {title && (
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">{title}</h2>
      </div>
    )}
    {children}
  </section>
);
