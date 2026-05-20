import { ReactNode } from "react";
import { Header } from "@/components/layout/main-layout/header/header";
import { User as AuthUser } from "next-auth";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}> & { user?: AuthUser };

export function MainLayout({ children, user }: MainLayoutProps) {
  return (
    <div
      className="min-h-svh w-full mx-auto flex flex-col"
      style={{ backgroundColor: "var(--sidebar)" }}
    >
      <Header user={user} />
      <main
        className="w-full mx-auto max-w-7xl flex flex-1 flex-col items-center px-6 pb-6"
        style={{
          maxWidth: "80rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}
