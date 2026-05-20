"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import { UserCardList } from "@/components/users/UserCardList";
import { UserCardsSkeleton } from "@/components/users/UserCardsSkeleton";
import { UsersPagination } from "@/components/users/UsersPagination";
import { UsersTable } from "@/components/users/UsersTable";
import { UsersTableSkeleton } from "@/components/users/UsersTableSkeleton";
import { useUsersWithActivity } from "@/hooks/useUsersWithActivity";
import { applyUsersListFilters } from "@/lib/users/filter-sort";
import { paginate } from "@/lib/users/pagination";
import {
  buttonPrimaryClassName,
  buttonSecondaryClassName,
  inputClassName,
} from "@/lib/styles";
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
      className="flex flex-col gap-2 sm:flex-row sm:items-center"
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
        className={`w-full sm:max-w-md ${inputClassName}`}
      />
      <button type="submit" className={`shrink-0 ${buttonPrimaryClassName}`}>
        Search
      </button>
    </form>
  );
}

export function UsersListSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading users">
      <UsersTableSkeleton />
      <UserCardsSkeleton />
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
    listParams.order !== "asc" ||
    listParams.page !== 1;

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
        className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-900 dark:bg-red-950/30"
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
          className="mt-4 rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <section
        className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5 dark:border-zinc-800 dark:bg-zinc-950"
        aria-label="Search and filters"
      >
        <div className="flex flex-col gap-4">
          <UserSearchForm
            key={listParams.q}
            query={listParams.q}
            onSearch={(q) => updateParams({ q, page: 1 })}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm">
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
                className={inputClassName}
              >
                <option value="all">All users</option>
                <option value="pending">Has pending todos</option>
                <option value="no-completed">No completed todos</option>
              </select>
            </label>

            <label className="flex min-w-[160px] flex-1 flex-col gap-1.5 text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                Sort by
              </span>
              <select
                value={listParams.sort}
                onChange={(event) =>
                  handleSortFieldChange(event.target.value as SortField)
                }
                className={inputClassName}
              >
                <option value="name">Name</option>
                <option value="pending">Most pending todos</option>
              </select>
            </label>

            <button
              type="button"
              onClick={toggleSortOrder}
              className={`w-full sm:w-auto ${buttonSecondaryClassName}`}
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
      </section>

      {isFetching && !isPending ? (
        <p
          className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
          aria-live="polite"
        >
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-300" />
          Refreshing data…
        </p>
      ) : null}

      {filteredUsers.length === 0 ? (
        <EmptyState
          title="No users match your filters"
          description="Try adjusting your search or filter criteria to see more results."
          action={
            hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className={buttonSecondaryClassName}
              >
                Clear all filters
              </button>
            ) : undefined
          }
        />
      ) : (
        <section aria-label="Users results" className="flex flex-col gap-4">
          <UsersTable users={pagination.items} returnTo={returnTo} />
          <UserCardList users={pagination.items} returnTo={returnTo} />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Showing {pagination.items.length} of {pagination.totalItems}{" "}
            matching users ({users?.length ?? 0} total)
          </p>
          <UsersPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={(page) => updateParams({ page })}
          />
        </section>
      )}
    </div>
  );
}
