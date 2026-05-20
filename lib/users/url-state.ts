export type SortField = "name" | "pending";
export type SortOrder = "asc" | "desc";
export type ActivityFilter = "all" | "pending" | "no-completed";

export type UsersListSearchParams = {
  q: string;
  sort: SortField;
  order: SortOrder;
  filter: ActivityFilter;
  page: number;
};

const DEFAULTS: UsersListSearchParams = {
  q: "",
  sort: "name",
  order: "asc",
  filter: "all",
  page: 1,
};

export function parseUsersListParams(
  params: URLSearchParams,
): UsersListSearchParams {
  const order = params.get("order");
  const sort = params.get("sort");
  const filter = params.get("filter");
  const page = Number(params.get("page") ?? "1");

  return {
    q: params.get("q") ?? DEFAULTS.q,
    sort: sort === "pending" ? "pending" : "name",
    order: order === "desc" ? "desc" : "asc",
    filter:
      filter === "pending" || filter === "no-completed" ? filter : "all",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export function buildUsersListQueryString(
  params: UsersListSearchParams,
): string {
  const search = new URLSearchParams();
  if (params.q.trim()) {
    search.set("q", params.q.trim());
  }
  if (params.sort !== DEFAULTS.sort) {
    search.set("sort", params.sort);
  }
  if (params.order !== DEFAULTS.order) {
    search.set("order", params.order);
  }
  if (params.filter !== DEFAULTS.filter) {
    search.set("filter", params.filter);
  }
  if (params.page !== DEFAULTS.page) {
    search.set("page", String(params.page));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function buildReturnTo(pathname: string, params: UsersListSearchParams) {
  return `${pathname}${buildUsersListQueryString(params)}`;
}

export const DEFAULT_USERS_LIST_PARAMS = DEFAULTS;
