import { ApiError } from "@/models/ApiError";
import { StudentDashboardStats } from "@/models/Dashboard/StudentDashboardStats";

const API_URL = "/api/dashboard";

export async function getDashboardStats(
  token: string
): Promise<StudentDashboardStats> {
  const res = await fetch(`${API_URL}/stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ApiError & StudentDashboardStats = await res
    .json()
    .catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.message || "Erro ao buscar estatísticas do dashboard"
    );
  }

  return data;
}