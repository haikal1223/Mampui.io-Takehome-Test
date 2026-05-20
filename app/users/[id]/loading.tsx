import { PageShell } from "@/components/ui/PageShell";
import { UserDetailSkeleton } from "@/components/users/UserDetailSkeleton";

export default function UserDetailLoading() {
  return (
    <PageShell maxWidth="md">
      <UserDetailSkeleton />
    </PageShell>
  );
}
