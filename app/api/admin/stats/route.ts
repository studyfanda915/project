import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(): Promise<NextResponse> {
  const [users, jobs, storage] = await Promise.all([
    prisma.user.count(),
    prisma.conversionJob.count(),
    prisma.fileUpload.aggregate({ _sum: { sizeBytes: true } })
  ]);

  return NextResponse.json({
    users,
    jobs,
    storageBytes: storage._sum.sizeBytes ?? 0
  });
}
