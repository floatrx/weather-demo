import { WeatherForm } from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { SimpleWeatherWidget } from '@/components/widget/SimpleWeatherWidget';
import { upperFirst, formatCityName } from '@/lib/utils/upperFirst';

export async function generateMetadata({ params }: { params: { cityName: string } }) {
  const { cityName } = params;
  const title = `Weather in ${upperFirst(cityName)} city | Weather Widget`;

  return { title, description: title };
}

interface Props {
  params: { cityName: string };
}

export default async function WeatherByCity({ params }: Props) {
  return (
    <>
      <Heading>Weather in {formatCityName(params.cityName)}</Heading>
      <SimpleWeatherWidget />
      <WeatherForm defaultValue={params.cityName} />
    </>
  );
}
