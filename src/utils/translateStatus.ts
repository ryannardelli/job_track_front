export function translateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    WISHLIST: "Lista de Desejos",
    APPLIED: "Aplicada",
    INTERVIEW: "Entrevista",
    OFFER: "Oferta Recebida",
    REJECTED: "Rejeitada",
  };

  return statusMap[status] || status;
}