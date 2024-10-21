import React from 'react';

import { type DraggableWidgetProps, DraggableWidget } from '@/components/dragndrop/DraggableWidget';
import { type DropZoneSize, sizeStyles } from '@/components/dragndrop/WidgetsDropZone';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
import { cn } from '@/lib/utils/cn';

interface DraggableWeatherWidgetProps {
  size: DropZoneSize;
  canDrag?: boolean;
  onDropCancel: () => void;
  onDropSuccess: (size: DropZoneSize) => void;
}

export const DraggableWeatherWidget: RC<DraggableWeatherWidgetProps> = ({ size, canDrag, onDropCancel, onDropSuccess }) => {
  const isInitial = size === '1x1';

  const handleDragEnd: DraggableWidgetProps['onDragEnd'] = (info) => {
    const { point } = info;
    for (const [id] of Object.entries(sizeStyles)) {
      const target = document.getElementById(id);
      if (!target) {
        onDropCancel();
        return;
      }
      const rect = target.getBoundingClientRect();

      // Try to find the drop zone
      if (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom) {
        console.log('Drop to:', id);
        onDropSuccess(id as DropZoneSize);
        return true;
      }
    }
  };

  return (
    <DraggableWidget size={size} drag={canDrag} onDragEnd={handleDragEnd}>
      <SimpleCard className={cn('', isInitial && 'p-0 min-w-fit min-h-fit')}>
        <CurrentForecast initial={isInitial} extended={size === '4x4'} />
      </SimpleCard>
    </DraggableWidget>
  );
};
