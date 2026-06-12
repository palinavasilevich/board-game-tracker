"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { isActivePath } from "@/src/lib/isActivePath";
import { ROUTES } from "@/src/shared/constants/routes";
import { DicesIcon, UserIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: ROUTES.MY_GAMES, label: "My Games", icon: DicesIcon },
  { href: ROUTES.FRIENDS, label: "Friends", icon: UsersIcon },
  { href: ROUTES.PROFILE, label: "Profile", icon: UserIcon },
] as const;

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <SidebarMenuItem key={href} className="flex flex-col gap-4 mb-2">
              <SidebarMenuButton
                size="lg"
                asChild
                isActive={isActivePath(pathname, href)}
                tooltip={label}
              >
                <Link href={href} className="gap-3 flex items-center">
                  <Icon className="size-5! ml-1.5" />
                  <span className="font-semibold font-heading">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
