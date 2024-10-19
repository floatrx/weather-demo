import dynamic from 'next/dynamic';

import WeatherForm from '@/components/form/WeatherForm';
import { WeatherDemos } from '@/components/WeatherDemos';

const ToggleTheme = dynamic(() => import('@/components/ToggleTheme'), { ssr: false });

export default async function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-[90%] space-y-4 py-8">
      <h1 className="text-2xl font-black">
        Weather / Widget <ToggleTheme />
      </h1>
      <WeatherForm />
      <WeatherDemos />
    </main>
  );
}
