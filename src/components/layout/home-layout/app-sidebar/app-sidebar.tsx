import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { Logo } from "@/src/components/layout/logo";
import { AppSidebarNav } from "@/src/components/layout/home-layout/app-sidebar/app-sidebar-nav";
import { BGG_DOMAINS } from "@/src/shared/api/bgg-api";

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
