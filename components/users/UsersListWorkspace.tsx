"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { UserCardList } from "@/components/users/UserCardList";
import { UsersPagination } from "@/components/users/UsersPagination";
import { UsersTable } from "@/components/users/UsersTable";
import { useUsersWithActivity } from "@/hooks/useUsersWithActivity";
import { applyUsersListFilters } from "@/lib/users/filter-sort";
import { paginate } from "@/lib/users/pagination";
import {
  buildReturnTo,
  parseUsersListParams,
  type ActivityFilter,
  type SortField,
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
    useUsersWithActivity();

  const listParams = useMemo(
    () => parseUsersListParams(searchParams),
    [searchParams],
  );

  const returnTo = buildReturnTo(pathname, listParams);

  const updateParams = useCallback(
    (patch: Partial<UsersListSearchParams>) => {
      const shouldResetPage =
        patch.page === undefined && Object.keys(patch).length > 0;
      const next: UsersListSearchParams = {
        ...listParams,
        ...patch,
        page: patch.page ?? (shouldResetPage ? 1 : listParams.page),
      };
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

  const pagination = useMemo(
    () => paginate(filteredUsers, listParams.page),
    [filteredUsers, listParams.page],
  );

  const hasActiveFilters =
    listParams.q.trim() !== "" ||
    listParams.filter !== "all" ||
    listParams.sort !== "name" ||
    listParams.order !== "asc";

  const handleSortFieldChange = (sort: SortField) => {
    updateParams({
      sort,
      order: sort === "pending" ? "desc" : listParams.order,
      page: 1,
    });
  };

  const toggleSortOrder = () => {
    const nextOrder: SortOrder = listParams.order === "asc" ? "desc" : "asc";
    updateParams({ order: nextOrder, page: 1 });
  };

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
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
          className="mt-4 rounded-md bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <UserSearchForm
          key={listParams.q}
          query={listParams.q}
          onSearch={(q) => updateParams({ q, page: 1 })}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Filter
            </span>
            <select
              value={listParams.filter}
              onChange={(event) =>
                updateParams({
                  filter: event.target.value as ActivityFilter,
                  page: 1,
                })
              }
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            >
              <option value="all">All users</option>
              <option value="pending">Has pending todos</option>
              <option value="no-completed">No completed todos</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              Sort by
            </span>
            <select
              value={listParams.sort}
              onChange={(event) =>
                handleSortFieldChange(event.target.value as SortField)
              }
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            >
              <option value="name">Name</option>
              <option value="pending">Most pending todos</option>
            </select>
          </label>

          <button
            type="button"
            onClick={toggleSortOrder}
            className="self-end rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900 sm:mb-0 sm:mt-6"
          >
            {listParams.sort === "pending"
              ? listParams.order === "desc"
                ? "Pending: high → low"
                : "Pending: low → high"
              : listParams.order === "asc"
                ? "Name: A→Z"
                : "Name: Z→A"}
          </button>
        </div>
      </div>

      {isFetching && !isPending ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
          Refreshing…
        </p>
      ) : null}

      {filteredUsers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400">
            No users match your filters.
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-50"
            >
              Clear all filters
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <UsersTable users={pagination.items} returnTo={returnTo} />
          <UserCardList users={pagination.items} returnTo={returnTo} />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {pagination.items.length} of {pagination.totalItems} matching
            users ({users?.length ?? 0} total)
          </p>
          <UsersPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </>
      )}
    </div>
  );
}
