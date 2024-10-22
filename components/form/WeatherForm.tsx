'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { useLocale } from '@/components/context/LocaleProvider';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getCoordinatesByCityName } from '@/lib/api/openWeatherMap';
import { CityNameSchema } from '@/lib/zod/cityNameSchema';

/**
 * This form manages the city name only.
 * On submit, it will call the requestLocation function from the context,
 * which will fetch the weather data from the API and update the context state values.
 */
export const WeatherForm: RC<{ defaultValue?: string }> = ({ defaultValue }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { requestLocation } = useWeatherContext();
  const [cityName, setCityName] = useState(defaultValue || '');
  const router = useRouter();
  const { dict, lang } = useLocale();

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const { success } = CityNameSchema.safeParse(cityName);
      if (!success) return;

      try {
        await getCoordinatesByCityName(cityName);
        await requestLocation(cityName);
        router.replace(`/${lang}/${cityName.trim().toLowerCase()}`, { scroll: false });
      } catch (e) {
        if (!(e instanceof Error)) return;
        setErrorMsg(e.message);
      }
    },
    [cityName, requestLocation, router],
  );

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
    setErrorMsg(null);
  }, []);

  return (
    <>
      <form key="form" onSubmit={handleSubmit} className="flex max-w-md gap-2 animate-show delay-100">
        <Input className="max-w-[200px]" type="text" value={cityName} onChange={handleChange} placeholder={dict.form.enterCityName} />
        <Button variant="outline" type="submit" size="lg" className="px-4 text-md">
          {dict.form.submit}
        </Button>
      </form>
      {errorMsg && (
        <p className="b1 animate-show flex items-center text-sm px-2 rounded-md text-red-400 font-black self-center max-w-fit">
          {errorMsg}
        </p>
      )}
    </>
  );
};
