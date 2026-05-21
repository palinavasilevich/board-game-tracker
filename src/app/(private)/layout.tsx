import { MainLayout } from "@/src/components/layout/main-layout/main-layout";
import withAuth from "@/src/shared/hoc/withAuth";
import { User as AuthUser } from "next-auth";

type PrivateLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function PrivateLayout({ user, children }: PrivateLayoutProps) {
  return <MainLayout user={user}>{children}</MainLayout>;
}

export default withAuth(PrivateLayout);
