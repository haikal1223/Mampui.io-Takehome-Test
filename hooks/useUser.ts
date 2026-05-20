"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUser } from "@/lib/api/jsonplaceholder";
import { queryKeys } from "@/lib/api/query-keys";

export function useUser(userId: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => fetchUser(userId),
  });
}
