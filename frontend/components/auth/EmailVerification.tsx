"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, CircleX, LoaderCircle } from "lucide-react";
import { verifyEmail } from "@/lib/authApi";

interface EmailVerificationProps {
  token?: string;
}

type VerificationState = "error" | "loading" | "success";

export default function EmailVerification({ token }: EmailVerificationProps) {
  const missingTokenMessage = "This verification link is missing its token. Request a new email verification link.";
  const [message, setMessage] = useState(token ? "Verifying your email address…" : missingTokenMessage);
  const [state, setState] = useState<VerificationState>(token ? "loading" : "error");

  useEffect(() => {
    if (!token) return;

    let active = true;
    verifyEmail(token)
      .then((response) => {
        if (!active) return;
        setMessage(response.message);
        setState("success");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setMessage(reason instanceof Error ? reason.message : "Unable to verify this email address.");
        setState("error");
      });

    return () => { active = false; };
  }, [token]);

  const Icon = state === "loading" ? LoaderCircle : state === "success" ? CheckCircle2 : CircleX;
  const iconClass = state === "loading" ? "animate-spin text-blue-500" : state === "success" ? "text-emerald-500" : "text-red-500";

  return (
    <main className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16 dark:bg-slate-950">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Icon aria-hidden="true" className={`mx-auto h-12 w-12 ${iconClass}`} />
        <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">{state === "success" ? "Email verified" : state === "loading" ? "Verifying email" : "Verification unavailable"}</h1>
        <p aria-live="polite" className="mt-3 text-slate-600 dark:text-slate-300">{message}</p>
        {state !== "loading" && <Link className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700" href="/">Return home</Link>}
      </section>
    </main>
  );
}
