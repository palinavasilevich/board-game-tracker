import { MainLayout } from "@/src/components/layout/main-layout/main-layout";
import withAuth from "@/src/shared/hoc/withAuth";
import { User as AuthUser } from "next-auth";

type GuestLayoutProps = {
  children: React.ReactNode;
  user?: AuthUser;
};

function GuestLayout({ user, children }: GuestLayoutProps) {
  return (
    <MainLayout user={user}>
      <div className="flex flex-1 w-full items-center justify-center py-12">
        {children}
      </div>
    </MainLayout>
  );
}

export default withAuth(GuestLayout);
