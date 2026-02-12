'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle(): JSX.Element {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const initial = localStorage.getItem('theme') === 'dark';
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  function toggleTheme(): void {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
