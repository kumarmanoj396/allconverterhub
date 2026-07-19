"use client";

import Link from "next/link";
import { Clock3, Heart, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { FAVORITES_CHANGED_EVENT, getFavoriteToolIds } from "@/lib/favorites";
import { getRecentToolIds } from "@/lib/recentTools";
import { getToolById } from "@/lib/tools";

function ToolList({ empty, ids }: { empty: string; ids: string[] }) {
  const tools = useMemo(() => ids.map(getToolById).filter((tool) => tool !== undefined), [ids]);
  if (!tools.length) return <p className="text-sm text-slate-500 dark:text-slate-400">{empty}</p>;
  return <ul className="space-y-3">{tools.map((tool) => <li key={tool.id}><Link className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-blue-500 hover:bg-blue-50 dark:border-slate-800 dark:hover:bg-slate-900" href={tool.route}><span><span className="mr-2">{tool.icon}</span><span className="font-semibold">{tool.title}</span></span><span className="text-sm text-blue-600">Open</span></Link></li>)}</ul>;
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

  if (!email || !session) return <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6"><section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"><UserRound className="mx-auto mb-4 text-blue-600" size={36} /><h1 className="text-3xl font-bold">Your dashboard</h1><p className="mt-3 text-slate-600 dark:text-slate-300">Log in to see your browser-saved favorites and recent tools.</p><Link className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white" href="/">Return home to log in</Link></section></main>;

  return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><div className="mb-8"><p className="font-semibold uppercase tracking-widest text-blue-600">Account</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Your dashboard</h1><p className="mt-2 text-slate-600 dark:text-slate-300">Quick access to the tools you use most.</p></div><section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="flex gap-4"><span className="rounded-full bg-blue-100 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-300"><UserRound /></span><div><h2 className="font-semibold">{email}</h2><p className="mt-1 flex items-center gap-2 text-sm text-emerald-600"><ShieldCheck size={16} />Verified account</p><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your sign-in session is active in this browser tab.</p></div></div></section><div className="grid gap-6 lg:grid-cols-2"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><Heart className="text-rose-500" />Favorites</h2><ToolList empty="Favorite a tool to keep it here." ids={favoriteIds} /></section><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="mb-5 flex items-center gap-2 text-xl font-bold"><Clock3 className="text-blue-600" />Recently used</h2><ToolList empty="Open a tool and it will appear here." ids={recentIds} /></section></div></main>;
}
