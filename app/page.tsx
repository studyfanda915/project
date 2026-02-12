import Link from 'next/link';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { Button } from '@/components/ui/button';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-10">
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Smart File Converter</h1>
        <p className="text-muted-foreground">Convert, optimize, and secure files across document, image, media, and AI workflows.</p>
        <Button asChild>
          <Link href="/converters">Start converting</Link>
        </Button>
      </section>
      <FeatureGrid />
    </div>
  );
}
