const RECENT_TOOLS_KEY = "allconverterhub:recent-tools";
const MAX_RECENT_TOOLS = 6;

function isBrowser() {
  return typeof window !== "undefined";
}

export function getRecentToolIds() {
  if (!isBrowser()) return [];
  try {
    const stored = window.localStorage.getItem(RECENT_TOOLS_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function recordRecentTool(toolId: string) {
  if (!isBrowser()) return;
  const nextIds = [toolId, ...getRecentToolIds().filter((id) => id !== toolId)].slice(0, MAX_RECENT_TOOLS);
  try {
    window.localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(nextIds));
  } catch {
    // Local storage can be unavailable in private or restricted browser sessions.
  }
}

export function clearRecentTools() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(RECENT_TOOLS_KEY);
  } catch {
    // Nothing to do when local storage is unavailable.
  }
}
