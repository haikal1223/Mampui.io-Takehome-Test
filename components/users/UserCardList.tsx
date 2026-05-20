import Link from "next/link";

import type { User } from "@/lib/api/types";

type UserCardListProps = {
  users: User[];
  returnTo: string;
};

export function UserCardList({ users, returnTo }: UserCardListProps) {
  return (
    <ul className="flex flex-col gap-3 md:hidden">
      {users.map((user) => (
        <li key={user.id}>
          <Link
            href={`/users/${user.id}?returnTo=${encodeURIComponent(returnTo)}`}
            className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50 dark:focus-visible:outline-zinc-50"
          >
            <p className="font-medium text-zinc-900 dark:text-zinc-50">{user.name}</p>
            <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </p>
            <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-500">
              {user.website}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
