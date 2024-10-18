import { WeatherDemos } from '@/components/WeatherDemos';
import WeatherForm from '@/components/form/WeatherForm';

export default async function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[90%] space-y-4 py-8">
      <h1>Weather / Widget</h1>
      <WeatherForm />
      <WeatherDemos />
    </main>
  );
}
