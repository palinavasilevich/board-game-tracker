import { ReactNode } from "react";
import { Header } from "@/components/layout/main-layout/header/header";
import { User as AuthUser } from "next-auth";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}> & { user?: AuthUser };

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div className="min-h-svh max-w-3xl mx-auto flex flex-col">
      <Header user={user} />
      <main className="w-full flex flex-1 flex-col items-center p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
