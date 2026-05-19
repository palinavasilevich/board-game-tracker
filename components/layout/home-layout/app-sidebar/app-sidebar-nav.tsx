"use client";

import { Suspense } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AppSidebarFilters } from "@/components/filters/app-sidebar-filters/app-sidebar-filters";

interface AppSidebarNavProps {
  genres: { id: string; name: string }[];
}

export function AppSidebarNav({ genres }: AppSidebarNavProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col gap-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold">Filter Games</h3>
              <p className="text-muted-foreground">
                Refine your search with filters
              </p>
            </div>
            <Suspense>
              <AppSidebarFilters genres={genres} />
            </Suspense>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
