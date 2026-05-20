import { mockPosts, mockTodos, mockUsers } from "@/test/fixtures";

export function createJsonResponse<T>(data: T, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  } as Response);
}

function resolveRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof URL) {
    return input.href;
  }
  return input.url;
}

export function installJsonPlaceholderFetchMock() {
  return jest.spyOn(global, "fetch").mockImplementation((input) => {
    const url = resolveRequestUrl(input);

    if (url.endsWith("/users/999") || url.match(/\/users\/999(\?|$)/)) {
      return createJsonResponse({}, 200);
    }

    if (url.match(/\/users\/\d+$/)) {
      const id = Number(url.split("/users/")[1]);
      const user = mockUsers.find((item) => item.id === id);
      return user ? createJsonResponse(user) : createJsonResponse({}, 200);
    }

    if (url.includes("/posts?userId=")) {
      const userId = Number(new URL(url).searchParams.get("userId"));
      return createJsonResponse(
        mockPosts.filter((post) => post.userId === userId),
      );
    }

    if (url.endsWith("/posts")) {
      return createJsonResponse(mockPosts);
    }

    if (url.includes("/todos?userId=")) {
      const userId = Number(new URL(url).searchParams.get("userId"));
      return createJsonResponse(
        mockTodos.filter((todo) => todo.userId === userId),
      );
    }

    if (url.endsWith("/todos")) {
      return createJsonResponse(mockTodos);
    }

    if (url.endsWith("/users")) {
      return createJsonResponse(mockUsers);
    }

    return createJsonResponse({ message: "Not found" }, 404);
  });
}
