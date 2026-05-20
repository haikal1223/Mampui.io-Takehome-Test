"use client";

import { useState } from "react";

import { useUserPosts } from "@/hooks/useUserPosts";

const INITIAL_VISIBLE = 5;

type UserPostsSectionProps = {
  userId: number;
};

export function UserPostsSection({ userId }: UserPostsSectionProps) {
  const { data: posts, isPending, isError, error, refetch } =
    useUserPosts(userId);
  const [showAll, setShowAll] = useState(false);

  if (isPending) {
    return (
      <section className="space-y-3" aria-busy="true" aria-label="Loading posts">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-16 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
        <h2 className="font-semibold text-red-800 dark:text-red-200">Posts</h2>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          {error instanceof Error ? error.message : "Failed to load posts."}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium text-red-800 underline dark:text-red-200"
        >
          Try again
        </button>
      </section>
    );
  }

  if (!posts?.length) {
    return (
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Posts
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          No posts for this user.
        </p>
      </section>
    );
  }

  const visible = showAll ? posts : posts.slice(0, INITIAL_VISIBLE);

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Posts ({posts.length})
      </h2>
      <ul className="mt-3 space-y-3">
        {visible.map((post) => (
          <li
            key={post.id}
            className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30"
          >
            <h3 className="font-medium text-zinc-900 line-clamp-2 dark:text-zinc-50">
              {post.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 line-clamp-3 dark:text-zinc-400">
              {post.body}
            </p>
          </li>
        ))}
      </ul>
      {posts.length > INITIAL_VISIBLE ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-3 text-sm font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          {showAll ? "Show less" : `Show all ${posts.length} posts`}
        </button>
      ) : null}
    </section>
  );
}
