import { SimpleCard } from '@/components/ui/SimpleCard';
import { CurrentForecast } from '@/components/widget/CurrentForecast';

interface Props {}

export const SimpleWeatherWidget: FC<Props> = () => (
  <SimpleCard className="w-full max-h-[380px] animate-show">
    <CurrentForecast extended />
  </SimpleCard>
);
