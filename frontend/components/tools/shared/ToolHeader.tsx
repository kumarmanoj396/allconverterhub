interface ToolHeaderProps {
  title: string;
  description: string;
}

export default function ToolHeader({
  title,
  description,
}: ToolHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}