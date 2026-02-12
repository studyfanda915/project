import { UploadPanel } from '@/components/tools/upload-panel';

export default function DocumentConverterPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Document Converter</h1>
      <p className="text-sm text-muted-foreground">PDF ⇄ Word/Excel/PPT/TXT conversions with queue-based processing.</p>
      <UploadPanel tool="document" />
    </div>
  );
}
