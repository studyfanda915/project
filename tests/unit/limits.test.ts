import { describe, expect, it } from 'vitest';
import { getRetentionHours, getSizeLimit } from '@/lib/security/limits';

describe('plan limits', () => {
  it('returns free limits', () => {
    expect(getSizeLimit('free')).toBe(25 * 1024 * 1024);
    expect(getRetentionHours('free')).toBe(1);
  });

  it('returns pro limits', () => {
    expect(getSizeLimit('pro')).toBe(500 * 1024 * 1024);
    expect(getRetentionHours('pro')).toBe(24);
  });
});
