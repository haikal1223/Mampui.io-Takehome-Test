import { makeQueryClient } from "@/lib/api/query-client";

describe("makeQueryClient", () => {
  it("uses a 60 second staleTime for queries", () => {
    const client = makeQueryClient();
    expect(client.getDefaultOptions().queries?.staleTime).toBe(60_000);
  });
});
