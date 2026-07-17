import { Construction, UploadCloud } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  action?: ReactNode;
  description?: string;
  message: string;
  title?: string;
}

export default function EmptyState({
  action,
  description,
  message,
  title = "Nothing to show yet",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      {title === "Coming soon" ? <Construction className="mb-4 h-12 w-12 text-blue-500" /> : <UploadCloud className="mb-4 h-12 w-12 text-slate-400" />}

      <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">{message}</p>
      {description && <p className="mt-1 max-w-md text-sm text-slate-400 dark:text-slate-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
