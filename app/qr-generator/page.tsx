'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  content: z.string().min(1),
  type: z.enum(['text', 'url', 'contact', 'wifi'])
});

type Values = z.infer<typeof schema>;

export default function QrPage(): JSX.Element {
  const [result, setResult] = useState<string>('');
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { type: 'text', content: '' } });

  async function onSubmit(values: Values): Promise<void> {
    const res = await fetch('/api/qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const data = (await res.json()) as { dataUrl: string };
    setResult(data.dataUrl);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">QR Code Generator</h1>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Text / URL / Contact / WiFi payload" {...form.register('content')} />
        <select className="h-10 rounded border px-3" {...form.register('type')}>
          <option value="text">Text</option>
          <option value="url">URL</option>
          <option value="contact">Contact</option>
          <option value="wifi">WiFi</option>
        </select>
        <Button type="submit">Generate</Button>
      </form>
      {result ? <img src={result} alt="Generated QR" className="h-56 w-56 rounded border" /> : null}
    </div>
  );
}
