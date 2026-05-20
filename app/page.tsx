import Link from "next/link";

import { PageShell } from "@/components/ui/PageShell";
import { buttonPrimaryClassName } from "@/lib/styles";

export default function Home() {
  return (
    <PageShell
      title="Mampu.io Frontend Take-Home"
      description="A users workspace built with Next.js, React Query, and JSONPlaceholder. Browse users, inspect activity, and explore posts and todos."
    >
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Get started
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Open the users list to search, filter by todo activity, sort results,
          and view detailed profiles with posts and todos.
        </p>
        <Link href="/users" className={`mt-6 inline-flex ${buttonPrimaryClassName}`}>
          Open users workspace
        </Link>
      </div>
    </PageShell>
  );
}
