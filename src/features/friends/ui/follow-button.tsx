"use client";

import { useState } from "react";
import { UserPlusIcon, UserCheckIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { useFollow } from "../lib/use-follow";
import { useUnfollow } from "../lib/use-unfollow";

type Props = {
  followingId: string;
  initialFriendshipId: string | null;
};

export function FollowButton({ followingId, initialFriendshipId }: Props) {
  const [friendshipId, setFriendshipId] = useState<string | null>(initialFriendshipId);

  const { mutate: follow, isPending: isFollowing } = useFollow();
  const { mutate: unfollow, isPending: isUnfollowing } = useUnfollow();

  const isPending = isFollowing || isUnfollowing;

  function handleFollow() {
    follow(followingId, {
      onSuccess: (data) => {
        setFriendshipId(data.friendship.id);
        toast.success("Now following");
      },
      onError: () => toast.error("Failed to follow"),
    });
  }

  function handleUnfollow() {
    if (!friendshipId) return;
    unfollow(friendshipId, {
      onSuccess: () => {
        setFriendshipId(null);
        toast.success("Unfollowed");
      },
      onError: () => toast.error("Failed to unfollow"),
    });
  }

  if (friendshipId) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={handleUnfollow}
        className="gap-2"
      >
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <UserCheckIcon className="size-4" />
        )}
        Following
      </Button>
    );
  }

  return (
    <Button size="sm" disabled={isPending} onClick={handleFollow} className="gap-2">
      {isPending ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : (
        <UserPlusIcon className="size-4" />
      )}
      Follow
    </Button>
  );
}
