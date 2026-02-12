import Link from 'next/link';

export function Footer(): JSX.Element {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-4 px-4 py-8 text-sm text-muted-foreground">
        <Link href="/support">Support</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/cookies">Cookies</Link>
      </div>
    </footer>
  );
}
