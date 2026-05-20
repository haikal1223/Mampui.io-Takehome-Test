"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchPostsByUser } from "@/lib/api/jsonplaceholder";
import { queryKeys } from "@/lib/api/query-keys";

export function useUserPosts(userId: number) {
  return useQuery({
    queryKey: queryKeys.posts.byUser(userId),
    queryFn: () => fetchPostsByUser(userId),
  });
}
