export const queryKeys = {
  users: {
    all: ["users"] as const,
    detail: (id: number) => ["users", id] as const,
  },
  posts: {
    all: ["posts"] as const,
    byUser: (userId: number) => ["posts", userId] as const,
  },
  todos: {
    all: ["todos"] as const,
    byUser: (userId: number) => ["todos", userId] as const,
  },
};
