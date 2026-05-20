import { buttonSecondaryClassName } from "@/lib/styles";

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
      className="flex flex-col items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm sm:flex-row dark:border-zinc-800 dark:bg-zinc-950"
      aria-label="Users pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={`w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-40 ${buttonSecondaryClassName}`}
      >
        Previous
      </button>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Page {page} of {totalPages}
      </p>
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-40 ${buttonSecondaryClassName}`}
      >
        Next
      </button>
    </nav>
  );
}
