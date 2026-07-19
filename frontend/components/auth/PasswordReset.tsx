"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, CircleX, KeyRound } from "lucide-react";
import Button from "@/components/ui/Button";
import { resetPassword } from "@/lib/authApi";

interface PasswordResetProps {
  token?: string;
}

export default function PasswordReset({ token }: PasswordResetProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState(token ? "" : "This reset link is missing its token. Request a new password reset link.");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    setError("");
    setMessage("");
    if (password.length < 12) return setError("Use a password of at least 12 characters.");
    if (password !== confirmation) return setError("Passwords do not match.");

    setSubmitting(true);
    try {
      setMessage((await resetPassword(token, password)).message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to reset your password.");
    } finally {
      setSubmitting(false);
    }
  };

  const complete = Boolean(message);
  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        {complete ? <CheckCircle2 aria-hidden="true" className="mx-auto h-12 w-12 text-emerald-500" /> : error && !token ? <CircleX aria-hidden="true" className="mx-auto h-12 w-12 text-red-500" /> : <KeyRound aria-hidden="true" className="mx-auto h-12 w-12 text-blue-500" />}
        <h1 className="mt-5 text-center text-2xl font-bold text-slate-900 dark:text-white">{complete ? "Password updated" : "Choose a new password"}</h1>
        {complete ? <><p className="mt-3 text-center text-slate-600 dark:text-slate-300">{message}</p><Link className="mt-7 flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700" href="/">Return home and log in</Link></> : <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">New password<input autoComplete="new-password" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={!token || submitting} minLength={12} onChange={(event) => setPassword(event.target.value)} required type="password" value={password} /><span className="font-normal text-slate-500">At least 12 characters.</span></label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">Confirm password<input autoComplete="new-password" className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-950 outline-none ring-blue-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-950 dark:text-white" disabled={!token || submitting} onChange={(event) => setConfirmation(event.target.value)} required type="password" value={confirmation} /></label>
          {error && <p aria-live="polite" className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200">{error}</p>}
          <Button className="w-full" disabled={!token || submitting} type="submit">{submitting ? "Updating password…" : "Update password"}</Button>
        </form>}
      </section>
    </main>
  );
}
