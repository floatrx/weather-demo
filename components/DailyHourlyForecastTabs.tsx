'use client';

import { Button } from '@/components/ui/Button';
import { DailyForecastList } from '@/components/DailyForecastList';
import { Grid, List } from 'lucide-react';
import { HourlyForecastTabs } from '@/components/HourlyForecastTabs';
import { SimpleTabs } from '@/components/ui/SimpleTabs';
import { useState } from 'react';

export const DailyHourlyForecastTabs: RC = () => {
  const [currentLayout, setLayout] = useState<'cards' | 'list'>('cards');

  // Switch between 'cards' and 'list' layout
  const toggleLayout = () => {
    setLayout((prev) => (prev === 'cards' ? 'list' : 'cards'));
  };

  // Cards/List icons
  const ToggleIcon = currentLayout === 'cards' ? Grid : List;

  return (
    <SimpleTabs
      extra={
        <Button size="xs" className="px-0" variant="ghost" onClick={toggleLayout}>
          <ToggleIcon size={22} />
        </Button>
      }
      tabs={[
        { id: 'd', title: 'Daily', content: <DailyForecastList layout={currentLayout} /> },
        { id: 'h', title: 'Hourly', content: <HourlyForecastTabs layout={currentLayout} /> },
      ]}
    />
  );
};
