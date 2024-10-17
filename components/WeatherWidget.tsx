'use client';

import { useClientGeoLoc } from '@/lib/hooks/useClientGeoLoc';

interface Props {}

export const WeatherWidget: FC<Props> = () => {
  const coordinates = useClientGeoLoc();

  return (
    <>
      <pre>
        <code>{JSON.stringify(coordinates, null, 2)}</code>
      </pre>
    </>
  );
};
