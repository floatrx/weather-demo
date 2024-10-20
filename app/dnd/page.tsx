'use client';

import React, { useState } from 'react';

import { DraggableWidget, type DraggableWidgetProps } from '@/components/dragndrop/DraggableWidget';
import { WidgetsDropZone, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
import { cn } from '@/lib/utils/cn';

export default function Page() {
  const [currentSize, setCurrentSize] = useState<DropZoneSize>('1x1');
  const [dropZone, setDropZone] = useState<DropZoneSize | null>(null);

  const initial = currentSize === '1x1';
  const dropZoneSizes: DropZoneSize[] = ['2x2', '4x2', '4x4']; // to render drop zones

  const handleDragStart: DraggableWidgetProps['onDragStart'] = (e) => {
    if ('dataTransfer' in e) return;
    (e as DragEvent).dataTransfer!.setData('text/plain', 'widget');
  };

  const handleDrop = (size: DropZoneSize) => {
    setCurrentSize(size);
    setDropZone(size);
  };

  const WeatherWidget = () => {
    return (
      <DraggableWidget size={currentSize} onDragStart={handleDragStart}>
        <SimpleCard className={cn('', initial && 'p-0 min-w-fit min-h-fit')}>
          <CurrentForecast initial={initial} extended={currentSize === '4x4'} />
        </SimpleCard>
      </DraggableWidget>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-black">Drag and Drop Widgets</h1>
      {!dropZone && <WeatherWidget />}
      <div className="flex flex-col gap-5 mt-4">
        {dropZoneSizes.map((size) => (
          <WidgetsDropZone key={size} size={size} onDrop={handleDrop}>
            {dropZone === size && <WeatherWidget />}
          </WidgetsDropZone>
        ))}
      </div>
    </>
  );
}
