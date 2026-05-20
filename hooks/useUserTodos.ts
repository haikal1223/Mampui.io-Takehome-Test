"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchTodosByUser } from "@/lib/api/jsonplaceholder";
import { queryKeys } from "@/lib/api/query-keys";

export function useUserTodos(userId: number) {
  return useQuery({
    queryKey: queryKeys.todos.byUser(userId),
    queryFn: () => fetchTodosByUser(userId),
  });
}
