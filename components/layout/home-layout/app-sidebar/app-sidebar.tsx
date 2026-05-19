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
import { readGamesFromCsv, readGenresFromCsv } from "@/lib/games-csv";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const games = readGamesFromCsv();
  const genres = readGenresFromCsv(games).map((name) => ({ id: name, name }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
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
