"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { parseReturnTo } from "@/lib/users/parse-user-id";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function UserDetailErrorContent({ error, reset }: ErrorProps) {
  const searchParams = useSearchParams();
  const backHref = parseReturnTo(searchParams.get("returnTo") ?? undefined);

  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30"
    >
      <h2 className="font-semibold text-red-800 dark:text-red-200">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-red-700 dark:text-red-300">
        {error.message || "Unable to load this user."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
        >
          Try again
        </button>
        <Link
          href={backHref}
          className="inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100 dark:border-red-800 dark:text-red-200 dark:hover:bg-red-900/40"
        >
          Back to list
        </Link>
      </div>
    </div>
  );
}

export default function UserDetailError(props: ErrorProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
      <Suspense fallback={null}>
        <UserDetailErrorContent {...props} />
      </Suspense>
    </div>
  );
}
