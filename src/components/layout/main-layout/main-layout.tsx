import { ReactNode } from "react";
import { User as AuthUser } from "next-auth";
import { Header } from "./header/header";
import { SidebarProvider, SidebarInset } from "@/src/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar/app-sidebar";
import { TooltipProvider } from "../../ui/tooltip";

type MainLayoutProps = Readonly<{
  children: ReactNode;
}> & { user?: AuthUser };

export function MainLayout({ children, user }: MainLayoutProps) {
  if (user) {
    return (
      <TooltipProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" user={user} />
          <SidebarInset>
            <Header user={user} />
            <main className="w-full mx-auto max-w-8xl flex flex-1 flex-col items-center px-4 lg:px-6">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    );
  }

  return (
    <div className="min-h-svh w-full mx-auto flex flex-col bg-sidebar">
      <div className="rounded-lg shadow-sm m-2 bg-background flex flex-col flex-1">
        <Header user={user} />
        <main className="w-full mx-auto max-w-8xl flex flex-1 flex-col items-center px-4 lg:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
