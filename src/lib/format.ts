export function formatCurrency(amount: number): string {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}
