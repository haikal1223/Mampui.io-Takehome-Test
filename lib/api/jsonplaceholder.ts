import type { Post, Todo, User } from "./types";

export const API_BASE = "https://jsonplaceholder.typicode.com";

export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users (${response.status})`);
  }

  return response.json() as Promise<User[]>;
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE}/users/${id}`, {
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    throw new UserNotFoundError();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch user (${response.status})`);
  }

  const data = (await response.json()) as Partial<User>;

  if (!data?.id) {
    throw new UserNotFoundError();
  }

  return data as User;
}

async function fetchJson<T>(url: string, label: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${label} (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function fetchPosts() {
  return fetchJson<Post[]>(`${API_BASE}/posts`, "posts");
}

export function fetchTodos() {
  return fetchJson<Todo[]>(`${API_BASE}/todos`, "todos");
}

export function fetchPostsByUser(userId: number) {
  return fetchJson<Post[]>(
    `${API_BASE}/posts?userId=${userId}`,
    `posts for user ${userId}`,
  );
}

export function fetchTodosByUser(userId: number) {
  return fetchJson<Todo[]>(
    `${API_BASE}/todos?userId=${userId}`,
    `todos for user ${userId}`,
  );
}
