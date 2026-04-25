import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold text-brand">Restaurant Management Platform</h1>
      <p className="mt-2 text-slate-600">Scan QR code to open customer menu for a table, or use dashboards below.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link className="rounded-xl border bg-white p-4 shadow-sm" href="/table/1">
          Customer Menu (Table 1)
        </Link>
        <Link className="rounded-xl border bg-white p-4 shadow-sm" href="/owner">
          Owner Dashboard
        </Link>
        <Link className="rounded-xl border bg-white p-4 shadow-sm" href="/admin">
          Admin Panel
        </Link>
      </div>
    </main>
  );
}
