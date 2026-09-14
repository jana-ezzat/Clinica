/**
 * Formats a 24h "HH:mm" time string per locale, e.g.
 * formatTime("14:00", "ar") -> "2:00 م"
 * formatTime("14:00", "en") -> "2:00 PM"
 */
export function formatTime(time: string, locale: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
