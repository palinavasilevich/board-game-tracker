import { ReactNode } from "react";
import { Header } from "@/components/layout/main-layout/header/header";
import { User as AuthUser } from "next-auth";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}> & { user?: AuthUser };

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="bg-muted-foreground min-h-svh w-full flex flex-col gap-5">
      <Header user={user} />
      <main className="flex flex-1 flex-col p-6">{children}</main>
    </div>
  );
}
