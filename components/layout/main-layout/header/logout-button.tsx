"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { ROUTES } from "@/shared/constants/routes";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      type="button"
      className="justify-start outline-0"
      onClick={() => signOut({ redirectTo: ROUTES.HOME })}
    >
      <LogOutIcon />
      Logout
    </Button>
  );
}
