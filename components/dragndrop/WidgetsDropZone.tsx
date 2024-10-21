'use client';

import React, { memo } from 'react';

import { cn } from '@/lib/utils/cn';

export type DropZoneSize = '2x2' | '4x2' | '4x4' | '1x1';

interface WidgetsDropZoneProps {
  size: DropZoneSize;
  onClick?: (size: DropZoneSize) => void;
}

export const sizeStyles: Record<DropZoneSize, string> = {
  '2x2': 'w-[190px] h-[190px]',
  '4x2': 'w-[560px] h-[190px]',
  '4x4': 'w-[560px] h-[370px]',
  '1x1': 'w-[80px] h-[80px]',
};

/**
 * Widgets drop zone - used for drag and drop
 * On widget drag end, it will try to find the drop zone in the document and place the widget there
 * @param size - drop zone size
 * @param onClick - callback when drop zone is clicked (optional)
 * @param children - widget content
 * @constructor
 */
export const WidgetsDropZone: FC<WidgetsDropZoneProps> = memo(({ size, onClick, children }) => {
  return (
    <div
      id={size} // required for drag and drop (framer-motion) -> used for find drop zone via document.getElementById
      className={cn(
        `flex rounded items-center justify-center max-w-full ${sizeStyles[size]}`,
        !children && 'border-2 border-dashed border-gray-400/30',
      )}
      onClick={() => onClick?.(size)}
    >
      {children || `(${size})`}
    </div>
  );
});
