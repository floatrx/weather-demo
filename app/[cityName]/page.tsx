import { WeatherForm } from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';
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
  return (
    <>
      <Heading>Weather in {upperFirst(params.cityName)}</Heading>
      <SimpleCard className="w-full max-h-[380px] animate-show">
        <CurrentForecast extended />
      </SimpleCard>
      <WeatherForm defaultValue={params.cityName} />
    </>
  );
}
