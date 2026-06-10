"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2Icon, UserXIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { ROUTES } from "@/src/shared/constants/routes";
import { useUnfollow } from "../lib/use-unfollow";
import { FriendshipItem } from "../lib/use-friends";

type FriendsListRowProps = {
  friendshipId: string;
  following: FriendshipItem["following"];
};

export function FriendsListRow({ friendshipId, following }: FriendsListRowProps) {
  const {
    mutate: unfollow,
    isPending: isUnfollowing,
    variables: unfollowingId,
  } = useUnfollow();

  function handleUnfollow(userName: string) {
    unfollow(friendshipId, {
      onSuccess: () => toast.success(`Unfollowed ${userName}`),
      onError: () => toast.error("Failed to unfollow"),
    });
  }

  return (
    <div className="relative flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:shadow-sm transition duration-300">
      <Link
        href={ROUTES.USER(following.id)}
        className="flex items-center gap-3 min-w-0 flex-1 group"
      >
        <div className="size-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold uppercase overflow-hidden group-hover:bg-accent transition-colors">
          {following.avatarUrl ? (
            <Image src={following.avatarUrl} alt={following.name} width={36} height={36} className="size-full object-cover" />
          ) : (
            following.name.charAt(0)
          )}
        </div>
        <span className="font-medium truncate">{following.name}</span>
      </Link>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
          disabled={isUnfollowing && unfollowingId === friendshipId}
          onClick={() => handleUnfollow(following.name)}
        >
          {isUnfollowing && unfollowingId === following.id ? (
            <Loader2Icon className="size-3 animate-spin" />
          ) : (
            <UserXIcon className="size-3" />
          )}
          Unfollow
        </Button>
      </div>
    </div>
  );
}
