import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/layout/logo";
import { AppSidebarNav } from "@/components/layout/home-layout/app-sidebar/app-sidebar-nav";
import { BGG_DOMAINS } from "@/lib/bgg-api";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const genres = BGG_DOMAINS.map((name) => ({ id: name, name }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent!"
            >
              <Logo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav genres={genres} />
      </SidebarContent>
    </Sidebar>
  );
}
