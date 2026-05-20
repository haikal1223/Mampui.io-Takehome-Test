import type { User } from "@/lib/api/types";

type UserDetailCardProps = {
  user: User;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
      <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </dt>
      <dd className="text-sm text-zinc-900 break-words dark:text-zinc-50">
        {value}
      </dd>
    </div>
  );
}

export function UserDetailCard({ user }: UserDetailCardProps) {
  const address = `${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`;

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <header className="border-b border-zinc-100 pb-4 dark:border-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {user.name}
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          @{user.username}
        </p>
      </header>

      <dl className="mt-6 space-y-4">
        <DetailRow label="Email" value={user.email} />
        <DetailRow label="Phone" value={user.phone} />
        <DetailRow label="Website" value={user.website} />
      </dl>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Company
        </h2>
        <p className="mt-2 font-medium text-zinc-900 dark:text-zinc-50">
          {user.company.name}
        </p>
        <p className="mt-1 text-sm italic text-zinc-600 dark:text-zinc-400">
          &ldquo;{user.company.catchPhrase}&rdquo;
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Address
        </h2>
        <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-50">{address}</p>
      </section>
    </article>
  );
}
