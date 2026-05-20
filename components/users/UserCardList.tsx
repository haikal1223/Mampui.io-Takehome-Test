import Link from "next/link";

import type { UserWithActivity } from "@/lib/users/activity";

type UserCardListProps = {
  users: UserWithActivity[];
  returnTo: string;
};

export function UserCardList({ users, returnTo }: UserCardListProps) {
  return (
    <ul className="flex flex-col gap-3 md:hidden" aria-label="Users list">
      {users.map((user) => {
        const href = `/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`;
        return (
          <li key={user.id}>
            <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <Link
                href={href}
                className="block p-4 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:bg-zinc-900/50 dark:focus-visible:outline-zinc-50"
              >
                <p className="font-medium text-zinc-900 line-clamp-2 dark:text-zinc-50">
                  {user.name}
                </p>
                <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
                  {user.email}
                </p>
                <p className="mt-0.5 truncate text-sm text-zinc-500">
                  {user.website}
                </p>
              </Link>
              <dl className="grid grid-cols-3 gap-px border-t border-zinc-100 bg-zinc-50 text-center text-xs dark:border-zinc-900 dark:bg-zinc-900/50">
                <div className="px-2 py-2.5">
                  <dt className="text-zinc-500 dark:text-zinc-400">Posts</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {user.postCount}
                  </dd>
                </div>
                <div className="border-x border-zinc-100 px-2 py-2.5 dark:border-zinc-900">
                  <dt className="text-zinc-500 dark:text-zinc-400">Done</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {user.completedTodos}
                  </dd>
                </div>
                <div className="px-2 py-2.5">
                  <dt className="text-zinc-500 dark:text-zinc-400">Pending</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                    {user.pendingTodos}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-zinc-100 p-3 dark:border-zinc-900">
                <Link
                  href={href}
                  className="flex min-h-10 w-full items-center justify-center rounded-lg border border-zinc-300 text-sm font-medium text-zinc-800 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-50"
                >
                  View profile
                </Link>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
