import type { DayHours } from "@/content";

/**
 * Pure string helpers for opening hours. No Date objects anywhere: content.ts
 * stays JSON-safe and these run identically at build time and in the browser.
 */

/**
 * "09:00" → "9 AM", "18:00" → "6 PM", "09:30" → "9:30 AM".
 * On-the-hour times drop the ":00" — shorter and more human in a hours table.
 * Content is validated 24h "HH:MM".
 */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minutes = m === 0 ? "" : `:${String(m).padStart(2, "0")}`;
  return `${hour12}${minutes} ${period}`;
}

/** One display value per row: "9:00 AM – 6:00 PM", or "Closed" — never a dash. */
export function formatDayHours(day: DayHours): string {
  if (!day.open || !day.close) return "Closed";
  return `${formatTime(day.open)} – ${formatTime(day.close)}`;
}

/**
 * Framework-free inline script that marks today's row in the hours table.
 *
 * Why a script at all: the site is statically prerendered, so a server-computed
 * "today" would be frozen on build day (and a UTC build server's "today" is not
 * Austin's "today"). This computes the weekday in the SPA'S timezone — the IANA
 * zone from content.ts, not the visitor's device zone — in the browser at view
 * time, then sets `data-today` on the matching `[data-day]` row so Tailwind's
 * `data-today:` / `group-data-today:` variants style it. ~250 bytes, no React,
 * no hydration. Without JS no row is emphasised and the table stays complete.
 */
export function todayScript(timezone: string): string {
  return (
    "(function(){try{" +
    `var d=new Intl.DateTimeFormat("en-US",{weekday:"short",timeZone:${JSON.stringify(timezone)}}).format(new Date());` +
    'var r=document.querySelector(\'[data-day="\'+d+\'"]\');' +
    'if(r)r.setAttribute("data-today","");' +
    "}catch(e){}})()"
  );
}
