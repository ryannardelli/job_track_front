import { ApiError } from "@/models/ApiError";
import { AuthResponse } from "@/models/Auth/AuthResponse";
import { CredentialsUser } from "@/models/Auth/CredentialsUser ";

const API_URL = "/api/auth";

export const userAuthentication = {
  login: async ({
    email,
    password,
  }: CredentialsUser): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiError & AuthResponse = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Erro ao fazer login");
    }

    return data;
  },

  register: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data: ApiError & AuthResponse = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "Erro ao registrar usuário");
    }

    return data;
  },
};