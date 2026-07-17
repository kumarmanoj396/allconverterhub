"use client";

import { Clock3, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import ToolCard from "@/components/ui/ToolCard";
import { clearRecentTools, getRecentToolIds } from "@/lib/recentTools";
import type { Tool } from "@/lib/tools";

export default function RecentTools({ tools }: { tools: Tool[] }) {
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const recentTools = useMemo(() => recentIds.map((id) => tools.find((tool) => tool.id === id)).filter((tool): tool is Tool => Boolean(tool)), [recentIds, tools]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setRecentIds(getRecentToolIds()), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!recentTools.length) return null;

  function clearAll() {
    clearRecentTools();
    setRecentIds([]);
  }

  return <section className="bg-slate-950 py-16"><div className="mx-auto max-w-7xl px-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-400"><Clock3 className="h-4 w-4" />Your activity</p><h2 className="mt-2 text-3xl font-bold text-white">Recently used tools</h2><p className="mt-2 text-slate-400">Saved only in this browser.</p></div><button type="button" onClick={clearAll} className="inline-flex self-start items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 hover:text-white"><Trash2 className="h-4 w-4" />Clear</button></div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{recentTools.map((tool) => <ToolCard key={tool.id} id={tool.id} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} />)}</div></div></section>;
}
