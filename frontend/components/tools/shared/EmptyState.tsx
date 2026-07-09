import { UploadCloud } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
      <UploadCloud className="mb-4 h-12 w-12 text-slate-400" />

      <p className="text-slate-500 dark:text-slate-400">
        {message}
      </p>
    </div>
  );
}