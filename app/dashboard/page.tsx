import { prisma } from '@/lib/prisma';

export default async function DashboardPage(): Promise<JSX.Element> {
  const jobs = await prisma.conversionJob.findMany({ take: 10, orderBy: { createdAt: 'desc' } });
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">User Dashboard</h1>
      <p className="text-sm text-muted-foreground">Profile, conversion history, and usage limits.</p>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li className="rounded border p-3 text-sm" key={job.id}>
            {job.tool} → {job.targetFormat} • {job.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
