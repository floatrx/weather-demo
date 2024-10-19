import { useWeatherContext } from '@/components/context/WeatherWidgetContext';
import { InfoRow } from '@/components/ui/InfoRow';
import { Temperature } from '@/components/widget/Temperature';
import { WeatherIcon } from '@/components/widget/WeatherIcon';
import { upperFirst } from '@/lib/utils/upperFirst';

interface CurrentForecastProps {
  extra?: React.ReactNode;
  aside?: React.ReactNode;
}

/**
 * Current weather forecast widget (main)
 * @param aside - aside content
 * @param extra - extra widget details
 * @constructor
 */
export const CurrentForecast: RC<CurrentForecastProps> = ({ aside, extra }) => {
  const { location, weatherData } = useWeatherContext(); // get location from context / city name

  if (!weatherData) return null;

  const { temp, feels_like, humidity, wind_speed } = weatherData.current;
  const [condition] = weatherData.current.weather;

  const description = upperFirst(condition.description);

  return (
    <>
      <div className="flex items-center @6xl:gap-4">
        {/* Default info */}
        <div className="flex-1">
          <header className="flex flex-col items-center justify-between @sm:flex-row">
            <div className="group max-w-full flex-1 text-center @sm:text-left">
              <h2 className="flex flex-1 items-center text-transparent">
                <span className="bg-gradient-to-r from-[#9abc26] to-[#fe955e] bg-clip-text text-2xl font-black leading-none">
                  {location.cityName}
                </span>
              </h2>
              <p className="hidden text-sm opacity-50 @xs:block">{description}</p>
            </div>
            <WeatherIcon condition={condition} className="-my-3 mx-auto size-[80px] max-h-fit transition-all @xs:-my-2 @lg:size-[100px]" />
          </header>

          {/* Temperature, Feels Like, Humidity, Wind Speed */}
          <div className="flex flex-col text-center @xs:flex-row @xs:gap-2 @sm:text-left [&_p]:flex-1">
            <InfoRow label="Temperature" classNames={{ value: 'text-3xl @xs:text-xl' }}>
              <Temperature value={temp} />
            </InfoRow>
            <InfoRow className="hidden @xs:flex" label="Feels Like">
              <Temperature value={feels_like} />
            </InfoRow>
            <InfoRow className="hidden @lg:flex" label="Humidity">
              {humidity}%
            </InfoRow>
            <InfoRow className="hidden @3xl:flex" label="Wind Speed">
              {wind_speed} m/s
            </InfoRow>
          </div>
        </div>

        {/* Visible only for wide parent @container */}
        {aside && <aside className="hidden items-center border-l border-gray-700/30 pl-2 @container @6xl:flex @6xl:flex-1">{aside}</aside>}
      </div>

      {/* Pass extra weather widget info to prop explicitly */}
      {extra && <footer>{extra}</footer>}
    </>
  );
};
