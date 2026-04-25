const colorMap = {
  Pending: 'bg-amber-100 text-amber-700',
  Preparing: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  unpaid: 'bg-rose-100 text-rose-700',
  paid: 'bg-emerald-100 text-emerald-700'
};

export default function StatusBadge({ label }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorMap[label] || 'bg-slate-100 text-slate-700'}`}>
      {label}
    </span>
  );
}
