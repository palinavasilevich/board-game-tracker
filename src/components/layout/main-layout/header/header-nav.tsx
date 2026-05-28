import Link from "next/link";

import { Button } from "../../../ui/button";
import { ROUTES } from "@/src/shared/constants/routes";
import { ThemeToggle } from "@/src/components/theme-toggle";

import { User as AuthUser } from "next-auth";
import { Logo } from "./logo";
import { SidebarTrigger } from "@/src/components/ui/sidebar";

type HeaderNavProps = {
  user?: AuthUser;
};

export function HeaderNav({ user }: HeaderNavProps) {
  return (
    <nav className="w-full flex items-center justify-between">
      {!user ? (
        <>
          <Button variant="ghost" asChild>
            <Logo />
          </Button>

          <div className="flex gap-1">
            <Button variant="secondary" asChild>
              <Link href={ROUTES.LOGIN}>Sign in</Link>
            </Button>

            <ThemeToggle />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-1">
            <SidebarTrigger className="-ml-1" />
            <Button variant="ghost" asChild className="md:hidden">
              <Logo />
            </Button>
          </div>
          <ThemeToggle />
        </>
      )}
    </nav>
  );
}
