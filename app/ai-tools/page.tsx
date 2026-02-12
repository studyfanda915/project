import { UploadPanel } from '@/components/tools/upload-panel';

export default function AiToolsPage(): JSX.Element {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">AI Tools</h1>
      <p className="text-sm text-muted-foreground">OCR, summarize, translate, rewrite, and key point extraction.</p>
      <UploadPanel tool="ai-tools" />
    </div>
  );
}
