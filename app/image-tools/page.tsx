import { UploadPanel } from '@/components/tools/upload-panel';

export default function ImageToolsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Image Tools</h1>
      <p className="text-sm text-muted-foreground">Compress, resize, crop, background remove, OCR.</p>
      <UploadPanel tool="image-tools" />
    </div>
  );
}
