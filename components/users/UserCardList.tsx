import Link from "next/link";

import type { UserWithActivity } from "@/lib/users/activity";

type UserCardListProps = {
  users: UserWithActivity[];
  returnTo: string;
};

export function UserCardList({ users, returnTo }: UserCardListProps) {
  return (
    <ul className="flex flex-col gap-3 md:hidden">
      {users.map((user) => (
        <li key={user.id}>
          <Link
            href={`/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`}
            className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50 dark:focus-visible:outline-zinc-50"
          >
            <p className="font-medium text-zinc-900 line-clamp-2 dark:text-zinc-50">
              {user.name}
            </p>
            <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </p>
            <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-500">
              {user.website}
            </p>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Posts</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {user.postCount}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Done</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {user.completedTodos}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500 dark:text-zinc-400">Pending</dt>
                <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {user.pendingTodos}
                </dd>
              </div>
            </dl>
          </Link>
        </li>
      ))}
    </ul>
  );
}
