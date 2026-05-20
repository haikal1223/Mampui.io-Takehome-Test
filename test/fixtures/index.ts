import type { Post, Todo, User } from "@/lib/api/types";
import type { UserWithActivity } from "@/lib/users/activity";

const baseAddress = {
  street: "Main St",
  suite: "Apt 1",
  city: "Gwenborough",
  zipcode: "92998",
  geo: { lat: "0", lng: "0" },
};

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne@example.com",
    phone: "1-770-736-8031",
    website: "leanne.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
    address: baseAddress,
  },
  {
    id: 2,
    name: "Aaron Dill",
    username: "aaron",
    email: "aaron@example.com",
    phone: "555-0100",
    website: "aaron.dev",
    company: {
      name: "Acme Corp",
      catchPhrase: "Quality first",
      bs: "synergize",
    },
    address: baseAddress,
  },
  {
    id: 3,
    name: "Chelsey Dietrich",
    username: "chelsey",
    email: "chelsey@example.com",
    phone: "555-0101",
    website: "chelsey.io",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric",
      bs: "evolve",
    },
    address: baseAddress,
  },
];

export const mockPosts: Post[] = [
  { id: 1, userId: 1, title: "Post A", body: "Body A content here." },
  { id: 2, userId: 1, title: "Post B", body: "Body B content here." },
  { id: 3, userId: 2, title: "Post C", body: "Body C content here." },
];

export const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Todo open 1", completed: false },
  { id: 2, userId: 1, title: "Todo open 2", completed: false },
  { id: 3, userId: 1, title: "Todo done", completed: true },
  { id: 4, userId: 2, title: "Aaron done", completed: true },
  { id: 5, userId: 3, title: "Chelsey open", completed: false },
];

export const mockUsersWithActivity: UserWithActivity[] = [
  {
    ...mockUsers[0],
    postCount: 2,
    completedTodos: 1,
    pendingTodos: 2,
  },
  {
    ...mockUsers[1],
    postCount: 1,
    completedTodos: 1,
    pendingTodos: 0,
  },
  {
    ...mockUsers[2],
    postCount: 0,
    completedTodos: 0,
    pendingTodos: 1,
  },
];
