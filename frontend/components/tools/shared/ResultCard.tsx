import { ReactNode } from "react";

interface ResultCardProps {
  children: ReactNode;
}

export default function ResultCard({
  children,
}: ResultCardProps) {
  return (
    <div className="mt-8 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
      {children}
    </div>
  );
}