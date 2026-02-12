import { UploadPanel } from '@/components/tools/upload-panel';

export default function VideoToolsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Video Tools</h1>
      <p className="text-sm text-muted-foreground">Compress, trim, resolution, subtitles, frame rate.</p>
      <UploadPanel tool="video-tools" />
    </div>
  );
}
