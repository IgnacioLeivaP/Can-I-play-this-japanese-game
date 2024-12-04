import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-2"
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-4 w-4" />
          <span className="sr-only">Dark mode</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <span className="sr-only">Light mode</span>
        </>
      )}
    </Button>
  );
}