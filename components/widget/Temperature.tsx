import Image from 'next/image';
import { Counter } from '@/components/ui/Counter';
import { cn } from '@/lib/utils/cn';
import { convertTemperature, isNegativeTemperature } from '@/lib/utils/weather';

interface TemperatureProps extends ComponentProps<'span'> {
  value: number; // temperature in Kelvin (default from API)
  format?: 'C' | 'K' | 'F'; // format (default is C)
  hideUnit?: boolean; // don't show °C
  hideIcon?: boolean; // don't show icon
}

/**
 * Display temperature with unit
 * @param value - temperature in Kelvin (will be converted to selected format)
 * @param format - 'C' | 'K' | 'F' (default is C)
 * @param hideUnit - hide unit
 * @param hideIcon - don't show icon
 * @param className - additional class
 * @param props - span compatible props
 * @constructor
 */
export const Temperature: FC<TemperatureProps> = ({ value, format = 'C', hideUnit, hideIcon, className, ...props }) => (
  <span className={cn(!hideIcon && 'flex items-center', className)} {...props}>
    {!hideIcon && (
      <Image
        src={`/ico/3d/temp-${isNegativeTemperature(value) ? 'minus' : 'plus'}_32.png`}
        className="size-[2ch]"
        alt="temp"
        width={32}
        height={32}
      />
    )}
    <Counter
      value={+convertTemperature(value, format)}
      suffix={<>°{!hideUnit && <span className="unit font-normal uppercase">{format}</span>}</>}
    />
  </span>
);
