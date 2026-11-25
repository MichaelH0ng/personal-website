/** Helpers for the LinkedIn-style Experience timeline: date parsing, durations and grouping by org. */

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/** Months since year 0 for "Sept. 2025", "June 2026", "Present", etc. Returns null if unparseable. */
function toMonthIndex(text: string, now: Date): number | null {
  const t = text.trim();
  if (/^present$/i.test(t)) return now.getFullYear() * 12 + now.getMonth();
  const m = t.match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS.indexOf(m[1].slice(0, 3).toLowerCase());
  if (month === -1) return null;
  return Number(m[2]) * 12 + month;
}

function splitRange(dates: string): [string, string] | null {
  const parts = dates.split(/\s+[–—-]\s+/);
  return parts.length === 2 ? [parts[0], parts[1]] : null;
}

/** "1 yr 3 mos", "7 mos", "1 mo". Both ends count, like LinkedIn (Feb to Aug is 7 mos). */
function formatMonths(total: number): string {
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts: string[] = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos || !yrs) parts.push(`${mos} mo${mos === 1 ? "" : "s"}`);
  return parts.join(" ");
}

/** Duration of a single date range like "Feb. 2026 – Aug. 2026". Empty string if it can't be parsed. */
export function rangeDuration(dates: string, now = new Date()): string {
  return spanDuration([dates], now);
}

/** Duration from the earliest start to the latest end across several date ranges. */
export function spanDuration(ranges: string[], now = new Date()): string {
  let start = Infinity;
  let end = -Infinity;
  for (const r of ranges) {
    const pair = splitRange(r);
    if (!pair) return "";
    const s = toMonthIndex(pair[0], now);
    const e = toMonthIndex(pair[1], now);
    if (s === null || e === null) return "";
    start = Math.min(start, s);
    end = Math.max(end, e);
  }
  return end >= start ? formatMonths(end - start + 1) : "";
}

/** True if any range ends in "Present". */
export function isCurrent(dates: string) {
  return /present$/i.test(dates.trim());
}

/** Up to two initials for orgs without a logo file: "Fresh Prints" -> "FP", "Adobe" -> "A". */
export function orgInitials(name: string) {
  return name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((w) => w && !/^(of|the|and|&)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Groups entries that share an org, keeping the order they first appear in. */
export function groupByOrg<T>(entries: T[], orgOf: (e: T) => string): { org: string; items: T[] }[] {
  const groups: { org: string; items: T[] }[] = [];
  for (const e of entries) {
    const org = orgOf(e);
    const existing = groups.find((g) => g.org === org);
    if (existing) existing.items.push(e);
    else groups.push({ org, items: [e] });
  }
  return groups;
}
