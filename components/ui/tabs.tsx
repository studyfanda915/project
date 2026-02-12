'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Tabs({ labels }: { labels: string[] }): JSX.Element {
  const [active, setActive] = useState(labels[0]);
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {labels.map((label) => (
          <button
            key={label}
            className={cn('rounded-md border px-3 py-2 text-sm', active === label ? 'bg-primary text-primary-foreground' : '')}
            onClick={() => setActive(label)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Selected: {active}</p>
    </div>
  );
}
