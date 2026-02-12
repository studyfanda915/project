import { UploadPanel } from '@/components/tools/upload-panel';

export default function MediaConverterPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Media Converter</h1>
      <UploadPanel tool="media-converter" />
    </div>
  );
}
