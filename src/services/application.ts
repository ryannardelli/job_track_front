import { ApiError } from "@/models/ApiError";
import { Application } from "@/models/Applications/Application";
import { ApplicationBoard } from "@/models/Applications/ApplicationBoard";

const API_URL = "/api/application";

export async function createApplication(
  token: string,
  data: Partial<Application>
): Promise<Application> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const response: ApiError & Application = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(response.message || "Erro ao criar candidatura");
  }

  return response;
}

export async function getApplications(
  token: string
): Promise<Application[]> {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response: ApiError & Application[] = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(response.message || "Erro ao buscar candidaturas");
  }

  return response;
}

export async function getApplicationBoard(
  token: string
): Promise<ApplicationBoard> {
  const res = await fetch(`${API_URL}/board`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response: ApiError & ApplicationBoard = await res
    .json()
    .catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      response.message || "Erro ao buscar quadro de candidaturas"
    );
  }

  return response;
}

export async function getApplicationById(
  token: string,
  uuid: string
): Promise<Application> {
  const res = await fetch(`${API_URL}/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response: ApiError & Application = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(response.message || "Erro ao buscar candidatura");
  }

  return response;
}

export async function updateApplication(
  token: string,
  uuid: string,
  data: Partial<Application>
): Promise<Application> {
  const res = await fetch(`${API_URL}/${uuid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const response: ApiError & Application = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(response.message || "Erro ao atualizar candidatura");
  }

  return response;
}

export async function deleteApplication(
  token: string,
  uuid: string
): Promise<{ message: string }> {
  const res = await fetch(`${API_URL}/${uuid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(response.message || "Erro ao deletar candidatura");
  }

  return response;
}

export async function updateApplicationStatus(
  token: string,
  uuid: string,
  status: string
): Promise<Application> {
  const res = await fetch(`${API_URL}/${uuid}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Erro ao atualizar status");
  }

  return data;
}