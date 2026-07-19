"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Heart, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import { useAuth } from "@/components/providers/AuthProvider";
import { FAVORITES_CHANGED_EVENT, getFavoriteToolIds } from "@/lib/favorites";
import { getRecentToolIds } from "@/lib/recentTools";
import { getToolById } from "@/lib/tools";

function ToolList({ empty, ids }: { empty: string; ids: string[] }) {
  const tools = useMemo(() => ids.map(getToolById).filter((tool) => tool !== undefined), [ids]);

  if (!tools.length) return <div className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">{empty}</div>;

  return <ul className="space-y-3">{tools.map((tool) => <li key={tool.id}><Link className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-950" href={tool.route}><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-lg shadow-sm dark:bg-slate-900">{tool.icon}</span><span className="min-w-0 flex-1"><span className="block truncate font-semibold">{tool.title}</span><span className="block truncate text-xs text-slate-500 dark:text-slate-400">{tool.category}</span></span><ArrowUpRight className="shrink-0 text-blue-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} /></Link></li>)}</ul>;
}

export default function UserDashboard() {
  const { email, session } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => { setFavoriteIds(getFavoriteToolIds()); setRecentIds(getRecentToolIds()); };
    sync();
    window.addEventListener(FAVORITES_CHANGED_EVENT, sync);
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, sync);
  }, []);

  if (!email || !session) return <><Header /><main className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"><UserRound className="mx-auto mb-4 text-blue-600" size={36} /><h1 className="text-3xl font-bold">Your dashboard</h1><p className="mt-3 text-slate-600 dark:text-slate-300">Log in to see your browser-saved favorites and recent tools.</p><Link className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white" href="/">Return home to log in</Link></section></main></>;

  return <><Header /><main className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><Link className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700" href="/"><ArrowLeft size={16} />Home</Link><section className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-950/20 sm:p-8"><div className="absolute -right-12 -top-16 size-56 rounded-full bg-white/10" /><div className="absolute -bottom-20 right-32 size-48 rounded-full bg-cyan-300/10" /><div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/30"><UserRound size={27} /></span><div><p className="text-sm font-medium text-blue-100">Welcome back</p><h1 className="mt-1 text-xl font-bold sm:text-2xl">{email}</h1><p className="mt-2 flex items-center gap-2 text-sm text-emerald-200"><ShieldCheck size={16} />Verified account</p></div></div><Link className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50" href="/"><Sparkles size={17} />Explore tools</Link></div></section><section className="my-6 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-500 dark:bg-rose-950/40"><Heart size={20} /></span><span className="text-3xl font-bold">{favoriteIds.length}</span></div><p className="mt-4 font-semibold">Favorite tools</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your personal shortcuts.</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40"><Clock3 size={20} /></span><span className="text-3xl font-bold">{recentIds.length}</span></div><p className="mt-4 font-semibold">Recent activity</p><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Continue where you left off.</p></div></section><div className="grid gap-6 lg:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xl font-bold"><Heart className="text-rose-500" />Favorites</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{favoriteIds.length}</span></div><ToolList empty="Tap the heart on any tool to add it here." ids={favoriteIds} /></section><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5 flex items-center justify-between"><h2 className="flex items-center gap-2 text-xl font-bold"><Clock3 className="text-blue-600" />Recently used</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{recentIds.length}</span></div><ToolList empty="Open a tool and it will appear here automatically." ids={recentIds} /></section></div></main></>;
}
