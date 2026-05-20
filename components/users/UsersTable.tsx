import Link from "next/link";

import type { User } from "@/lib/api/types";

type UsersTableProps = {
  users: User[];
  returnTo: string;
};

export function UsersTable({ users, returnTo }: UsersTableProps) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
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
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900/50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`}
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-50 dark:focus-visible:outline-zinc-50"
                >
                  {user.name}
                </Link>
              </td>
              <td className="max-w-[200px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400" title={user.email}>
                {user.email}
              </td>
              <td className="max-w-[160px] truncate px-4 py-3 text-zinc-600 dark:text-zinc-400" title={user.website}>
                {user.website}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
