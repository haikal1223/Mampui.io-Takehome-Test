"use client";

import Link from "next/link";

import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserDetailSkeleton } from "@/components/users/UserDetailSkeleton";
import { useUser } from "@/hooks/useUser";
import { UserNotFoundError } from "@/lib/api/jsonplaceholder";

type UserDetailViewProps = {
  userId: number;
  backHref: string;
};

export function UserDetailView({ userId, backHref }: UserDetailViewProps) {
  const { data: user, isPending, isError, error, refetch } = useUser(userId);

  if (isPending) {
    return <UserDetailSkeleton />;
  }

  if (isError) {
    const isNotFound = error instanceof UserNotFoundError;

    return (
      <div
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30"
      >
        <h2 className="font-semibold text-red-800 dark:text-red-200">
          {isNotFound ? "User not found" : "Failed to load user"}
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error instanceof Error
            ? error.message
            : "Something went wrong."}
        </p>
        {!isNotFound ? (
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
          >
            Try again
          </button>
        ) : null}
        <Link
          href={backHref}
          className="mt-4 inline-block text-sm font-medium text-red-800 underline underline-offset-2 hover:text-red-900 dark:text-red-200 dark:hover:text-red-100"
        >
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={backHref}
        className="inline-flex w-fit items-center text-sm font-medium text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-50"
      >
        ← Back to list
      </Link>
      <UserDetailCard user={user} />
    </div>
  );
}
