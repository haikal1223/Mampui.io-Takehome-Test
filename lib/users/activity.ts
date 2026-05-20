import type { Post, Todo, User } from "@/lib/api/types";

export type UserWithActivity = User & {
  postCount: number;
  completedTodos: number;
  pendingTodos: number;
};

export function enrichUsersWithActivity(
  users: User[],
  posts: Post[],
  todos: Todo[],
): UserWithActivity[] {
  const postCountByUser = new Map<number, number>();
  const completedByUser = new Map<number, number>();
  const pendingByUser = new Map<number, number>();

  for (const post of posts) {
    postCountByUser.set(post.userId, (postCountByUser.get(post.userId) ?? 0) + 1);
  }

  for (const todo of todos) {
    if (todo.completed) {
      completedByUser.set(
        todo.userId,
        (completedByUser.get(todo.userId) ?? 0) + 1,
      );
    } else {
      pendingByUser.set(todo.userId, (pendingByUser.get(todo.userId) ?? 0) + 1);
    }
  }

  return users.map((user) => ({
    ...user,
    postCount: postCountByUser.get(user.id) ?? 0,
    completedTodos: completedByUser.get(user.id) ?? 0,
    pendingTodos: pendingByUser.get(user.id) ?? 0,
  }));
}
