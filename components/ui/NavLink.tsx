'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { useLocale } from '@/components/context/LocaleProvider';
import { cn } from '@/lib/utils/cn';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
};

export const NavLink: FC<NavLinkProps> = ({ href, children, className, activeClassName }) => {
  const pathname = usePathname();
  const { lang } = useLocale();
  const isActive = pathname.includes(href);

  return (
    <NextLink
      className={cn(isActive ? activeClassName || 'underline-offset-4' : 'text-foreground/60', ' font-medium', className)}
      data-active={isActive}
      // TODO: Research better approach to handle this
      href={`/${lang}${href}`}
    >
      {children}
    </NextLink>
  );
};
