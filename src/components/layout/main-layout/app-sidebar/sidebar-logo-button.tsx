"use client";

import { SidebarMenuButton } from "@/src/components/ui/sidebar";
import { Logo } from "../header/logo";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/src/shared/constants/routes";

export function SidebarLogoButton() {
  const pathname = usePathname();
  return (
    <SidebarMenuButton size="lg" asChild isActive={pathname === ROUTES.HOME}>
      <Logo />
    </SidebarMenuButton>
  );
}
