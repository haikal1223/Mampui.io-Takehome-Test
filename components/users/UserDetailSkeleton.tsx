export function UserDetailSkeleton() {
  return (
    <div
      className="animate-pulse space-y-6 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
      aria-busy="true"
      aria-label="Loading user details"
    >
      <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-zinc-200 dark:bg-zinc-800"
            style={{ width: `${70 - index * 10}%` }}
          />
        ))}
      </div>
      <div className="h-24 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}
