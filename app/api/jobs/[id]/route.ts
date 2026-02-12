import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  const job = await prisma.conversionJob.findUnique({ where: { id: params.id }, include: { result: true } });
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(job);
}
