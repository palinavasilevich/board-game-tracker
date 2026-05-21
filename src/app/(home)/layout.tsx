import type { PropsWithChildren } from "react";
import { Header } from "@/src/components/layout/home-layout/header/header";
import { AppSidebar } from "@/src/components/layout/home-layout/app-sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { TooltipProvider } from "@/src/components/ui/tooltip";

export default function HomeLayout({ children }: PropsWithChildren) {
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
        <AppSidebar variant="inset" />
        <SidebarInset>
          <Header />
          <div className="@container/main flex flex-1 flex-col p-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
