import { DateTime } from '@/components/DateTime';
import dayjs from 'dayjs';

interface Props {
  day: string;
}

/**
 * I found this component little tricky,
 * because I don't find other way to adaptive day names
 * using @container query... Let it be :)
 * Friday -> Fri (xxs) / Friday (xs+) -> see tailwind.config.ts
 * @param day
 * @constructor
 */
export const DynamicDayName: FC<Props> = ({ day }) => {
  const timestamp = dayjs(day).unix();
  return (
    <>
      <DateTime className="inline @xs:hidden" timestamp={timestamp} format="ddd" />
      <DateTime className="hidden @xs:inline" timestamp={timestamp} format="dddd" />
    </>
  );
};
