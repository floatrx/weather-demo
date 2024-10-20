'use client';

import { Lock, Unlock } from 'lucide-react';
import React, { useState } from 'react';

import { type DraggableWidgetProps, DraggableWidget } from '@/components/dragndrop/DraggableWidget';
import { type DropZoneSize, sizeStyles, WidgetsDropZone } from '@/components/dragndrop/WidgetsDropZone';
import { Button } from '@/components/ui/Button';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
import { cn } from '@/lib/utils/cn';

interface Props {}

/**
 * Draggable widget demo view
 * Demonstrates drag and drop widgets between 3 drop zones
 * Uses DraggableWidget and WidgetsDropZone components & framer-motion for animations and drag and drop
 * @constructor
 */
export const DraggableWidgetDemo: FC<Props> = () => {
  const [currentSize, setCurrentSize] = useState<DropZoneSize>('1x1');
  const [dropZone, setDropZone] = useState<DropZoneSize | null>(null);
  const [canDrag, setCanDrag] = useState(true);

  const initial = currentSize === '1x1';
  const dropZoneSizes: DropZoneSize[] = ['2x2', '4x2', '4x4']; // to render drop zones

  const toggleDrag = () => setCanDrag(!canDrag);

  const resetToInitial = () => {
    setDropZone(null);
    setCurrentSize('1x1');
  };

  const handleDragEnd: DraggableWidgetProps['onDragEnd'] = (e, info) => {
    const { point } = info;
    for (const [size] of Object.entries(sizeStyles)) {
      const target = document.getElementById(size);
      if (!target) {
        resetToInitial();
        return;
      }
      const rect = target.getBoundingClientRect();

      // Try to find the drop zone
      if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
        setCurrentSize(size as DropZoneSize);
        setDropZone(size as DropZoneSize);
        return true;
      }
    }
  };

  const handleClick = (size: DropZoneSize) => {
    setCurrentSize(size);
    setDropZone(size);
  };

  const WeatherWidget = () => {
    return (
      <DraggableWidget drag={canDrag} size={currentSize} onDragEnd={handleDragEnd}>
        <SimpleCard className={cn('', initial && 'p-0 min-w-fit min-h-fit')}>
          <CurrentForecast initial={initial} extended={currentSize === '4x4'} />
        </SimpleCard>
      </DraggableWidget>
    );
  };

  return (
    <>
      <Button className="fixed right-2 top-2" size="icon" variant="outline" onClick={toggleDrag} title="Toggle drag mode">
        {canDrag ? <Unlock /> : <Lock />}
      </Button>
      {!dropZone && <WeatherWidget />}
      <div className="flex flex-col gap-5 mt-4">
        {dropZoneSizes.map((size) => (
          <WidgetsDropZone key={size} size={size} onClick={handleClick}>
            {dropZone === size && <WeatherWidget />}
          </WidgetsDropZone>
        ))}
      </div>
    </>
  );
};
