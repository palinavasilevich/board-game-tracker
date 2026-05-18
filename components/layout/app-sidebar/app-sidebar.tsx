import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DicesIcon } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { AppSidebarNav } from "./app-sidebar-nav";
import { prisma } from "@/lib/db";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const genres = await prisma.genre.findMany({ orderBy: { name: "asc" } });

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href={ROUTES.HOME}>
                <DicesIcon className="size-5!" />
                <span className="text-base font-semibold">Board Games</span>
              </Link>
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
