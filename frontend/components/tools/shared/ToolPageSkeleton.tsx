import Header from "@/components/layout/Header";

export default function ToolPageSkeleton() {
  return <><Header /><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10" aria-busy="true" aria-label="Loading tool"><div className="animate-pulse"><div className="h-9 w-56 rounded-lg bg-slate-800" /><div className="mt-4 h-5 w-full max-w-2xl rounded bg-slate-800" /><div className="mt-10 grid gap-6 lg:grid-cols-3"><div className="min-h-[24rem] rounded-2xl border border-slate-700 bg-slate-900 p-6 lg:col-span-2"><div className="h-5 w-32 rounded bg-slate-800" /><div className="mt-5 h-64 rounded-xl bg-slate-800" /></div><div className="rounded-2xl border border-slate-700 bg-slate-900 p-6"><div className="h-6 w-40 rounded bg-slate-800" /><div className="mt-6 h-12 rounded-xl bg-slate-800" /><div className="mt-4 h-12 rounded-xl bg-slate-800" /><div className="mt-7 h-12 rounded-xl bg-blue-900/50" /></div></div></div><span className="sr-only">Loading tool…</span></main></>;
}
