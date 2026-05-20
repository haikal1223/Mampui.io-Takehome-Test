import { parseReturnTo, parseUserId } from "@/lib/users/parse-user-id";

describe("parse-user-id", () => {
  it("parses valid numeric ids", () => {
    expect(parseUserId("1")).toBe(1);
    expect(parseUserId("10")).toBe(10);
  });

  it("rejects invalid ids", () => {
    expect(parseUserId("abc")).toBeNull();
    expect(parseUserId("0")).toBeNull();
    expect(parseUserId("-1")).toBeNull();
  });

  it("parseReturnTo allows only /users paths", () => {
    expect(parseReturnTo("/users?q=test")).toBe("/users?q=test");
    expect(parseReturnTo("https://evil.com")).toBe("/users");
    expect(parseReturnTo(undefined)).toBe("/users");
  });
});
