'use client';

import { useState } from 'react';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const WeatherForm = () => {
  const { requestLocation } = useWeatherContext();
  const [cityName, setCityName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    requestLocation(cityName);
  };

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md gap-2">
      <Input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="Enter city name" />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default WeatherForm;
