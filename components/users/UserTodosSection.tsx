"use client";

import { useState } from "react";

import { useUserTodos } from "@/hooks/useUserTodos";

const INITIAL_VISIBLE = 5;

type UserTodosSectionProps = {
  userId: number;
};

export function UserTodosSection({ userId }: UserTodosSectionProps) {
  const { data: todos, isPending, isError, error, refetch } =
    useUserTodos(userId);
  const [showAll, setShowAll] = useState(false);

  if (isPending) {
    return (
      <section className="space-y-3" aria-busy="true" aria-label="Loading todos">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
        <h2 className="font-semibold text-red-800 dark:text-red-200">Todos</h2>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          {error instanceof Error ? error.message : "Failed to load todos."}
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

  if (!todos?.length) {
    return (
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Todos
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          No todos for this user.
        </p>
      </section>
    );
  }

  const visible = showAll ? todos : todos.slice(0, INITIAL_VISIBLE);
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Todos ({completed}/{todos.length} completed)
      </h2>
      <ul className="mt-3 space-y-2">
        {visible.map((todo) => (
          <li
            key={todo.id}
            className="flex items-start gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
          >
            <span
              className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-medium ${
                todo.completed
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200"
                  : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
              }`}
            >
              {todo.completed ? "Done" : "Pending"}
            </span>
            <span className="text-zinc-800 line-clamp-2 dark:text-zinc-200">
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
      {todos.length > INITIAL_VISIBLE ? (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-3 text-sm font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          {showAll ? "Show less" : `Show all ${todos.length} todos`}
        </button>
      ) : null}
    </section>
  );
}
