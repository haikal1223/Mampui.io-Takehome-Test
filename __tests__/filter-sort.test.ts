import type { User } from "@/lib/api/types";
import { enrichUsersWithActivity } from "@/lib/users/activity";
import {
  applyUsersListFilters,
  filterUsersByActivity,
  filterUsersBySearch,
  sortUsers,
} from "@/lib/users/filter-sort";

const baseUser = (id: number, name: string): User => ({
  id,
  name,
  username: name.toLowerCase(),
  email: `${name.toLowerCase()}@example.com`,
  phone: "1",
  website: "example.com",
  company: { name: "Co", catchPhrase: "", bs: "" },
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: { lat: "0", lng: "0" },
  },
});

const users = enrichUsersWithActivity(
  [baseUser(1, "Zara"), baseUser(2, "Aaron")],
  [
    { id: 1, userId: 1, title: "P1", body: "" },
    { id: 2, userId: 1, title: "P2", body: "" },
    { id: 3, userId: 2, title: "P3", body: "" },
  ],
  [
    { id: 1, userId: 1, title: "T1", completed: false },
    { id: 2, userId: 1, title: "T2", completed: false },
    { id: 3, userId: 2, title: "T3", completed: true },
  ],
);

describe("filter-sort", () => {
  it("filters by name or email", () => {
    expect(filterUsersBySearch(users, "aaron")).toHaveLength(1);
    expect(filterUsersBySearch(users, "example")).toHaveLength(2);
  });

  it("filters by activity", () => {
    expect(filterUsersByActivity(users, "pending")).toHaveLength(1);
    expect(filterUsersByActivity(users, "no-completed")).toHaveLength(1);
  });

  it("sorts users by name", () => {
    expect(sortUsers(users, "name", "asc").map((u) => u.name)).toEqual([
      "Aaron",
      "Zara",
    ]);
    expect(sortUsers(users, "name", "desc").map((u) => u.name)).toEqual([
      "Zara",
      "Aaron",
    ]);
  });

  it("sorts users by pending todos", () => {
    expect(sortUsers(users, "pending", "desc").map((u) => u.name)).toEqual([
      "Zara",
      "Aaron",
    ]);
  });

  it("applies search, filter, and sort together", () => {
    const result = applyUsersListFilters(users, {
      q: "",
      sort: "pending",
      order: "desc",
      filter: "all",
      page: 1,
    });
    expect(result[0].name).toBe("Zara");
  });
});
