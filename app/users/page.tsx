import { Suspense } from "react";

import { PageShell } from "@/components/ui/PageShell";
import {
  UsersListSkeleton,
  UsersListWorkspace,
} from "@/components/users/UsersListWorkspace";

export default function UsersPage() {
  return (
    <PageShell
      title="Users"
      description="Browse users from JSONPlaceholder. Search, filter by activity, sort, and open a profile."
    >
      <Suspense fallback={<UsersListSkeleton />}>
        <UsersListWorkspace />
      </Suspense>
    </PageShell>
  );
}
