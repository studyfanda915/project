import { UploadPanel } from '@/components/tools/upload-panel';

export default function PdfToolsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">PDF Tools</h1>
      <p className="text-sm text-muted-foreground">Merge, split, compress, rotate, protect, unlock, watermark, eSign.</p>
      <UploadPanel tool="pdf-tools" />
    </div>
  );
}
