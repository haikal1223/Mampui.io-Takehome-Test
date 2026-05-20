import type { User } from "./types";

export const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}/users`);

  if (!response.ok) {
    throw new Error(`Failed to fetch users (${response.status})`);
  }

  return response.json() as Promise<User[]>;
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`${API_BASE}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user (${response.status})`);
  }

  const data = (await response.json()) as User;

  if (!data?.id) {
    throw new Error("User not found");
  }

  return data;
}
