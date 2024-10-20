'use client';

import { motion, type PanInfo } from 'framer-motion';

import { sizeStyles, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { cn } from '@/lib/utils/cn';

export interface WidgetProps {
  size: DropZoneSize;
  onDragStart: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export const Widget: FC<WidgetProps> = ({ size, onDragStart, children }) => {
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
