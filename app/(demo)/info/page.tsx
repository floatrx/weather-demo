import { WeatherForm } from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { SimpleWeatherWidget } from '@/components/widget/SimpleWeatherWidget';

export default async function Demo() {
  return (
    <>
      <Heading>Summary info</Heading>
      <WeatherForm />
      <p className="max-w-lg animate-show delay-150">
        This is a Next.js] project demonstrating the use of the OpenWeatherMap API to display the current weather in a city. Weather widget
        adaptively changes its appearance based on the parent container&#39;s width.
      </p>
      <p className="max-w-lg animate-show delay-200">
        This page is a simple example of how to use the WeatherWidgetProvider context to provide weather data to the SimpleWeatherWidget
        component.
      </p>
      <SimpleWeatherWidget />
    </>
  );
}
