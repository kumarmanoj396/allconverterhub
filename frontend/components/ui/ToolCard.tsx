type ToolCardProps = {
  icon: string;
  title: string;
  description: string;
  badge?: string;
};

export default function ToolCard({
  icon,
  title,
  description,
  badge,
}: ToolCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">
      <div className="text-5xl">{icon}</div>

      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>

        {badge && (
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
            {badge}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-400">{description}</p>

      <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
        Use Tool
      </button>
    </div>
  );
}