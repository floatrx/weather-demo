'use client';

import { motion, type PanInfo, useAnimationControls } from 'framer-motion';

import { sizeStyles, type DropZoneSize } from '@/components/dragndrop/WidgetsDropZone';
import { cn } from '@/lib/utils/cn';

export interface DraggableWidgetProps {
  size: DropZoneSize;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void | boolean;
}

/**
 * Draggable widget component wrapped with framer-motion
 * @param size - size of the widget (1x1, 2x2, 4x2, 4x4)
 * @param onDragStart
 * @param children - contend
 * @constructor
 */
export const DraggableWidget: FC<DraggableWidgetProps> = ({ size, onDragEnd, children }) => {
  const controls = useAnimationControls();

  return (
    <div className="relative size-full">
      <motion.div
        layout
        animate={controls}
        layoutId="widget"
        className={cn('cursor-move max-w-full', sizeStyles[size])}
        whileDrag={{ scale: 0.9 }}
        drag
        dragElastic={false}
        onDragEnd={(e, panInfo) => {
          onDragEnd(e, panInfo);
          // Little hack to return widget to the initial position
          controls.start({ scale: 1, x: 0, y: 0 }).then();
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
