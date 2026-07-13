import { ReactNode } from "react";

interface ToolContainerProps {
  children: ReactNode;
}

export default function ToolContainer({
  children,
}: ToolContainerProps) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
}