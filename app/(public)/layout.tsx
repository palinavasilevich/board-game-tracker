import { MainLayout } from "@/components/layout/main-layout/main-layout";
import withAuth from "@/shared/hoc/withAuth";
import { User as AuthUser } from "next-auth";

type PublicLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function PublicLayout({ user, children }: PublicLayoutProps) {
  return <MainLayout user={user}>{children}</MainLayout>;
}

export default withAuth(PublicLayout);
