import type { ICurrentWeather } from '@/types/openWeatherMap';
import { InfoRow } from '@/components/InfoRow';
import { Pencil } from 'lucide-react';
import { Temperature } from '@/components/Temperature';
import { WeatherIcon } from '@/components/WeatherIcon';
import { upperFirst } from '@/lib/utils/upperFirst';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';

interface CurrentForecastProps {
  current: ICurrentWeather;
  title: string;
  extra?: React.ReactNode;
}

export const CurrentForecast: FC<CurrentForecastProps> = ({ current, title, children, extra }) => {
  const { location } = useWeatherContext();
  return (
    <>
      <section className="@6xl:gap-4 flex items-center">
        {/* Default info */}
        <div className="flex-1">
          <header className="@md:flex-row flex flex-col items-center justify-between">
            <div className="@md:text-left group max-w-full flex-1 text-center">
              <h2 className="flex flex-1 items-center text-2xl font-semibold leading-none">{location.cityName}</h2>
              <p className="@xs:block hidden text-sm opacity-50">{upperFirst(current.weather[0].description)}</p>
            </div>
            <WeatherIcon
              condition={current.weather[0]}
              className="@xs:-my-2 @lg:size-[100px] -my-3 mx-auto size-[80px] max-h-fit transition-all"
            />
          </header>
          <div className="@sm:flex-row @xs:gap-2 @xs:text-left flex flex-col text-center [&_p]:flex-1">
            <InfoRow label="Temperature" classNames={{ value: 'text-3xl @sm:text-xl' }}>
              <Temperature value={current.temp} />
            </InfoRow>
            <InfoRow className="@md:flex hidden" label="Feels Like">
              <Temperature value={current.feels_like} />
            </InfoRow>
            <InfoRow className="@lg:flex hidden" label="Humidity">
              {current.humidity}%
            </InfoRow>
            <InfoRow className="@3xl:flex hidden" label="Wind Speed">
              {current.wind_speed} m/s
            </InfoRow>
          </div>
        </div>
        {/* Visible only for wide @container */}
        {children && (
          <footer className="@6xl:flex @6xl:flex-1 @container hidden items-center border-l border-gray-700/30 pl-2">{children}</footer>
        )}
      </section>
      {extra}
    </>
  );
};
