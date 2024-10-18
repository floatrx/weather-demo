import { InfoRow } from '@/components/InfoRow';
import { Temperature } from '@/components/Temperature';
import { WeatherIcon } from '@/components/WeatherIcon';
import { upperFirst } from '@/lib/utils/upperFirst';
import { useWeatherContext } from '@/components/context/WeatherWidgetContext';

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
    <section>
      <div className="@6xl:gap-4 flex items-center">
        {/* Default info */}
        <div className="flex-1">
          <header className="@sm:flex-row flex flex-col items-center justify-between">
            <div className="@sm:text-left group max-w-full flex-1 text-center">
              <h2 className="flex flex-1 items-center text-transparent">
                <span className="bg-gradient-to-r from-[#9abc26] to-[#fe955e] bg-clip-text text-2xl font-black leading-none">
                  {location.cityName}
                </span>
              </h2>
              <p className="@xs:block hidden text-sm opacity-50">{description}</p>
            </div>
            <WeatherIcon condition={condition} className="@xs:-my-2 @lg:size-[100px] -my-3 mx-auto size-[80px] max-h-fit transition-all" />
          </header>

          {/* Temperature, Feels Like, Humidity, Wind Speed */}
          <div className="@xs:flex-row @xs:gap-2 @sm:text-left flex flex-col text-center [&_p]:flex-1">
            <InfoRow label="Temperature" classNames={{ value: 'text-3xl @sm:text-xl' }}>
              <Temperature value={temp} />
            </InfoRow>
            <InfoRow className="@xs:flex hidden" label="Feels Like">
              <Temperature value={feels_like} />
            </InfoRow>
            <InfoRow className="@lg:flex hidden" label="Humidity">
              {humidity}%
            </InfoRow>
            <InfoRow className="@3xl:flex hidden" label="Wind Speed">
              {wind_speed} m/s
            </InfoRow>
          </div>
        </div>

        {/* Visible only for wide parent @container */}
        {aside && <aside className="@6xl:flex @6xl:flex-1 @container hidden items-center border-l border-gray-700/30 pl-2">{aside}</aside>}
      </div>

      {/* Pass extra weather widget info to prop explicitly */}
      {extra && <footer>{extra}</footer>}
    </section>
  );
};
