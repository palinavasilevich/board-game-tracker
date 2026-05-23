"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "../../../ui/button";
import { ROUTES } from "@/src/shared/constants/routes";
import { cn } from "@/src/lib/utils";
import { UserAvatarButton } from "@/src/components/user-avatar-button/user-avatar-button";
import { ThemeToggle } from "@/src/components/theme-toggle";

import { User as AuthUser } from "next-auth";
import { Logo } from "./logo";

type HeaderNavProps = {
  user?: AuthUser;
};

const NAV_LINKS = [{ href: ROUTES.MY_GAMES, label: "My Games" }] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ user }: HeaderNavProps) {
  const pathname = usePathname();

  if (!user) {
    return (
      <nav className="w-full flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Logo />
        </Button>
        <div className="flex gap-1">
          <Button variant="secondary" asChild>
            <Link href={ROUTES.LOGIN}>Sign in</Link>
          </Button>

          <ThemeToggle />
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full flex items-center justify-between">
      <Button variant="ghost" asChild>
        <Logo />
      </Button>

      <div className="flex gap-1">
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

        <UserAvatarButton user={user} />

        <ThemeToggle />
      </div>
    </nav>
  );
}
