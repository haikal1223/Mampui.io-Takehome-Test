export function UserDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8" aria-busy="true" aria-label="Loading user details">
      <div className="h-5 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="animate-pulse space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="space-y-3 border-b border-zinc-100 pb-6 dark:border-zinc-900">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-4 rounded bg-zinc-200 dark:bg-zinc-800"
              style={{ width: `${80 - index * 12}%` }}
            />
          ))}
        </div>
        <div className="h-20 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="grid gap-8">
        <div className="h-32 animate-pulse rounded-xl border border-zinc-200 dark:border-zinc-800" />
        <div className="h-32 animate-pulse rounded-xl border border-zinc-200 dark:border-zinc-800" />
      </div>
    </div>
  );
}
