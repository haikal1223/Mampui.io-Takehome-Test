export type SortField = "name";
export type SortOrder = "asc" | "desc";

export type UsersListSearchParams = {
  q: string;
  sort: SortField;
  order: SortOrder;
};

const DEFAULTS: UsersListSearchParams = {
  q: "",
  sort: "name",
  order: "asc",
};

export function parseUsersListParams(
  params: URLSearchParams,
): UsersListSearchParams {
  const order = params.get("order");
  return {
    q: params.get("q") ?? DEFAULTS.q,
    sort: "name",
    order: order === "desc" ? "desc" : "asc",
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
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function buildReturnTo(pathname: string, params: UsersListSearchParams) {
  return `${pathname}${buildUsersListQueryString(params)}`;
}
