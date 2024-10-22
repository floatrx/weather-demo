import React from 'react';

import { DraggableWidgetDemo } from '@/components/DraggableWidgetDemo';
import { Heading } from '@/components/ui/Heading';

export default function Page() {
  return (
    <>
      <Heading>Drag and Drop Widgets</Heading>
      <DraggableWidgetDemo />
    </>
  );
}
