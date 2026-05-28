"use client";

import { ROUTES } from "@/src/shared/constants/routes";
import { DicesIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { cn } from "@/src/lib/utils";

type LogoProps = Omit<ComponentProps<typeof Link>, "href"> & {
  isSidebar?: boolean;
};

export function Logo({ className, isSidebar, ...props }: LogoProps) {
  const pathname = usePathname();
  return (
    <Link
      href={ROUTES.HOME}
      className={cn(
        "gap-3!",
        pathname === ROUTES.HOME && isSidebar && "bg-sidebar-accent",
        className,
      )}
      {...props}
    >
      <DicesIcon className="size-5!" />
      <span className="text-base font-semibold">Board Games</span>
    </Link>
  );
}
