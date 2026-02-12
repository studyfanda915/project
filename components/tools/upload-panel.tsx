'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const schema = z.object({
  targetFormat: z.string().min(2),
  file: z.any()
});

type FormValues = z.infer<typeof schema>;

export function UploadPanel({ tool }: { tool: string }): JSX.Element {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { targetFormat: 'pdf' }
  });

  async function onSubmit(data: FormValues): Promise<void> {
    const selected = (data.file as FileList)?.[0];
    if (!selected) {
      setMessage('Select a file first.');
      return;
    }
    const payload = new FormData();
    payload.append('file', selected);
    payload.append('tool', tool);
    payload.append('targetFormat', data.targetFormat);
    setProgress(25);
    const upload = await fetch('/api/upload', { method: 'POST', body: payload });
    if (!upload.ok) {
      setMessage('Upload failed');
      return;
    }
    const fileData = (await upload.json()) as { fileId: string };
    setProgress(60);
    const job = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId: fileData.fileId, tool, targetFormat: data.targetFormat })
    });
    if (!job.ok) {
      setMessage('Job failed to start');
      return;
    }
    setProgress(100);
    setMessage('Conversion submitted. Track it in dashboard history.');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border p-6">
      <div className="rounded-lg border-2 border-dashed p-8 text-center">
        <UploadCloud className="mx-auto mb-2 h-8 w-8" />
        <p className="mb-2 text-sm text-muted-foreground">Drag & drop or choose file</p>
        <Input type="file" {...register('file')} />
      </div>
      <Input placeholder="Target format (e.g. pdf, png, mp4)" {...register('targetFormat')} />
      <Progress value={progress} />
      <div className="flex items-center gap-3">
        <Button type="submit">Convert</Button>
        <Button type="button" variant="outline" onClick={() => setProgress(0)}>
          Cancel
        </Button>
      </div>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </form>
  );
}
