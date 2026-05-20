import { auth } from "@/auth";
import { SignupForm } from "@/components/auth/signup-form";
import { ROUTES } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect(ROUTES.MY_GAMES);
  }

  return <SignupForm />;
}
