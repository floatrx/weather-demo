import dynamic from 'next/dynamic';

import { NavLink } from '@/components/ui/NavLink';
import { site } from '@/config/const';

const ToggleTheme = dynamic(() => import('@/components/ui/ToggleTheme'), { ssr: false });

export const Header: RC = () => (
  <header className="container py-4 min-h-[62px]">
    <nav className="max-w-fit">
      <ul className="flex gap-3 text-lg [&_li:not(:last-child)::after]:content-['/'] [&_li::after]:pl-3 [&_li::after]:opacity-10">
        {site.links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.href}>{link.label}</NavLink>
          </li>
        ))}
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  </header>
);
