export function formatDate(date?: string | null) {
  if (!date) return "Sem data";
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}