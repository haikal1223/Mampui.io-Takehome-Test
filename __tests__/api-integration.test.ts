import {
  fetchPosts,
  fetchTodos,
  fetchUsers,
} from "@/lib/api/jsonplaceholder";
import { enrichUsersWithActivity } from "@/lib/users/activity";
import { installJsonPlaceholderFetchMock } from "@/test/helpers/mock-fetch";

describe("JSONPlaceholder API (mocked fetch)", () => {
  it("fetches users, posts, and todos", async () => {
    const fetchMock = installJsonPlaceholderFetchMock();

    const [users, posts, todos] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
      fetchTodos(),
    ]);

    expect(users).toHaveLength(3);
    expect(posts.length).toBeGreaterThan(0);
    expect(todos.length).toBeGreaterThan(0);

    const enriched = enrichUsersWithActivity(users, posts, todos);
    expect(enriched[0].postCount).toBe(2);
    expect(enriched[0].pendingTodos).toBe(2);

    fetchMock.mockRestore();
  });

  it("throws when users request fails", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ message: "error" }),
    } as Response);

    await expect(fetchUsers()).rejects.toThrow(/Failed to fetch users/);

    fetchMock.mockRestore();
  });
});
