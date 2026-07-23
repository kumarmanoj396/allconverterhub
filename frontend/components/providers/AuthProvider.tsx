"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearSession, getProfile, getStoredSession, loginAccount, registerAccount, saveSession, type AuthSession, type UserProfile } from "@/lib/authApi";
import { hydrateFavoriteTools } from "@/lib/favorites";

interface AuthContextValue {
  email: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<UserProfile | null>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<string>;
  session: AuthSession | null;
  user: UserProfile | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  const logout = useCallback(() => { clearSession(); setSession(null); setUser(null); }, []);
  const loadProfile = useCallback(async (activeSession: AuthSession) => {
    const profile = await getProfile(activeSession);
    setSession(activeSession);
    setUser(profile);
    try {
      await hydrateFavoriteTools(activeSession);
    } catch {
      // A preferences sync failure must not invalidate an otherwise valid session.
    }
    return profile;
  }, []);

  useEffect(() => {
    async function restoreSession() {
      const saved = getStoredSession();
      if (saved) {
        try {
          await loadProfile(saved);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    }
    void restoreSession();
  }, [loadProfile, logout]);

  const value = useMemo<AuthContextValue>(() => ({
    email: user?.email ?? null,
    isLoading,
    session,
    user,
    async login(email, password) {
      const nextSession = await loginAccount(email, password);
      saveSession(nextSession);
      await loadProfile(nextSession);
    },
    logout,
    async refreshProfile() {
      if (!session) return null;
      try { return await loadProfile(session); } catch { logout(); return null; }
    },
    async register(firstName, lastName, email, password) {
      const response = await registerAccount(firstName, lastName, email, password);
      return response.message;
    },
  }), [isLoading, loadProfile, logout, session, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
