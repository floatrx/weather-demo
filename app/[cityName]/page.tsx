import WeatherForm from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
import { fetchWeatherByCityName } from '@/lib/api/openWeatherMap';
import { upperFirst } from '@/lib/utils/upperFirst';

export async function generateMetadata({ params }: { params: { cityName: string } }) {
  const { cityName } = params;
  const title = `Weather in ${upperFirst(cityName)} city | Weather Widget`;

  return { title, description: title };
}

interface Props {
  params: { cityName: string };
}

export default async function WeatherByCity({ params }: Props) {
  // Prefetch weather data for the city (SSR)
  const weatherData = await fetchWeatherByCityName(upperFirst(params.cityName));
  return (
    <>
      <Heading>Weather in {upperFirst(params.cityName)}</Heading>
      <WeatherForm defaultValue={params.cityName} />
      <SimpleCard className="max-h-[500px] max-w-[520px]">
        <CurrentForecast defaultWeatherData={weatherData} extended />
      </SimpleCard>
    </>
  );
}
