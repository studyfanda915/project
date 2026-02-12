import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { storageProvider } from '@/lib/storage/provider';

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const file = await prisma.fileUpload.findUnique({ where: { id: params.id } });
  if (!file) return NextResponse.json({ ok: true });
  await storageProvider.remove(file.path);
  await prisma.fileUpload.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
