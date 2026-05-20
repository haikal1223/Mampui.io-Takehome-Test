import {
  buildReturnTo,
  buildUsersListQueryString,
} from "@/lib/users/url-state";

describe("url-state", () => {
  it("buildUsersListQueryString includes a single leading question mark", () => {
    expect(
      buildUsersListQueryString({ q: "chelsey", sort: "name", order: "asc" }),
    ).toBe("?q=chelsey");
  });

  it("buildReturnTo does not produce a double question mark", () => {
    expect(
      buildReturnTo("/users", {
        q: "chelsey",
        sort: "name",
        order: "asc",
      }),
    ).toBe("/users?q=chelsey");
  });
});
