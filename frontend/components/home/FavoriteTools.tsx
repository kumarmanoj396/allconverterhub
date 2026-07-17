"use client";

import { Heart, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ToolCard from "@/components/ui/ToolCard";
import { FAVORITES_CHANGED_EVENT, clearFavoriteTools, getFavoriteToolIds } from "@/lib/favorites";
import type { Tool } from "@/lib/tools";

export default function FavoriteTools({ tools }: { tools: Tool[] }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const favorites = useMemo(() => favoriteIds.map((id) => tools.find((tool) => tool.id === id)).filter((tool): tool is Tool => Boolean(tool)), [favoriteIds, tools]);

  useEffect(() => {
    const syncFavorites = () => setFavoriteIds(getFavoriteToolIds());
    const timeoutId = window.setTimeout(syncFavorites, 0);
    window.addEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener(FAVORITES_CHANGED_EVENT, syncFavorites);
    };
  }, []);

  if (!favorites.length) return null;

  function clearAll() {
    clearFavoriteTools();
  }

  return <section className="bg-slate-950 py-16"><div className="mx-auto max-w-7xl px-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-rose-400"><Heart className="h-4 w-4 fill-current" />Your favorites</p><h2 className="mt-2 text-3xl font-bold text-white">Saved tools</h2><p className="mt-2 text-slate-400">Stored only in this browser for now.</p></div><button type="button" onClick={clearAll} className="inline-flex self-start items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white"><Trash2 className="h-4 w-4" />Clear</button></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{favorites.map((tool) => <ToolCard key={tool.id} id={tool.id} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} />)}</div></div></section>;
}
