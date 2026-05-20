import type { SortOrder, ActivityFilter, UsersListSearchParams } from "./url-state";
import type { UserWithActivity } from "./activity";

export function filterUsersBySearch(
  users: UserWithActivity[],
  query: string,
): UserWithActivity[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return users;
  }

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(normalized) ||
      user.email.toLowerCase().includes(normalized),
  );
}

export function filterUsersByActivity(
  users: UserWithActivity[],
  filter: ActivityFilter,
): UserWithActivity[] {
  switch (filter) {
    case "pending":
      return users.filter((user) => user.pendingTodos > 0);
    case "no-completed":
      return users.filter((user) => user.completedTodos === 0);
    default:
      return users;
  }
}

export function sortUsers(
  users: UserWithActivity[],
  sort: UsersListSearchParams["sort"],
  order: SortOrder,
): UserWithActivity[] {
  return [...users].sort((a, b) => {
    let comparison = 0;

    if (sort === "pending") {
      comparison = a.pendingTodos - b.pendingTodos;
      if (comparison === 0) {
        comparison = a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      }
    } else {
      comparison = a.name.localeCompare(b.name, undefined, {
        sensitivity: "base",
      });
    }

    return order === "asc" ? comparison : -comparison;
  });
}

export function applyUsersListFilters(
  users: UserWithActivity[],
  params: UsersListSearchParams,
): UserWithActivity[] {
  const searched = filterUsersBySearch(users, params.q);
  const filtered = filterUsersByActivity(searched, params.filter);
  return sortUsers(filtered, params.sort, params.order);
}
