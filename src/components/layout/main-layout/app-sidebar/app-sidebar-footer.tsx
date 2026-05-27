"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";
import { getUserInitials } from "@/src/lib/get-user-initials";
import { ROUTES } from "@/src/shared/constants/routes";
import { LogOutIcon } from "lucide-react";
import { User as UserAuth } from "next-auth";
import { signOut } from "next-auth/react";

type AppSidebarFooterProps = {
  user: UserAuth;
};

export function AppSidebarFooter({ user }: AppSidebarFooterProps) {
  const { state } = useSidebar();
  const isSidebarExpanded = state === "expanded";
  return (
    <SidebarMenu className="gap-2">
      {isSidebarExpanded ? (
        <SidebarMenuItem>
          <div className="flex items-center gap-2 rounded-md px-1 py-1">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.name ?? "User Avatar Image"}
              />
              <AvatarFallback className="text-xs">
                {getUserInitials(user?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </SidebarMenuItem>
      ) : null}

      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => signOut({ redirectTo: ROUTES.HOME })}
          tooltip="Log out of account"
          className="cursor-pointer"
        >
          <LogOutIcon />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
