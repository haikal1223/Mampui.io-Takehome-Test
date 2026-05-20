import type { User } from "@/lib/api/types";
import {
  applyUsersListFilters,
  filterUsersBySearch,
  sortUsers,
} from "@/lib/users/filter-sort";

const users: User[] = [
  {
    id: 1,
    name: "Zara",
    username: "zara",
    email: "zara@example.com",
    phone: "1",
    website: "zara.dev",
    company: { name: "A", catchPhrase: "", bs: "" },
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "0", lng: "0" },
    },
  },
  {
    id: 2,
    name: "Aaron",
    username: "aaron",
    email: "aaron@test.com",
    phone: "2",
    website: "aaron.dev",
    company: { name: "B", catchPhrase: "", bs: "" },
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "0", lng: "0" },
    },
  },
];

describe("filter-sort", () => {
  it("filters by name or email", () => {
    expect(filterUsersBySearch(users, "aaron")).toHaveLength(1);
    expect(filterUsersBySearch(users, "example")).toHaveLength(1);
  });

  it("sorts users by name", () => {
    expect(sortUsers(users, "asc").map((u) => u.name)).toEqual(["Aaron", "Zara"]);
    expect(sortUsers(users, "desc").map((u) => u.name)).toEqual([
      "Zara",
      "Aaron",
    ]);
  });

  it("applies search then sort", () => {
    const result = applyUsersListFilters(users, {
      q: "",
      sort: "name",
      order: "asc",
    });
    expect(result.map((u) => u.name)).toEqual(["Aaron", "Zara"]);
  });
});
