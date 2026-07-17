import Link from "next/link";

import FavoriteButton from "@/components/ui/FavoriteButton";

type ToolCardProps = {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
};

export default function ToolCard({
  id,
  icon,
  title,
  description,
  badge,
}: ToolCardProps) {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
      <div className="absolute right-4 top-4 z-10"><FavoriteButton toolId={id} toolTitle={title} /></div>
      <Link href={`/tools/${id}`} className="block p-6">
        <div className="text-5xl">{icon}</div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          {badge && (
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-4 text-sm text-slate-400">
          {description}
        </p>

        <span className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white">
          Use Tool
        </span>
      </Link>
    </div>
  );
}
