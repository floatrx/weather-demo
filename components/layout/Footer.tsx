import Link from 'next/link';

export const Footer: RC = () => (
  <footer className="container pb-4 text-sm my-4 opacity-40 hover:opacity-100 transition-all">
    <p className="max-w-xl">
      &copy; Floatrx 2024 | <strong>Weather demo app</strong>. Nextjs14, OpenWeatherMap API, ShadCN, TailwindCSS (@container queries) and
      Framer-motion. Source code:
      <Link className="px-2 underline" href="https://github.com/floatrx/weather-demo" rel="noopener" target="_blank">
        Weather-demo
      </Link>
    </p>
  </footer>
);
