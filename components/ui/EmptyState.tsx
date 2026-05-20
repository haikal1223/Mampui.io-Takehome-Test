import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900/20"
      role="status"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        aria-hidden
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
