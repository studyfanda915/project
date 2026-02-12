import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { encryptBuffer } from '@/lib/security/encryption';
import { getRetentionHours, getSizeLimit } from '@/lib/security/limits';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { scanForViruses } from '@/lib/security/virus-scan';
import { storageProvider } from '@/lib/storage/provider';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.ip ?? 'unknown';
  if (!checkRateLimit(`upload:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const plan = 'free';
  if (file.size > getSizeLimit(plan)) return NextResponse.json({ error: 'File too large for plan' }, { status: 413 });

  const bytes = Buffer.from(await file.arrayBuffer());
  const scan = await scanForViruses(bytes);
  if (!scan.clean) return NextResponse.json({ error: scan.reason ?? 'Virus scan failed' }, { status: 400 });

  const encrypted = encryptBuffer(bytes);
  const key = `${randomUUID()}-${file.name}`;
  const path = await storageProvider.save(key, encrypted);
  const expiresAt = new Date(Date.now() + getRetentionHours(plan) * 60 * 60 * 1000);

  const upload = await prisma.fileUpload.create({
    data: {
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
      path,
      expiresAt,
      encrypted: true
    }
  });

  return NextResponse.json({ fileId: upload.id });
}
