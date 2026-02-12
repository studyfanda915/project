import { Card } from '@/components/ui/card';

export default function PricingPage(): JSX.Element {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h2 className="text-xl font-semibold">Free</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>25MB max file</li>
          <li>1 hour retention</li>
          <li>Single conversion</li>
          <li>Ads placeholder</li>
        </ul>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold">Pro</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>500MB max file</li>
          <li>24h retention</li>
          <li>Batch conversion</li>
          <li>API access + keys</li>
        </ul>
      </Card>
    </div>
  );
}
