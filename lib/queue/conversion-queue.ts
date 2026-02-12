import { JobStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export async function enqueueConversion(jobId: string): Promise<void> {
  await prisma.conversionJob.update({ where: { id: jobId }, data: { status: JobStatus.PROCESSING, progress: 50 } });

  setTimeout(async () => {
    const job = await prisma.conversionJob.findUnique({ where: { id: jobId }, include: { file: true } });
    if (!job) return;

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.conversionResult.create({
      data: {
        jobId,
        outputPath: job.file.path,
        outputFormat: job.targetFormat,
        outputSizeBytes: job.file.sizeBytes,
        expiresAt
      }
    });

    await prisma.conversionJob.update({ where: { id: jobId }, data: { status: JobStatus.COMPLETED, progress: 100 } });
  }, 500);
}
