import Link from "next/link";

import type { UserWithActivity } from "@/lib/users/activity";

type UsersTableProps = {
  users: UserWithActivity[];
  returnTo: string;
};

export function UsersTable({ users, returnTo }: UsersTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[900px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Name
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Email
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Website
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Posts
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Completed
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-50">
              Pending
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/50"
            >
              <td className="max-w-[180px] px-4 py-3">
                <Link
                  href={`/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`}
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-50"
                  title={user.name}
                >
                  <span className="line-clamp-1">{user.name}</span>
                </Link>
              </td>
              <td className="max-w-[200px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400" title={user.email}>
                {user.email}
              </td>
              <td className="max-w-[140px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400" title={user.website}>
                {user.website}
              </td>
              <td className="px-4 py-3 text-zinc-600 tabular-nums dark:text-zinc-400">
                {user.postCount}
              </td>
              <td className="px-4 py-3 text-zinc-600 tabular-nums dark:text-zinc-400">
                {user.completedTodos}
              </td>
              <td className="px-4 py-3 text-zinc-600 tabular-nums dark:text-zinc-400">
                {user.pendingTodos}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
