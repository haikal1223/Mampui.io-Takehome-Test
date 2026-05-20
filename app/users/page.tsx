import { Suspense } from "react";

import {
  UsersListSkeleton,
  UsersListWorkspace,
} from "@/components/users/UsersListWorkspace";

export default function UsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-6 py-12">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Users
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Browse users from JSONPlaceholder. Search, sort, and open a profile.
        </p>
      </header>

      <Suspense fallback={<UsersListSkeleton />}>
        <UsersListWorkspace />
      </Suspense>
    </div>
  );
}
