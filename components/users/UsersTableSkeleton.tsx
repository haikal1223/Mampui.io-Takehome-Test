export function UsersTableSkeleton() {
  return (
    <div
      className="hidden overflow-hidden rounded-xl border border-zinc-200 md:block dark:border-zinc-800"
      aria-hidden
    >
      <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex gap-8">
          {["Name", "Email", "Website", "Posts", "Done", "Pending"].map(
            (label) => (
              <div
                key={label}
                className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700"
              />
            ),
          )}
        </div>
      </div>
      {Array.from({ length: 6 }).map((_, row) => (
        <div
          key={row}
          className="flex gap-8 border-b border-zinc-100 px-4 py-4 last:border-0 dark:border-zinc-900"
        >
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}
