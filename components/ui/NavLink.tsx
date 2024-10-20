'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

export const NavLink: FC<NavLinkProps> = ({ href, children, className, activeClassName }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NextLink
      className={cn(isActive ? activeClassName || 'underline-offset-4' : 'text-foreground/60', ' font-medium', className)}
      data-active={isActive}
      href={href}
    >
      {children}
    </NextLink>
  );
};
