import { convertTemperature } from '@/lib/utils/weather';
import { Counter } from '@/components/ui/Counter';

interface TemperatureProps extends ComponentProps<'span'> {
  value: number; // temperature in Kelvin (default from API)
  format?: 'C' | 'K' | 'F'; // format (default is C)
  hideUnit?: boolean; // don't show °C
}

/**
 * Display temperature with unit
 * @param value - temperature in Kelvin (will be converted to selected format)
 * @param format - 'C' | 'K' | 'F' (default is C)
 * @param hideUnit - hide unit
 * @param props - span compatible props
 * @constructor
 */
export const Temperature: FC<TemperatureProps> = ({ value, format = 'C', hideUnit, ...props }) => (
  <span {...props}>
    <Counter
      value={+convertTemperature(value, format)}
      suffix={<>°{!hideUnit && <span className="unit font-normal uppercase">{format}</span>}</>}
    />
  </span>
);
