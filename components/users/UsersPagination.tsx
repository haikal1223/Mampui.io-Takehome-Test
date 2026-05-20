type UsersPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function UsersPagination({
  page,
  totalPages,
  onPageChange,
}: UsersPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center justify-between gap-4"
      aria-label="Users pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:enabled:hover:bg-zinc-900"
      >
        Previous
      </button>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Page {page} of {totalPages}
      </p>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:enabled:hover:bg-zinc-900"
      >
        Next
      </button>
    </nav>
  );
}
