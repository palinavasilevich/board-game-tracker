"use client";

import { Loader2Icon } from "lucide-react";
import { FriendsListRow } from "./friends-list-row";
import { FriendshipItem } from "../lib/use-friends";

type FriendsListContentProps = {
  friendships: FriendshipItem[];
  isLoading: boolean;
  isError: boolean;
};

export function FriendsListContent({ friendships, isLoading, isError }: FriendsListContentProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground text-sm">Failed to load. Please try again.</p>
      </div>
    );
  }

  if (friendships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">You&apos;re not following anyone yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Find people to follow using the search above.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {friendships.map(({ id, following }) => (
        <FriendsListRow key={id} friendshipId={id} following={following} />
      ))}
    </div>
  );
}
