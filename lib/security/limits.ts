export function getSizeLimit(plan: 'free' | 'pro'): number {
  return (plan === 'pro' ? 500 : 25) * 1024 * 1024;
}

export function getRetentionHours(plan: 'free' | 'pro'): number {
  return plan === 'pro' ? 24 : 1;
}
