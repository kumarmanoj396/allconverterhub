"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { loginAccount, registerAccount, type AuthSession } from "@/lib/authApi";

interface AuthContextValue {
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<string>;
  session: AuthSession | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);

  const value = useMemo<AuthContextValue>(() => ({
    email,
    session,
    async login(nextEmail, password) {
      const nextSession = await loginAccount(nextEmail, password);
      setEmail(nextEmail);
      setSession(nextSession);
    },
    logout() {
      setEmail(null);
      setSession(null);
    },
    async register(nextEmail, password) {
      const response = await registerAccount(nextEmail, password);
      return response.message;
    },
  }), [email, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
