export function UserCardsSkeleton() {
  return (
    <ul className="flex flex-col gap-3 md:hidden" aria-hidden>
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="animate-pulse rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-10 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </li>
      ))}
    </ul>
  );
}
