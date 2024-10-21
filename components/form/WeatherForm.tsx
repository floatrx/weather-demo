'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';

/**
 * This form manages the city name only.
 * On submit, it will call the requestLocation function from the context,
 * which will fetch the weather data from the API and update the context state values.
 */
const WeatherForm: RC<{ defaultValue?: string }> = ({ defaultValue }) => {
  const { requestLocation } = useWeatherContext();
  const [cityName, setCityName] = useState(defaultValue || '');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { success } = CityNameSchema.safeParse(cityName);
    if (!success) return;

    requestLocation(cityName);
    router.replace(`/${cityName.trim().toLowerCase()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
      <Input
        autoFocus
        className="max-w-[200px]"
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        placeholder="Enter city name"
      />
      <Button variant="outline" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default WeatherForm;
