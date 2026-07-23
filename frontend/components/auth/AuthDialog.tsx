"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/providers/AuthProvider";
import { requestPasswordReset } from "@/lib/authApi";

export type AuthMode = "forgot-password" | "login" | "register";

interface AuthDialogProps {
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
}

const labels = {
  "forgot-password": { action: "Send reset link", prompt: "Remember your password?", switch: "Login", title: "Reset your password" },
  login: { action: "Login", prompt: "New to AllConverterHub?", switch: "Create an account", title: "Welcome back" },
  register: { action: "Create account", prompt: "Already have an account?", switch: "Login", title: "Create your account" },
};

export default function AuthDialog({ mode, onClose, onModeChange }: AuthDialogProps) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const copy = labels[mode];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, submitting]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (mode === "register" && password.length < 12) {
      setError("Use a password of at least 12 characters.");
      return;
    }

    if (mode === "register" && (!firstName.trim() || !lastName.trim())) {
      setError("Enter your first and last name.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
        onClose();
      } else if (mode === "forgot-password") {
        setNotice((await requestPasswordReset(email)).message);
      } else {
        setNotice(await register(firstName, lastName, email, password));
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to complete your request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) onClose(); }}>
      <section aria-labelledby="auth-dialog-title" aria-modal="true" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900" role="dialog">
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="auth-dialog-title" className="text-2xl font-bold text-slate-900 dark:text-white">{copy.title}</h2><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Your session stays in this browser tab.</p></div>
          <button aria-label="Close account dialog" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800" disabled={submitting} onClick={onClose} type="button"><X size={20} /></button>
        </div>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === "register" && <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">First name<input autoComplete="given-name" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={submitting} maxLength={60} onChange={(event) => setFirstName(event.target.value)} required value={firstName} /></label><label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Last name<input autoComplete="family-name" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={submitting} maxLength={60} onChange={(event) => setLastName(event.target.value)} required value={lastName} /></label></div>}
          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Email<input autoComplete="email" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={submitting} onChange={(event) => setEmail(event.target.value)} required type="email" value={email} /></label>
          {mode !== "forgot-password" && <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Password<input autoComplete={mode === "login" ? "current-password" : "new-password"} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={submitting} minLength={mode === "register" ? 12 : undefined} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} />{mode === "register" && <span className="font-normal text-slate-500">At least 12 characters.</span>}</label>}
          {error && <p aria-live="polite" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p>}
          {notice && <p aria-live="polite" className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-200">{notice}</p>}
          <Button className="w-full" disabled={submitting} type="submit">{submitting ? "Please wait…" : copy.action}</Button>
        </form>
        {mode === "login" && <button className="mt-4 w-full text-center text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400" onClick={() => { setError(""); setNotice(""); onModeChange("forgot-password"); }} type="button">Forgot password?</button>}
        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">{copy.prompt} <button className="font-semibold text-blue-600 hover:underline dark:text-blue-400" onClick={() => { setError(""); setNotice(""); onModeChange(mode === "register" ? "login" : mode === "login" ? "register" : "login"); }} type="button">{copy.switch}</button></p>
      </section>
    </div>
  );
}
