import { convertTemperature } from '@/lib/utils/weather';
import { Counter } from '@/components/Counter';

interface TemperatureProps extends ComponentProps<'span'> {
  value: number; // temperature in Kelvin (default from API)
  format?: 'C' | 'K' | 'F'; // format (default is C)
  hideUnit?: boolean; // don't show °C
}

export const Temperature: FC<TemperatureProps> = ({ value, format = 'C', hideUnit, ...props }) => (
  <span {...props}>
    <Counter
      value={+convertTemperature(value, format)}
      suffix={<>°{!hideUnit && <span className="unit font-normal uppercase">{format}</span>}</>}
    />
  </span>
);
