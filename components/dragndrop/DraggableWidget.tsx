'use client';

import { motion, type PanInfo, useAnimationControls } from 'framer-motion';
import { memo } from 'react';

import { sizeStyles, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { cn } from '@/lib/utils/cn';

export interface DraggableWidgetProps {
  size: DropZoneSize;
  onDragEnd: (info: PanInfo) => void | boolean;
  drag?: boolean;
}

/**
 * Draggable widget component wrapped with framer-motion
 * @param size - size of the widget (1x1, 2x2, 4x2, 4x4)
 * @param onDragStart
 * @param children - contend
 * @constructor
 */
export const DraggableWidget: FC<DraggableWidgetProps> = memo(({ drag, size, onDragEnd, children }) => {
  const controls = useAnimationControls();

  console.log('render DraggableWidget');

  return (
    <div className="relative size-full">
      <motion.div
        layout
        animate={controls}
        layoutId="widget"
        className={cn('max-w-full', drag && 'cursor-move active:cursor-grabbing', sizeStyles[size])}
        whileDrag={{ scale: 0.9 }}
        drag={drag}
        dragElastic={false}
        onDragEnd={(_event, panInfo) => {
          onDragEnd(panInfo);
          // Little hack to return widget to the initial position
          controls.start({ scale: 1, x: 0, y: 0 }).then();
        }}
      >
        {children}
      </motion.div>
    </div>
  );
});
