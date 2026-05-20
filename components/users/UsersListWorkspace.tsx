"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { UserCardList } from "@/components/users/UserCardList";
import { UsersTable } from "@/components/users/UsersTable";
import { useUsers } from "@/hooks/useUsers";
import { applyUsersListFilters } from "@/lib/users/filter-sort";
import {
  buildReturnTo,
  parseUsersListParams,
  type SortOrder,
  type UsersListSearchParams,
} from "@/lib/users/url-state";

type UserSearchFormProps = {
  query: string;
  onSearch: (query: string) => void;
};

function UserSearchForm({ query, onSearch }: UserSearchFormProps) {
  const [searchInput, setSearchInput] = useState(query);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(searchInput);
      }}
      className="flex flex-1 gap-2"
    >
      <label htmlFor="user-search" className="sr-only">
        Search users by name or email
      </label>
      <input
        id="user-search"
        type="search"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search by name or email…"
        className="w-full max-w-md rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus-visible:outline-zinc-50"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:outline-zinc-100"
      >
        Search
      </button>
    </form>
  );
}

export function UsersListSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading users">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
        />
      ))}
    </div>
  );
}

export function UsersListWorkspace() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: users, isPending, isError, error, refetch, isFetching } =
    useUsers();

  const listParams = useMemo(
    () => parseUsersListParams(searchParams),
    [searchParams],
  );

  const returnTo = buildReturnTo(pathname, listParams);

  const updateParams = useCallback(
    (patch: Partial<UsersListSearchParams>) => {
      const next: UsersListSearchParams = { ...listParams, ...patch };
      router.replace(buildReturnTo(pathname, next), { scroll: false });
    },
    [listParams, pathname, router],
  );

  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }
    return applyUsersListFilters(users, listParams);
  }, [users, listParams]);

  const toggleSortOrder = () => {
    const nextOrder: SortOrder = listParams.order === "asc" ? "desc" : "asc";
    updateParams({ order: nextOrder });
  };

  if (isPending) {
    return <UsersListSkeleton />;
  }

  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30"
      >
        <h2 className="font-semibold text-red-800 dark:text-red-200">
          Failed to load users
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-md bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <UserSearchForm
          key={listParams.q}
          query={listParams.q}
          onSearch={(q) => updateParams({ q })}
        />

        <button
          type="button"
          onClick={toggleSortOrder}
          className="shrink-0 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-50"
          aria-label={`Sort by name ${listParams.order === "asc" ? "descending" : "ascending"}`}
        >
          Sort by name ({listParams.order === "asc" ? "A→Z" : "Z→A"})
        </button>
      </div>

      {isFetching && !isPending ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
          Refreshing…
        </p>
      ) : null}

      {filteredUsers.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          No users match your search.
        </p>
      ) : (
        <>
          <UsersTable users={filteredUsers} returnTo={returnTo} />
          <UserCardList users={filteredUsers} returnTo={returnTo} />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {filteredUsers.length} of {users?.length ?? 0} users
          </p>
        </>
      )}
    </div>
  );
}
