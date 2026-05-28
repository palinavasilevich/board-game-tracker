import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

import { Logo } from "../header/logo";
import { AppSidebarNav } from "./app-sidebar-nav";
import type { ComponentProps } from "react";
import { User as AuthUser } from "next-auth";
import { UserAvatarButton } from "./user-avatar-button/user-avatar-button";

export async function AppSidebar({
  user,
  ...props
}: ComponentProps<typeof Sidebar> & { user: AuthUser }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo isSidebar />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav />
      </SidebarContent>

      <SidebarFooter>
        <UserAvatarButton user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
