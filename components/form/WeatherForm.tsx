'use client';

import { useState } from 'react';

import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * This form manages the city name only.
 * On submit, it will call the requestLocation function from the context,
 * which will fetch the weather data from the API and update the context state values.
 */
const WeatherForm = () => {
  const { requestLocation } = useWeatherContext();
  const [cityName, setCityName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    requestLocation(cityName);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
      <Input
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
