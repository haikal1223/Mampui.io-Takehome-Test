export const USERS_PAGE_SIZE = 10;

export function paginate<T>(items: T[], page: number, pageSize = USERS_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    totalPages,
    totalItems: items.length,
    pageSize,
  };
}
