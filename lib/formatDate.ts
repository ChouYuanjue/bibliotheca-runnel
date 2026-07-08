export function formatDate(date: string) {
  const normalized = date.includes("T") || date.length > 10 ? date : `${date}T00:00:00`;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(normalized));
}
