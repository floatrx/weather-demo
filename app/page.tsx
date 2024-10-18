import { fetchMockWeatherData } from '@/lib/api/openWeatherMap';
import { API_KEY } from '@/config/const';
import { WeatherView } from '@/components/WeatherView';

export default async function Home() {
  const weatherData = await fetchMockWeatherData('London');

  if (!weatherData) {
    return <div className="text-center">Loading...</div>;
  }

  if (!API_KEY) {
    return <div className="text-center">API key not provided</div>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-[90%] space-y-4 py-8">
      <WeatherView weatherData={weatherData} />
    </main>
  );
}
