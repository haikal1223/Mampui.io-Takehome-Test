"use client";

import Link from "next/link";

import { UserDetailCard } from "@/components/users/UserDetailCard";
import { UserPostsSection } from "@/components/users/UserPostsSection";
import { UserDetailSkeleton } from "@/components/users/UserDetailSkeleton";
import { UserTodosSection } from "@/components/users/UserTodosSection";
import { useUser } from "@/hooks/useUser";
import { UserNotFoundError } from "@/lib/api/jsonplaceholder";
import { buttonSecondaryClassName } from "@/lib/styles";

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
        className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm dark:border-red-900 dark:bg-red-950/30"
      >
        <h2 className="font-semibold text-red-800 dark:text-red-200">
          {isNotFound ? "User not found" : "Failed to load user"}
        </h2>
        <p className="mt-2 text-sm text-red-700 dark:text-red-300">
          {error instanceof Error
            ? error.message
            : "Something went wrong."}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {!isNotFound ? (
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Try again
            </button>
          ) : null}
          <Link href={backHref} className={buttonSecondaryClassName}>
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <Link href={backHref} className={`w-fit ${buttonSecondaryClassName}`}>
        ← Back to list
      </Link>
      <UserDetailCard user={user} />
      <div
        className="grid gap-8 border-t border-zinc-200 pt-8 dark:border-zinc-800"
        aria-label="User activity"
      >
        <UserPostsSection userId={userId} />
        <UserTodosSection userId={userId} />
      </div>
    </div>
  );
}
