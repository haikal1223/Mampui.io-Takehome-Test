import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/ui/PageShell";
import { UserDetailView } from "@/components/users/UserDetailView";
import { fetchUser, UserNotFoundError } from "@/lib/api/jsonplaceholder";
import { parseReturnTo, parseUserId } from "@/lib/users/parse-user-id";

type UserPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<UserPageProps, "params">): Promise<Metadata> {
  const { id } = await params;
  const userId = parseUserId(id);

  if (userId === null) {
    return { title: "User not found" };
  }

  try {
    const user = await fetchUser(userId);
    return {
      title: user.name,
      description: `${user.email} · ${user.company.name}`,
    };
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return { title: "User not found" };
    }
    return { title: "User" };
  }
}

export default async function UserPage({ params, searchParams }: UserPageProps) {
  const { id } = await params;
  const userId = parseUserId(id);

  if (userId === null) {
    notFound();
  }

  const { returnTo } = await searchParams;
  const backHref = parseReturnTo(returnTo);

  return (
    <PageShell maxWidth="md">
      <UserDetailView userId={userId} backHref={backHref} />
    </PageShell>
  );
}
