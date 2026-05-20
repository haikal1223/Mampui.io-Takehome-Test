"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  fetchPosts,
  fetchTodos,
  fetchUsers,
} from "@/lib/api/jsonplaceholder";
import { queryKeys } from "@/lib/api/query-keys";
import { enrichUsersWithActivity } from "@/lib/users/activity";

export function useUsersWithActivity() {
  const [usersQuery, postsQuery, todosQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.users.all,
        queryFn: fetchUsers,
      },
      {
        queryKey: queryKeys.posts.all,
        queryFn: fetchPosts,
      },
      {
        queryKey: queryKeys.todos.all,
        queryFn: fetchTodos,
      },
    ],
  });

  const data = useMemo(() => {
    if (!usersQuery.data || !postsQuery.data || !todosQuery.data) {
      return undefined;
    }
    return enrichUsersWithActivity(
      usersQuery.data,
      postsQuery.data,
      todosQuery.data,
    );
  }, [usersQuery.data, postsQuery.data, todosQuery.data]);

  const isPending =
    usersQuery.isPending || postsQuery.isPending || todosQuery.isPending;
  const isError =
    usersQuery.isError || postsQuery.isError || todosQuery.isError;
  const error = usersQuery.error ?? postsQuery.error ?? todosQuery.error;
  const isFetching =
    usersQuery.isFetching || postsQuery.isFetching || todosQuery.isFetching;

  const refetch = () =>
    Promise.all([
      usersQuery.refetch(),
      postsQuery.refetch(),
      todosQuery.refetch(),
    ]);

  return {
    data,
    isPending,
    isError,
    error,
    isFetching,
    refetch,
  };
}
