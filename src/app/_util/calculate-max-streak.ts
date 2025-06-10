export default function calculateMaxStreak(
  contributions: Array<{ date: string; count: number }>
): number {
  if (contributions.length === 0) return 0;

  const map = new Map<string, number>();
  contributions.forEach((c) => {
    map.set(c.date, c.count);
  });

  const sortedDates = contributions
    .map((c) => new Date(c.date))
    .sort((a, b) => a.getTime() - b.getTime());
  const start = sortedDates[0];
  const end = sortedDates[sortedDates.length - 1];

  let maxStreak = 0;
  let currentStreak = 0;

  const cur = new Date(start);
  while (cur <= end) {
    const dateStr = cur.toISOString().slice(0, 10);
    const cnt = map.get(dateStr) ?? 0;

    if (cnt > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }

    cur.setDate(cur.getDate() + 1);
  }

  return maxStreak;
}
