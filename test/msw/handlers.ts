import { http, HttpResponse } from "msw";

const API_BASE = "https://jsonplaceholder.typicode.com";

/** Placeholder handlers — extended in Task 6 tests. */
export const handlers = [
  http.get(`${API_BASE}/users`, () => {
    return HttpResponse.json([]);
  }),
];
