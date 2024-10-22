'use client';

import { Lock, Unlock } from 'lucide-react';
import React, { useState } from 'react';

import { type DropZoneSize, WidgetsDropZone } from '@/components/dragndrop/WidgetsDropZone';
import { Button } from '@/components/ui/Button';
import { DraggableWeatherWidget } from '@/components/widget/DraggableWeatherWidget';

/**
 * Draggable widget demo view
 * Demonstrates drag and drop widgets between 3 drop zones
 * Uses DraggableWidget and WidgetsDropZone components & framer-motion for animations and drag and drop
 * @constructor
 */
export const DraggableWidgetDemo: FC = () => {
  const [dropZone, setDropZone] = useState<DropZoneSize | null>(null);
  const [canDrag, setCanDrag] = useState(true);

  const dropZoneSizes: DropZoneSize[] = ['2x2', '4x2', '4x4']; // to render drop zones

  const toggleDrag = () => setCanDrag(!canDrag);

  const resetToInitial = () => {
    setDropZone(null);
  };

  const moveToDropZone = (dropzoneSize: DropZoneSize) => {
    setDropZone(dropzoneSize);
  };

  const draggableWidgetProps = {
    canDrag,
    onDropCancel: resetToInitial,
    onDropSuccess: moveToDropZone,
  };

  console.log('render DraggableWidgetDemo');

  return (
    <>
      {/* Toggle drag feature */}
      <Button
        className="fixed right-2 top-2"
        size="icon"
        variant={canDrag ? 'outline' : 'default'}
        onClick={toggleDrag}
        title="Toggle drag mode"
      >
        {canDrag ? <Unlock /> : <Lock />}
      </Button>

      {/* Initial widget as icon */}
      {!dropZone && <DraggableWeatherWidget size="1x1" {...draggableWidgetProps} />}

      {/* Render DropZones */}
      <div className="flex flex-col gap-5 mt-4">
        {dropZoneSizes.map((size) => (
          <WidgetsDropZone key={size} size={size} onClick={moveToDropZone}>
            {dropZone === size && <DraggableWeatherWidget size={size} {...draggableWidgetProps} />}
          </WidgetsDropZone>
        ))}
      </div>
    </>
  );
};
