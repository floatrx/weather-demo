import { cn } from '@/lib/utils/cn';
import React from 'react';

interface CardProps {
  className?: string;
  title?: string;
  icon?: React.ReactNode;
}

export const SimpleCard: FC<CardProps> = ({ children, className, title, icon }) => (
  <section className={cn(`@container card min-w-[170px] max-w-lg flex-1 rounded-lg p-4 shadow-md`, className)}>
    {title && (
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold">
          {icon}
          {title}
        </h2>
      </div>
    )}
    {children}
  </section>
);
