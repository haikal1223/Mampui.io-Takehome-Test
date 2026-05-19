import { QueryClient } from "@tanstack/react-query";

/** Client-side cache aligned with the ISR 60s bonus (staleTime). */
const STALE_TIME_MS = 60_000;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        gcTime: 5 * STALE_TIME_MS,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
