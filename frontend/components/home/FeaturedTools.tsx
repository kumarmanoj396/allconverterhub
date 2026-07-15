"use client";

import ToolCard from "@/components/ui/ToolCard";
import type { Tool } from "@/lib/tools";

interface FeaturedToolsProps {
  tools: Tool[];
  query: string;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function FeaturedTools({ tools, query, selectedCategory, onCategorySelect }: FeaturedToolsProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const haystack = `${tool.title} ${tool.description} ${tool.category}`.toLowerCase();

    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
  const popularTools = tools.filter((tool) => tool.badge === "Popular" || tool.id === "image-resizer" || tool.id === "image-converter");

  return (
    <section id="tool-discovery" className="scroll-mt-20 bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Popular tools</p>
            <h2 className="mt-2 text-4xl font-bold text-white">Find the right tool quickly</h2>
            <p className="mt-3 text-gray-400">Search the tools currently available to use.</p>
          </div>
          {selectedCategory !== "All" && <button onClick={() => onCategorySelect("All")} className="self-start rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-white hover:border-blue-500">Clear filter</button>}
        </div>

        {!query && selectedCategory === "All" && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {popularTools.map((tool) => <ToolCard key={tool.id} id={tool.id} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} />)}
          </div>
        )}

        <div className="mt-12 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">{normalizedQuery ? "Search results" : selectedCategory === "All" ? "All available tools" : selectedCategory}</h3>
          <span className="text-sm text-slate-400">{filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}</span>
        </div>
        {filteredTools.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => <ToolCard key={tool.id} id={tool.id} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No matching tool yet. Try searching for image, QR, resize, or convert.</div>
        )}
      </div>
    </section>
  );
}
