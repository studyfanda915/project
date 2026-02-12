import { UploadPanel } from '@/components/tools/upload-panel';

export default function ImageConverterPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Image Converter</h1>
      <UploadPanel tool="image-converter" />
    </div>
  );
}
