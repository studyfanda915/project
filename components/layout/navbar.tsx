import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const links = [
  ['Home', '/'],
  ['Converters', '/converters'],
  ['Pricing', '/pricing'],
  ['Dashboard', '/dashboard'],
  ['Admin', '/admin']
];

export function Navbar(): JSX.Element {
  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold">
          Smart File Converter
        </Link>
        <nav className="hidden gap-4 md:flex">
          {links.map(([name, href]) => (
            <Link key={href} href={href} className="text-sm text-muted-foreground hover:text-foreground">
              {name}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
