export interface AuthSession {
  accessToken: string;
  expiresInSeconds: number;
  refreshToken: string;
  tokenType: string;
}

export interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface ConversionHistoryEntry {
  toolId: string;
  action: string;
  occurredAt: string;
}

interface ApiErrorBody { message?: unknown; }

const SESSION_KEY = "allconverterhub:auth-session";
const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1").replace(/\/$/, "");

function isBrowser() { return typeof window !== "undefined"; }

export function getStoredSession(): AuthSession | null {
  if (!isBrowser()) return null;
  try {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) return null;
    const session = parsed as Partial<AuthSession>;
    return typeof session.accessToken === "string" && typeof session.refreshToken === "string" && typeof session.tokenType === "string" && typeof session.expiresInSeconds === "number" ? session as AuthSession : null;
  } catch { return null; }
}

export function saveSession(session: AuthSession) {
  if (isBrowser()) window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (isBrowser()) window.sessionStorage.removeItem(SESSION_KEY);
}

async function readError(response: Response) {
  const fallback = `Request failed with status ${response.status}.`;
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "message" in body) {
      const { message } = body as ApiErrorBody;
      if (typeof message === "string" && message.trim()) return message;
    }
  } catch { /* Empty and non-JSON responses use the fallback. */ }
  return fallback;
}

async function request<T>(path: string, method: "DELETE" | "GET" | "PATCH" | "POST" | "PUT", body?: Record<string, string>, session?: AuthSession): Promise<T> {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(session ? { Authorization: `Bearer ${session.accessToken}` } : {}),
      },
      method,
    });
    if (!response.ok) throw new Error(await readError(response));
    return response.json() as Promise<T>;
  } catch (reason) {
    if (reason instanceof Error && !reason.message.startsWith("Failed to fetch")) throw reason;
    throw new Error("Unable to reach the account service. Please try again later.");
  }
}

export function registerAccount(firstName: string, lastName: string, email: string, password: string) {
  return request<{ message: string }>("/auth/register", "POST", { firstName, lastName, email, password });
}

export function loginAccount(email: string, password: string) {
  return request<AuthSession>("/auth/login", "POST", { email, password });
}

export function verifyEmail(token: string) { return request<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`, "GET"); }
export function requestPasswordReset(email: string) { return request<{ message: string }>("/auth/forgot-password", "POST", { email }); }
export function resetPassword(token: string, password: string) { return request<{ message: string }>("/auth/reset-password", "POST", { token, password }); }
export function getProfile(session: AuthSession) { return request<UserProfile>("/me/profile", "GET", undefined, session); }
export function updateProfile(session: AuthSession, firstName: string, lastName: string) { return request<UserProfile>("/me/profile", "PATCH", { firstName, lastName }, session); }
export function changePassword(session: AuthSession, currentPassword: string, newPassword: string) { return request<{ message: string }>("/me/change-password", "POST", { currentPassword, newPassword }, session); }
export function resendVerificationEmail(session: AuthSession) { return request<{ message: string }>("/me/resend-verification", "POST", undefined, session); }
export function getPersistentFavoriteToolIds(session: AuthSession) { return request<Array<{ toolId: string }>>("/me/favorites", "GET", undefined, session).then((items) => items.map((item) => item.toolId)); }
export function savePersistentFavorite(session: AuthSession, toolId: string) { return request<{ message: string }>(`/me/favorites/${encodeURIComponent(toolId)}`, "PUT", undefined, session); }
export function removePersistentFavorite(session: AuthSession, toolId: string) { return request<{ message: string }>(`/me/favorites/${encodeURIComponent(toolId)}`, "DELETE", undefined, session); }
export function getConversionHistory(session: AuthSession) { return request<ConversionHistoryEntry[]>("/me/conversion-history", "GET", undefined, session); }
export function recordConversionHistory(session: AuthSession, toolId: string, action: string) { return request<{ message: string }>("/me/conversion-history", "POST", { toolId, action }, session); }
