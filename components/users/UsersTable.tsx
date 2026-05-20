import Link from "next/link";

import { linkClassName } from "@/lib/styles";
import type { UserWithActivity } from "@/lib/users/activity";

type UsersTableProps = {
  users: UserWithActivity[];
  returnTo: string;
};

export function UsersTable({ users, returnTo }: UsersTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm md:block dark:border-zinc-800 dark:bg-zinc-950">
      <table className="w-full min-w-[920px] border-collapse text-left text-sm">
        <caption className="sr-only">
          Users with contact details and activity counts. Use the View link to
          open a profile.
        </caption>
        <thead className="sticky top-0 z-[1] bg-zinc-50 dark:bg-zinc-900/95">
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Website
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Posts
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Completed
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Pending
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const href = `/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`;
            return (
              <tr
                key={user.id}
                className="border-b border-zinc-100 transition-colors last:border-0 hover:bg-zinc-50/80 dark:border-zinc-900 dark:hover:bg-zinc-900/40"
              >
                <td className="max-w-[180px] px-4 py-3">
                  <Link href={href} className={linkClassName} title={user.name}>
                    <span className="line-clamp-1">{user.name}</span>
                  </Link>
                </td>
                <td
                  className="max-w-[200px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400"
                  title={user.email}
                >
                  {user.email}
                </td>
                <td
                  className="max-w-[140px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400"
                  title={user.website}
                >
                  {user.website}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {user.postCount}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {user.completedTodos}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {user.pendingTodos}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={href}
                    className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:outline-zinc-50"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
