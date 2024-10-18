'use client';

import { useState } from 'react';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

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
