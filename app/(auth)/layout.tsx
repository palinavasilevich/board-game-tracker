import { User as AuthUser } from "next-auth";
import { MainLayout } from "@/components/layout/main-layout/main-layout";
import withAuth from "@/shared/hoc/withAuth";

type AuthLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function AuthLayout({ user, children }: AuthLayoutProps) {
  return <MainLayout user={user}>{children}</MainLayout>;
}

export default withAuth(AuthLayout);
