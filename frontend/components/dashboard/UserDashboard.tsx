"use client";

import Link from "next/link";
import { Clock3, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { getConversionHistory, type ConversionHistoryEntry } from "@/lib/authApi";
import { FAVORITES_CHANGED_EVENT, getFavoriteToolIds } from "@/lib/favorites";
import { getToolById } from "@/lib/tools";

export default function UserDashboard() {
  const { isLoading, session, user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [history, setHistory] = useState<ConversionHistoryEntry[]>([]);

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(getFavoriteToolIds());
    syncFavorites();
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    return () => window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
  }, []);

  useEffect(() => {
    if (!session) return;
    void getConversionHistory(session).then(setHistory).catch(() => setHistory([]));
  }, [session]);

  const favorites = useMemo(
    () => favoriteIds.map(getToolById).filter((tool): tool is NonNullable<typeof tool> => tool !== undefined),
    [favoriteIds],
  );
  if (isLoading) return <main className="mx-auto max-w-6xl animate-pulse px-4 py-12 sm:px-6"><div className="h-10 w-56 rounded bg-slate-200 dark:bg-slate-800" /><div className="mt-8 h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" /></main>;
  if (!user) return <main className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6"><h1 className="text-3xl font-bold">Your dashboard is waiting</h1><p className="mt-3 text-slate-600 dark:text-slate-400">Sign in to manage your profile, favorites, and activity.</p><Link className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700" href="/">Go home</Link></main>;

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;
  return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6"><section className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-xl shadow-blue-950/20 sm:p-10"><div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-100"><Sparkles className="h-4 w-4" />Your workspace</p><h1 className="mt-3 text-3xl font-bold sm:text-4xl">Welcome back, {name.split(" ")[0]}</h1><p className="mt-3 max-w-xl text-blue-100">Your favorite tools and recent account activity are synced securely to your account.</p></div><Link className="rounded-xl bg-white px-5 py-3 text-center font-semibold text-blue-700 transition hover:bg-blue-50" href="/dashboard/profile">Manage profile</Link></div></section><section className="mt-7 grid gap-4 sm:grid-cols-3"><Stat icon={<Heart className="h-5 w-5" />} label="Saved tools" value={String(favorites.length)} /><Stat icon={<Clock3 className="h-5 w-5" />} label="Recent activity" value={String(history.length)} /><Stat icon={<ShieldCheck className="h-5 w-5" />} label="Email status" value={user.emailVerified ? "Verified" : "Verify"} /></section><section className="mt-8 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Favorites</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your saved tools, available on every signed-in device.</p></div><Heart className="h-5 w-5 text-rose-500" /></div><div className="mt-5 space-y-3">{favorites.length ? favorites.slice(0, 5).map((tool) => <Link key={tool.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-blue-400 dark:border-slate-700" href={tool.route}><span className="flex items-center gap-3"><span className="text-xl">{tool.icon}</span><span className="font-semibold">{tool.title}</span></span><span className="text-sm font-semibold text-blue-600">Open</span></Link>) : <Empty text="Save a tool with the heart icon to see it here." />}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Recent activity</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Tools you opened while signed in.</p></div><Clock3 className="h-5 w-5 text-blue-600" /></div><div className="mt-5 space-y-3">{history.length ? history.slice(0, 5).map((item, index) => { const tool = getToolById(item.toolId); return <div key={`${item.toolId}-${item.occurredAt}-${index}`} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700"><span className="flex items-center gap-3"><span className="text-xl">{tool?.icon ?? "🛠️"}</span><span><span className="block font-semibold">{tool?.title ?? item.toolId}</span><span className="text-xs text-slate-500">{item.action}</span></span></span><time className="text-xs text-slate-500">{new Date(item.occurredAt).toLocaleDateString()}</time></div>; }) : <Empty text="Open a tool while signed in to create your activity history." />}</div></div></section></main>;
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center gap-3 text-blue-600">{icon}<span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</span></div><p className="mt-3 text-2xl font-bold">{value}</p></div>; }
function Empty({ text }: { text: string }) { return <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">{text}</p>; }
