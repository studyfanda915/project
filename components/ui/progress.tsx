interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps): JSX.Element {
  return (
    <div className="h-2 w-full rounded bg-muted">
      <div className="h-2 rounded bg-primary transition-all" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}
