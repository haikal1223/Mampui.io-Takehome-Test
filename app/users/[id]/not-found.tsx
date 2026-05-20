import Link from "next/link";

import { PageShell } from "@/components/ui/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonSecondaryClassName } from "@/lib/styles";

export default function UserNotFound() {
  return (
    <PageShell maxWidth="md">
      <EmptyState
        title="User not found"
        description="The user you are looking for does not exist or the link is invalid."
        action={
          <Link href="/users" className={buttonSecondaryClassName}>
            ← Back to users list
          </Link>
        }
      />
    </PageShell>
  );
}
