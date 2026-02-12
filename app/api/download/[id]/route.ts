import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decryptBuffer } from '@/lib/security/encryption';
import { storageProvider } from '@/lib/storage/provider';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const result = await prisma.conversionResult.findUnique({ where: { id: params.id } });
  if (!result || result.expiresAt < new Date()) return NextResponse.json({ error: 'Unavailable' }, { status: 404 });
  const encrypted = await storageProvider.read(result.outputPath);
  const decrypted = decryptBuffer(encrypted);
  return new NextResponse(new Uint8Array(decrypted), {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="converted.${result.outputFormat}"`
    }
  });
}
