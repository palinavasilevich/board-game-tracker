import { auth } from "@/auth";
import { prisma } from "@/src/lib/db";
import { notFound } from "next/navigation";
import { ProfileForm } from "./profile-form";
import { ChangePasswordForm } from "./change-password-form";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, avatarUrl: true },
  });

  if (!user) notFound();

  return (
    <div className="w-full max-w-xl mx-auto mt-8 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight uppercase">
          Profile
        </h1>
        <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
          Manage your account details
        </p>
      </div>

      <section className="rounded-lg border p-6 flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Personal Info
        </h2>
        <ProfileForm
          name={user.name}
          email={user.email}
          avatarUrl={user.avatarUrl}
        />
      </section>

      <section className="rounded-lg border p-6 flex flex-col gap-4">
        <h2 className="font-heading text-lg font-semibold tracking-tight">
          Change Password
        </h2>
        <ChangePasswordForm />
      </section>
    </div>
  );
}
