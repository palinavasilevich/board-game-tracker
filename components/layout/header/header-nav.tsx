"use client";

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "../../ui/button";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

type HeaderNavProps = {
  session: Session | null;
};

export function HeaderNav({ session }: HeaderNavProps) {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session?.user) {
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
      <div className="flex justify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList>
            <TabsTrigger value="dashboard" asChild>
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => signOut({ redirectTo: ROUTES.HOME })}
      >
        <LogOutIcon />
        Logout
      </Button>
    </div>
  );
}
