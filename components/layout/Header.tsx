import dynamic from 'next/dynamic';

import { NavLink } from '@/components/ui/NavLink';

const ToggleTheme = dynamic(() => import('@/components/ToggleTheme'), { ssr: false });

export const Header: RC = () => (
  <header className="container py-4 min-h-[62px]">
    <nav>
      <ul className="flex gap-3 text-lg">
        <li>
          <NavLink href="/">List</NavLink>
        </li>
        <li>
          <NavLink href="/dnd">Drag&Drop</NavLink>
        </li>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  </header>
);
