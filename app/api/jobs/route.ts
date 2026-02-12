import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { enqueueConversion } from '@/lib/queue/conversion-queue';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as { fileId: string; tool: string; targetFormat: string };
  const job = await prisma.conversionJob.create({
    data: {
      fileId: body.fileId,
      tool: body.tool,
      targetFormat: body.targetFormat
    }
  });
  await enqueueConversion(job.id);
  return NextResponse.json({ jobId: job.id, status: job.status });
}
