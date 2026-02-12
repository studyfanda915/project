import { Tabs } from '@/components/ui/tabs';

export default function ConvertersHubPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Converters Hub</h1>
      <Tabs labels={['Document', 'Image', 'Media', 'PDF Tools', 'AI Tools', 'QR']} />
    </div>
  );
}
