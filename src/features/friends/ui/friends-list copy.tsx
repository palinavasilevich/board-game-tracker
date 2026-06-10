"use client";

import { Loader2Icon, UserXIcon, LibraryIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { useFriends } from "../lib/use-friends";
import { useUnfollow } from "../lib/use-unfollow";
import Link from "next/link";
import { ROUTES } from "@/src/shared/constants/routes";

export function FriendsList() {
  const { friendships, isLoading } = useFriends();
  const { mutate: unfollow, isPending: isUnfollowing, variables: unfollowingId } = useUnfollow();

  function handleUnfollow(friendshipId: string, userName: string) {
    unfollow(friendshipId, {
      onSuccess: () => toast.success(`Unfollowed ${userName}`),
      onError: () => toast.error("Failed to unfollow"),
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (friendships.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        You&apos;re not following anyone yet. Search for users above to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {friendships.map(({ id, following }) => (
        <div key={id} className="flex items-center justify-between gap-3 py-3">
          <Link
            href={ROUTES.USER(following.id)}
            className="flex items-center gap-3 min-w-0 flex-1 group"
          >
            <div className="size-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold uppercase group-hover:bg-accent transition-colors">
              {following.name.charAt(0)}
            </div>
            <span className="font-medium truncate group-hover:underline">
              {following.name}
            </span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" asChild>
              <Link href={ROUTES.USER(following.id)}>
                <LibraryIcon className="size-3" />
                Collection
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-xs text-muted-foreground hover:text-destructive"
              disabled={isUnfollowing && unfollowingId === id}
              onClick={() => handleUnfollow(id, following.name)}
            >
              {isUnfollowing && unfollowingId === id ? (
                <Loader2Icon className="size-3 animate-spin" />
              ) : (
                <UserXIcon className="size-3" />
              )}
              Unfollow
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
