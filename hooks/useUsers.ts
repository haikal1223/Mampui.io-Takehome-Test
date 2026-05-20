"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/lib/api/jsonplaceholder";
import { queryKeys } from "@/lib/api/query-keys";

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: fetchUsers,
  });
}
