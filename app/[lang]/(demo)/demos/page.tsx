import { WeatherForm } from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { WeatherDemos } from '@/components/WeatherDemos';

export default async function Demo() {
  return (
    <>
      <Heading>Weather demos</Heading>
      <WeatherForm />
      <WeatherDemos />
    </>
  );
}
