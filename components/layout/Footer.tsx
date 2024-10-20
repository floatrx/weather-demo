import Link from 'next/link';

export const Footer: RC = () => (
  <footer className="container pb-4 text-sm my-4">
    <p className="max-w-xl">
      &copy; Floatrx 2024 | Weather demo app. Nextjs14 + ShadCN + TailwindCSS (@container queries) + OpenWeatherMap API Source code:
      <Link className="px-2 underline" href="https://github.com/floatrx/weather-demo" rel="noopener" target="_blank">
        Weather-demo
      </Link>
    </p>
  </footer>
);
