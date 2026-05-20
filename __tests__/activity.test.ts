import type { User } from "@/lib/api/types";
import { enrichUsersWithActivity } from "@/lib/users/activity";

const user: User = {
  id: 1,
  name: "Test",
  username: "test",
  email: "test@example.com",
  phone: "1",
  website: "test.dev",
  company: { name: "Co", catchPhrase: "", bs: "" },
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: { lat: "0", lng: "0" },
  },
};

describe("enrichUsersWithActivity", () => {
  it("aggregates post and todo counts per user", () => {
    const [enriched] = enrichUsersWithActivity(
      [user],
      [{ id: 1, userId: 1, title: "Post", body: "" }],
      [
        { id: 1, userId: 1, title: "Done", completed: true },
        { id: 2, userId: 1, title: "Open", completed: false },
      ],
    );

    expect(enriched.postCount).toBe(1);
    expect(enriched.completedTodos).toBe(1);
    expect(enriched.pendingTodos).toBe(1);
  });
});
