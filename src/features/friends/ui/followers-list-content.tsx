"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2Icon } from "lucide-react";
import { ROUTES } from "@/src/shared/constants/routes";
import { FollowerItem } from "../lib/use-friends";

type FollowersListContentProps = {
  followers: FollowerItem[];
  isLoading: boolean;
  isError: boolean;
};

export function FollowersListContent({ followers, isLoading, isError }: FollowersListContentProps) {
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

  if (followers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">Nobody is following you yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Share your profile to get followers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {followers.map(({ id, follower }) => (
        <Link
          key={id}
          href={ROUTES.USER(follower.id)}
          className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3 hover:shadow-sm transition duration-300 group"
        >
          <div className="size-9 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold uppercase overflow-hidden group-hover:bg-accent transition-colors">
            {follower.avatarUrl ? (
              <Image src={follower.avatarUrl} alt={follower.name} width={36} height={36} className="size-full object-cover" />
            ) : (
              follower.name.charAt(0)
            )}
          </div>
          <span className="font-medium truncate">{follower.name}</span>
        </Link>
      ))}
    </div>
  );
}
