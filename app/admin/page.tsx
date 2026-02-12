import { prisma } from '@/lib/prisma';

export default async function AdminPage(): Promise<JSX.Element> {
  const [users, jobs, uploads] = await Promise.all([
    prisma.user.count(),
    prisma.conversionJob.count(),
    prisma.fileUpload.count()
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border p-4">Users: {users}</div>
        <div className="rounded border p-4">Conversions: {jobs}</div>
        <div className="rounded border p-4">Stored files: {uploads}</div>
      </div>
    </div>
  );
}
