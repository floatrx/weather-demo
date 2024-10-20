'use client';

import React, { useState } from 'react';

import { Widget, type WidgetProps } from '@/components/dragndrop/Widget';
import { WidgetsDropZone, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
import { DailyHourlyForecastTabs } from '@/components/widget/DailyHourlyForecastTabs';
import { cn } from '@/lib/utils/cn';

export default function Page() {
  const [currentSize, setCurrentSize] = useState<DropZoneSize>('1x1');
  const [dropZone, setDropZone] = useState<DropZoneSize | null>(null);
  const initial = currentSize === '1x1';

  const handleDragStart: WidgetProps['onDragStart'] = (e) => {
    if ('dataTransfer' in e) return;
    if ('dataTransfer' in e) {
      (e as DragEvent).dataTransfer!.setData('text/plain', 'widget');
    }
  };

  const handleDrop = (size: DropZoneSize) => {
    setCurrentSize(size);
    setDropZone(size);
  };

  const WeatherWidget = () => {
    return (
      <Widget size={currentSize} onDragStart={handleDragStart}>
        <SimpleCard className={cn('max-h-[500px] max-w-[520px]', initial && 'p-0 min-w-fit min-h-fit')}>
          <CurrentForecast initial={initial} extra={currentSize === '4x4' && <DailyHourlyForecastTabs />} />
        </SimpleCard>
      </Widget>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-black">Drag and Drop Widgets</h1>
      {!dropZone && <WeatherWidget />}
      <div className="flex flex-col gap-5 mt-4">
        <WidgetsDropZone size="2x2" onDrop={handleDrop}>
          {dropZone === '2x2' && <WeatherWidget />}
        </WidgetsDropZone>
        <WidgetsDropZone size="4x2" onDrop={handleDrop}>
          {dropZone === '4x2' && <WeatherWidget />}
        </WidgetsDropZone>
        <WidgetsDropZone size="4x4" onDrop={handleDrop}>
          {dropZone === '4x4' && <WeatherWidget />}
        </WidgetsDropZone>
      </div>
    </>
  );
}
