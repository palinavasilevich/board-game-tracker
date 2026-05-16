"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import { ROUTES } from "@/shared/constants/routes";

import { cn } from "@/lib/utils";
import { User } from "@/lib/generated/prisma/client";

import { HeaderNavUser } from "./header-nav-user";

type HeaderNavProps = {
  user: User | null;
};

const NAV_LINKS = [{ href: ROUTES.MY_GAMES, label: "My Games" }] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ user }: HeaderNavProps) {
  const pathname = usePathname();

  if (!user) {
    return (
      <div className="flex justify-end">
        <Button variant="secondary" asChild>
          <Link href={ROUTES.LOGIN}>Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <nav className="flex items-center gap-1">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive(pathname, href)
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {user && <HeaderNavUser user={user} />}
    </div>
  );
}
