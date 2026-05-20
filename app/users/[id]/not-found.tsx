import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-6 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        User not found
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The user you are looking for does not exist or the link is invalid.
      </p>
      <Link
        href="/users"
        className="inline-flex w-fit text-sm font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300"
      >
        ← Back to list
      </Link>
    </div>
  );
}
