import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.MY_GAMES);
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
