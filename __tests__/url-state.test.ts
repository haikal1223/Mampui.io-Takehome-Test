import {
  buildReturnTo,
  buildUsersListQueryString,
} from "@/lib/users/url-state";

describe("url-state", () => {
  it("buildUsersListQueryString includes a single leading question mark", () => {
    expect(
      buildUsersListQueryString({
        q: "chelsey",
        sort: "name",
        order: "asc",
        filter: "all",
        page: 1,
      }),
    ).toBe("?q=chelsey");
  });

  it("buildReturnTo does not produce a double question mark", () => {
    expect(
      buildReturnTo("/users", {
        q: "chelsey",
        sort: "name",
        order: "asc",
        filter: "pending",
        page: 2,
      }),
    ).toBe("/users?q=chelsey&filter=pending&page=2");
  });
});
