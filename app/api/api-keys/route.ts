import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function hashKey(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex');
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userId, label } = (await req.json()) as { userId: string; label: string };
  const raw = `sfc_${crypto.randomBytes(24).toString('hex')}`;
  const created = await prisma.apiKey.create({ data: { userId, label, keyHash: hashKey(raw) } });
  return NextResponse.json({ id: created.id, apiKey: raw });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = (await req.json()) as { id: string };
  await prisma.apiKey.update({ where: { id }, data: { revokedAt: new Date() } });
  return NextResponse.json({ ok: true });
}
