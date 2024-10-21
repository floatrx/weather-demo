'use client';

import { Moon, Sun, MonitorCog } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

type Theme = 'dark' | 'light' | 'system';

const getNextTheme = (currentTheme: Theme): Theme => {
  const themeMap: Record<Theme, Theme> = {
    dark: 'light',
    light: 'system',
    system: 'dark',
  };
  return themeMap[currentTheme];
};

export default function ToggleTheme() {
  const { setTheme, theme = 'system' } = useTheme();

  const toggleTheme = () => {
    if (theme) {
      setTheme(getNextTheme(theme as Theme));
    }
  };

  return (
    <Button
      className="size-7 animate-in"
      suppressHydrationWarning
      onClick={toggleTheme}
      aria-label="Toggle theme"
      variant="outline"
      size="icon"
    >
      <span
        className={cn(
          'size-4',
          theme === 'dark' ? 'animate-rotateMoon' : theme === 'light' ? 'animate-rotateSun' : 'animate-rotateSunMoon',
        )}
      >
        {theme === 'dark' ? <Moon /> : theme === 'light' ? <Sun /> : <MonitorCog />}
      </span>
    </Button>
  );
}
