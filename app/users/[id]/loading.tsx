import { UserDetailSkeleton } from "@/components/users/UserDetailSkeleton";

export default function UserDetailLoading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-12">
      <UserDetailSkeleton />
    </div>
  );
}
