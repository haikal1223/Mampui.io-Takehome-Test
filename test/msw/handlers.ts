import { http, HttpResponse } from "msw";

import { mockPosts, mockTodos, mockUsers } from "@/test/fixtures";

export const API_BASE = "https://jsonplaceholder.typicode.com";

export const handlers = [
  http.get(`${API_BASE}/users`, () => HttpResponse.json(mockUsers)),
  http.get(`${API_BASE}/users/:id`, ({ params }) => {
    const id = Number(params.id);
    const user = mockUsers.find((item) => item.id === id);
    if (!user) {
      return HttpResponse.json({});
    }
    return HttpResponse.json(user);
  }),
  http.get(`${API_BASE}/posts`, ({ request }) => {
    const userId = new URL(request.url).searchParams.get("userId");
    if (userId) {
      return HttpResponse.json(
        mockPosts.filter((post) => post.userId === Number(userId)),
      );
    }
    return HttpResponse.json(mockPosts);
  }),
  http.get(`${API_BASE}/todos`, ({ request }) => {
    const userId = new URL(request.url).searchParams.get("userId");
    if (userId) {
      return HttpResponse.json(
        mockTodos.filter((todo) => todo.userId === Number(userId)),
      );
    }
    return HttpResponse.json(mockTodos);
  }),
];

export const usersErrorHandler = http.get(`${API_BASE}/users`, () =>
  HttpResponse.json({ message: "Server error" }, { status: 500 }),
);

export const userNotFoundHandler = http.get(`${API_BASE}/users/:id`, () =>
  HttpResponse.json({}),
);
