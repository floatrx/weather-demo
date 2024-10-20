'use client';

import { motion, type PanInfo } from 'framer-motion';

import { sizeStyles, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { cn } from '@/lib/utils/cn';

export interface DraggableWidgetProps {
  size: DropZoneSize;
  onDragStart: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

/**
 * Draggable widget component wrapped with framer-motion
 * @param size - size of the widget (1x1, 2x2, 4x2, 4x4)
 * @param onDragStart
 * @param children - contend
 * @constructor
 */
export const DraggableWidget: FC<DraggableWidgetProps> = ({ size, onDragStart, children }) => {
  return (
    <motion.div
      layout
      layoutId="widget"
      className={cn('cursor-move overflow-hidden active:scale-95', sizeStyles[size])}
      whileDrag={{ scale: 0.5 }}
      draggable
      onDragStart={onDragStart}
    >
      {children}
    </motion.div>
  );
};
