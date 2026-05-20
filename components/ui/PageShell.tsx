import type { ReactNode } from "react";

type PageShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "md" | "lg";
};

const maxWidthClass = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
} as const;

export function PageShell({
  title,
  description,
  children,
  maxWidth = "lg",
}: PageShellProps) {
  return (
    <div
      className={`mx-auto flex w-full flex-1 flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 ${maxWidthClass[maxWidth]}`}
    >
      {title || description ? (
        <header className="space-y-1">
          {title ? (
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {description ? (
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      {children}
    </div>
  );
}
