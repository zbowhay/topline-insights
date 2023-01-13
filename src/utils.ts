// this is a bit of a silly function, I'd use moment or luxon to handle these things in a corporate setting.

/**
 * Take in a timestamp and return it in YYYY-MM format.
 *
 * @param ts timestamp
 * @returns Date in YYYY-MM (non-zero based month)
 */
export function formatTimestamp(ts: number): string {
  const date = new Date(ts);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
