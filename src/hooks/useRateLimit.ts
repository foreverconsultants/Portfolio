/**
 * useRateLimit — client-side rate limiter backed by localStorage.
 *
 * Each `key` tracks its own list of timestamps.
 * A "day" is defined as 00:00–23:59 in the user's local timezone.
 * Max uses per calendar day defaults to 2.
 */

const STORAGE_PREFIX = "fc_rate_limit_";

export interface RateLimitResult {
  /** true when the action is allowed */
  allowed: boolean;
  /** how many uses remain today (after this attempt, if allowed) */
  remaining: number;
  /** ISO string of when the limit resets (midnight tonight) */
  resetsAt: string;
}

/**
 * Record a new attempt for `key` and return whether it should be allowed.
 * Call this right before the guarded action.
 */
export function checkRateLimit(key: string, maxPerDay = 2): RateLimitResult {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  // Midnight today (start of today) in local time
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  // Midnight tonight (reset point)
  const resetTime = new Date(todayStart);
  resetTime.setDate(resetTime.getDate() + 1);

  // Load existing timestamps
  let timestamps: number[] = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) timestamps = JSON.parse(raw) as number[];
  } catch {
    timestamps = [];
  }

  // Keep only timestamps from today
  const todayTimestamps = timestamps.filter((ts) => ts >= todayStart.getTime());

  if (todayTimestamps.length >= maxPerDay) {
    return {
      allowed: false,
      remaining: 0,
      resetsAt: resetTime.toISOString(),
    };
  }

  // Record this attempt
  const newTimestamps = [...todayTimestamps, Date.now()];
  try {
    localStorage.setItem(storageKey, JSON.stringify(newTimestamps));
  } catch {
    // localStorage unavailable (private mode, etc.) — allow action gracefully
  }

  return {
    allowed: true,
    remaining: maxPerDay - newTimestamps.length,
    resetsAt: resetTime.toISOString(),
  };
}

/**
 * Peek at the current quota without recording an attempt.
 */
export function peekRateLimit(key: string, maxPerDay = 2): RateLimitResult {
  const storageKey = `${STORAGE_PREFIX}${key}`;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const resetTime = new Date(todayStart);
  resetTime.setDate(resetTime.getDate() + 1);

  let timestamps: number[] = [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) timestamps = JSON.parse(raw) as number[];
  } catch {
    timestamps = [];
  }

  const todayTimestamps = timestamps.filter((ts) => ts >= todayStart.getTime());
  const used = todayTimestamps.length;

  return {
    allowed: used < maxPerDay,
    remaining: Math.max(0, maxPerDay - used),
    resetsAt: resetTime.toISOString(),
  };
}
