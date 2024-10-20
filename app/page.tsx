import WeatherForm from '@/components/form/WeatherForm';
import { WeatherDemos } from '@/components/WeatherDemos';

export default async function Home() {
  return (
    <>
      <h1 className="text-2xl font-black">Weather / Widget</h1>
      <WeatherForm />
      <WeatherDemos />
    </>
  );
}
