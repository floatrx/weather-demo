import { fetchWeatherData } from '@/lib/api/openWeatherMap';
import { API_KEY } from '@/config/const';
import { WeatherWidget } from '@/components/WeatherWidget';

export default async function Home() {
  const weatherData = await fetchWeatherData('London');

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <WeatherWidget />
        <pre>
          <code>{JSON.stringify(weatherData, null, 2)}</code>
        </pre>
        <p>{API_KEY}</p>
      </main>
    </div>
  );
}
