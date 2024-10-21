import { useParams } from 'next/navigation';

export const useCityNameFromParams = (): string | undefined => {
  const { cityName } = useParams();
  return typeof cityName === 'string' ? cityName : undefined;
};
