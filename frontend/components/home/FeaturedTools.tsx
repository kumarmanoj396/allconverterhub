import ToolCard from "@/components/ui/ToolCard";
import { featuredTools } from "@/lib/tools";

export default function FeaturedTools() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Featured Tools</h2>
          <p className="mt-4 text-gray-400">
            Most popular tools used by our community.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
  <ToolCard
    key={tool.id}
    id={tool.id}
    icon={tool.icon}
    title={tool.title}
    description={tool.description}
    badge={tool.badge}
  />
))}
        </div>
      </div>
    </section>
  );
}