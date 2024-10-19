'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button className="size-7" suppressHydrationWarning onClick={toggleTheme} aria-label="Toggle theme" variant="outline" size="icon">
      <span className={cn('size-4', theme === 'dark' ? 'animate-rotateMoon' : 'animate-rotateSun')}>
        {theme === 'dark' ? <Moon /> : <Sun />}
      </span>
    </Button>
  );
}
