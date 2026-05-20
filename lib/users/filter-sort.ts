import type { User } from "@/lib/api/types";

import type { SortOrder, UsersListSearchParams } from "./url-state";

export function filterUsersBySearch(users: User[], query: string): User[] {
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

export function sortUsers(users: User[], order: SortOrder): User[] {
  return [...users].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
    });
    return order === "asc" ? comparison : -comparison;
  });
}

export function applyUsersListFilters(
  users: User[],
  params: UsersListSearchParams,
): User[] {
  return sortUsers(filterUsersBySearch(users, params.q), params.order);
}
