export interface AuthSession {
  accessToken: string;
  expiresInSeconds: number;
  refreshToken: string;
  tokenType: string;
}

interface ApiErrorBody {
  message?: unknown;
}

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1").replace(/\/$/, "");

async function readError(response: Response) {
  const fallback = `Request failed with status ${response.status}.`;

  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "message" in body) {
      const { message } = body as ApiErrorBody;
      if (typeof message === "string" && message.trim()) return message;
    }
  } catch {
    // The backend may return an empty or non-JSON response.
  }

  return fallback;
}

async function post<T>(path: string, body: Record<string, string>): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  } catch {
    throw new Error("Unable to reach the account service. Please try again later.");
  }

  if (!response.ok) throw new Error(await readError(response));
  return response.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`);
  } catch {
    throw new Error("Unable to reach the account service. Please try again later.");
  }

  if (!response.ok) throw new Error(await readError(response));
  return response.json() as Promise<T>;
}

export async function registerAccount(email: string, password: string) {
  return post<{ message: string }>("/auth/register", { email, password });
}

export async function loginAccount(email: string, password: string) {
  return post<AuthSession>("/auth/login", { email, password });
}

export async function verifyEmail(token: string) {
  return get<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`);
}

export async function requestPasswordReset(email: string) {
  return post<{ message: string }>("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string) {
  return post<{ message: string }>("/auth/reset-password", { token, password });
}
