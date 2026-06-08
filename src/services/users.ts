import { ApiError } from "@/models/ApiError";
import { User } from "@/models/Users/User";

const API_URL = "/api/users";

export async function getMe(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ApiError & User = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Sessão inválida");
  }

  return data;
}