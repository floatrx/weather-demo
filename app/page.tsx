import { fetchWeatherDataByCityName } from '@/lib/api/openWeatherMap';
import { API_KEY } from '@/config/const';
import { WeatherView } from '@/components/WeatherView';
import WeatherForm from '@/components/form/WeatherForm';

export default async function Home() {
  const weatherData = await fetchWeatherDataByCityName('Rivne');

  if (!weatherData) {
    return <div className="text-center">Loading...</div>;
  }

  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-[90%] space-y-4 py-8">
      <WeatherForm />
      <WeatherView />
    </main>
  );
}
