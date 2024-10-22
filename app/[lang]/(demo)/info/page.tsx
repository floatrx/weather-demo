import { WeatherForm } from '@/components/form/WeatherForm';
import { Heading } from '@/components/ui/Heading';
import { SimpleWeatherWidget } from '@/components/widget/SimpleWeatherWidget';
import { getDictionary } from '@/lib/i18n/getDictionary';

import type { Locale } from '@/i18n-config';

interface Props {
  params: { lang: Locale };
}

export default async function Demo({ params }: Props) {
  const { summary } = await getDictionary(params.lang);

  return (
    <>
      <Heading>{summary.heading}</Heading>
      <WeatherForm />
      {summary.content.map((content, index) => (
        <p key={index} className="max-w-lg animate-show delay-150">
          {content}
        </p>
      ))}
      <SimpleWeatherWidget />
    </>
  );
}
