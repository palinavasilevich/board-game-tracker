import { auth } from "@/auth";
import { LoginForm } from "@/src/components/auth/login-form";
import { ROUTES } from "@/src/shared/constants/routes";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.MY_GAMES);
  }
  return <LoginForm />;
}
