import { getPersistentFavoriteToolIds, getStoredSession, removePersistentFavorite, savePersistentFavorite, type AuthSession } from "@/lib/authApi";

export const FAVORITES_CHANGED_EVENT = "allconverterhub:favorites-changed";
const FAVORITES_KEY = "allconverterhub:favorite-tools";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getFavoriteToolIds() {
  if (!isBrowser()) return [];
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function saveFavoriteToolIds(ids: string[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
  } catch {
    // Local storage can be unavailable in private or restricted browser sessions.
  }
}

export function toggleFavoriteTool(toolId: string) {
  const currentIds = getFavoriteToolIds();
  const nextIds = currentIds.includes(toolId) ? currentIds.filter((id) => id !== toolId) : [toolId, ...currentIds];
  saveFavoriteToolIds(nextIds);
  const session = getStoredSession();
  if (session) {
    const persist = nextIds.includes(toolId) ? savePersistentFavorite(session, toolId) : removePersistentFavorite(session, toolId);
    void persist.catch(() => undefined);
  }
  return nextIds.includes(toolId);
}

export async function hydrateFavoriteTools(session: AuthSession) {
  const localIds = getFavoriteToolIds();
  await Promise.all(localIds.map((toolId) => savePersistentFavorite(session, toolId)));
  saveFavoriteToolIds(await getPersistentFavoriteToolIds(session));
}

export function clearFavoriteTools() {
  if (!isBrowser()) return;
  const session = getStoredSession();
  if (session) void Promise.all(getFavoriteToolIds().map((toolId) => removePersistentFavorite(session, toolId))).catch(() => undefined);
  try {
    window.localStorage.removeItem(FAVORITES_KEY);
    window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
  } catch {
    // Nothing to do when local storage is unavailable.
  }
}
