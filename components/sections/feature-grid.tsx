import { Card } from '@/components/ui/card';

const features = [
  'Document conversion',
  'Image conversion',
  'Media conversion',
  'PDF toolkit',
  'AI assistant tools',
  'QR generator',
  'Secure auto-delete',
  'Admin analytics'
];

export function FeatureGrid(): JSX.Element {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <Card key={feature}>
          <p className="font-medium">{feature}</p>
        </Card>
      ))}
    </div>
  );
}
