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
  const featuredTools = tools.filter((tool) => tool.featured);
  const popularTools = tools.filter((tool) => tool.popular);
  const showCollections = !query && selectedCategory === "All";

  return (
    <section id="tool-discovery" className="scroll-mt-20 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Tool discovery</p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Find the right tool quickly</h2>
            <p className="mt-3 text-gray-400">Search the tools currently available to use.</p>
          </div>
          {selectedCategory !== "All" && <button onClick={() => onCategorySelect("All")} className="self-start rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-white hover:border-blue-500">Clear filter</button>}
        </div>

        {showCollections && <div className="mt-12 space-y-12"><ToolCollection title="Featured tools" description="Hand-picked tools to start with." tools={featuredTools} /><ToolCollection title="Popular right now" description="The tools people use most often." tools={popularTools} /></div>}

        <div className={`${showCollections ? "mt-16" : "mt-12"} flex items-center justify-between`}>
          <h3 className="text-xl font-bold text-white sm:text-2xl">{normalizedQuery ? "Search results" : selectedCategory === "All" ? "All available tools" : selectedCategory}</h3>
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

function ToolCollection({ description, title, tools }: { description: string; title: string; tools: Tool[] }) {
  return <div><div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"><div><h3 className="text-2xl font-bold text-white">{title}</h3><p className="mt-1 text-sm text-slate-400">{description}</p></div><span className="text-sm text-slate-500">{tools.length} tools</span></div><div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{tools.map((tool) => <ToolCard key={tool.id} id={tool.id} icon={tool.icon} title={tool.title} description={tool.description} badge={tool.badge} />)}</div></div>;
}
