import { MainLayout } from "@/src/components/layout/main-layout/main-layout";
import withAuth from "@/src/shared/hoc/withAuth";
import { User as AuthUser } from "next-auth";

type HomeLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function HomeLayout({ user, children }: HomeLayoutProps) {
  return <MainLayout user={user}>{children}</MainLayout>;
}

export default withAuth(HomeLayout);
