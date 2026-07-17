"use client";

import Link from "next/link";
import { Command, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { featuredTools } from "@/lib/tools";

export default function GlobalToolSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const tools = useMemo(() => featuredTools.filter((tool) => tool.enabled), []);
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return tools.slice(0, 6);
    return tools.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(normalizedQuery));
  }, [query, tools]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  function closeSearch() {
    setIsOpen(false);
    setQuery("");
  }

  return <><button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-400" aria-label="Search tools"><Search className="h-4 w-4" /><span className="hidden lg:inline">Search tools</span><span className="hidden items-center gap-0.5 rounded border border-gray-300 px-1 text-xs text-gray-500 dark:border-slate-700 dark:text-slate-400 lg:flex"><Command className="h-3 w-3" />K</span></button>{isOpen && <div role="dialog" aria-modal="true" aria-label="Search tools" className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/70 px-4 pt-20 backdrop-blur-sm" onMouseDown={closeSearch}><div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-center border-b border-slate-700 px-4"><Search className="h-5 w-5 shrink-0 text-slate-400" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Image Compressor, PDF, QR…" className="w-full bg-transparent px-3 py-5 text-base text-white outline-none placeholder:text-slate-500" /><button type="button" onClick={closeSearch} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white" aria-label="Close search"><X className="h-5 w-5" /></button></div><div className="max-h-[60vh] overflow-y-auto p-3"><p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{query ? "Results" : "Popular tools"}</p>{results.length ? <div className="space-y-1">{results.map((tool) => <Link key={tool.id} href={tool.route} onClick={closeSearch} className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-slate-800"><span className="text-2xl" aria-hidden="true">{tool.icon}</span><span className="min-w-0 flex-1"><span className="block font-semibold text-white">{tool.title}</span><span className="mt-0.5 block truncate text-sm text-slate-400">{tool.description}</span></span><span className="hidden rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-400 sm:block">{tool.category}</span></Link>)}</div> : <p className="px-3 py-10 text-center text-sm text-slate-400">No tools match “{query}”. Try image, PDF, QR, resize, or convert.</p>}</div><div className="flex items-center justify-between border-t border-slate-700 px-4 py-3 text-xs text-slate-500"><span>Searches all available tools</span><span>Esc to close</span></div></div></div>}</>;
}
