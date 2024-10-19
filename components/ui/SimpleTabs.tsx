'use client';

import { useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';

interface TabsProps {
  tabs: {
    id: string;
    title: ReactNode;
    content: ReactNode;
  }[];
  classNames?: {
    buttons?: string;
    wrapper?: string;
    content?: string;
  };
  extra?: ReactNode;
}

/**
 * Simple tabs to display widget content
 * @param tabs - { id, title, content }
 * @param classNames - { buttons, wrapper, content } (optional)
 * @param extra - Extra content to display after tabs
 * @constructor
 */
export const SimpleTabs = ({ tabs, classNames = {}, extra }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id);

  if (!tabs) return null;

  return (
    <div className={cn('overflow-visible', classNames?.wrapper)}>
      {/* Tabs buttons */}
      <ol className={cn('my-1 flex w-full items-center gap-1 overflow-x-auto', classNames?.buttons)}>
        {tabs?.map(({ id, title }) => (
          <li key={id}>
            <Button
              size="xs"
              variant="ghost"
              className={cn(
                'rounded-md border duration-100 ease-out',
                activeTab === id ? 'border-gray-600 bg-gray-800' : 'border-gray-700/60',
              )}
              onClick={() => setActiveTab(id)}
            >
              {title}
            </Button>
          </li>
        ))}
        <li className="flex-1" />
        {extra && <li className="mt-1">{extra}</li>}
      </ol>
      {/* Tabs content */}
      {tabs?.map(({ id, content }) => (
        <div key={id} className={cn(classNames?.content)} style={{ display: activeTab === id ? 'block' : 'none' }}>
          {content}
        </div>
      ))}
    </div>
  );
};
