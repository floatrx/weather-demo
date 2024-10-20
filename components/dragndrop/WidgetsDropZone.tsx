'use client';

import React from 'react';

import { cn } from '@/lib/utils/cn';

export type DropZoneSize = '2x2' | '4x2' | '4x4' | '1x1';

interface WidgetsDropZoneProps {
  size: DropZoneSize;
  onDrop: (size: DropZoneSize) => void;
  children?: React.ReactNode;
}

export const sizeStyles: Record<DropZoneSize, string> = {
  '2x2': 'w-[190px] h-[190px]',
  '4x2': 'w-[560px] h-[190px]',
  '4x4': 'w-[560px] h-[370px]',
  '1x1': 'w-[80px] h-[80px]',
};

export const WidgetsDropZone: React.FC<WidgetsDropZoneProps> = ({ size, onDrop, children }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(size);
  };

  const handleClick = () => {
    onDrop(size);
  };

  return (
    <div
      className={cn(
        `flex rounded items-center justify-center max-w-full ${sizeStyles[size]}`,
        !children && 'border-2 border-dashed border-gray-400/30',
      )}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {children || `(${size})`}
    </div>
  );
};
