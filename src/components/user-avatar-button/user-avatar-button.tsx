"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { getUserInitials } from "@/src/lib/get-user-initials";
import { ROUTES } from "@/src/shared/constants/routes";
import { EllipsisVerticalIcon, LogOutIcon } from "lucide-react";
import { User as AuthUser } from "next-auth";
import { UserAvatar } from "./user-avatar";

type UserAvatarButtonProps = {
  user: AuthUser;
};

export function UserAvatarButton({ user }: UserAvatarButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="outline-0 data-[state=open]:bg-transparent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent"
        >
          <UserAvatar user={user} />
          <EllipsisVerticalIcon className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar user={user} />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <CircleUserRoundIcon />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          <Button
            variant="ghost"
            type="button"
            className="w-full justify-start outline-0"
            onClick={() => signOut({ redirectTo: ROUTES.HOME })}
          >
            <LogOutIcon />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
