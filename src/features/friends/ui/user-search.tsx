"use client";

import { useState } from "react";
import { SearchIcon, Loader2Icon, UserPlusIcon, CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useUserSearch } from "../lib/use-user-search";
import { useFollow } from "../lib/use-follow";
import Link from "next/link";
import { ROUTES } from "@/src/shared/constants/routes";

export function UserSearch() {
  const [query, setQuery] = useState("");
  const { results, isSearching, hasQuery } = useUserSearch(query);
  const { mutate: follow, isPending: isFollowing, variables: followingId } = useFollow();

  function handleFollow(userId: string, userName: string) {
    follow(userId, {
      onSuccess: () => toast.success(`Now following ${userName}`),
      onError: () => toast.error("Failed to follow user"),
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search users by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {hasQuery && (
        <div className="flex flex-col gap-1 rounded-lg border bg-card">
          {isSearching && results.length === 0 ? (
            <div className="flex items-center justify-center py-6">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : results.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No users found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-accent/30 transition-colors"
              >
                <Link
                  href={ROUTES.USER(user.id)}
                  className="flex items-center gap-3 min-w-0 flex-1"
                >
                  <div className="size-8 shrink-0 rounded-full bg-muted flex items-center justify-center text-sm font-semibold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium truncate">{user.name}</span>
                </Link>

                {user.isFollowing ? (
                  <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs" disabled>
                    <CheckIcon className="size-3" />
                    Following
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 gap-1.5 text-xs"
                    disabled={isFollowing && followingId === user.id}
                    onClick={() => handleFollow(user.id, user.name)}
                  >
                    {isFollowing && followingId === user.id ? (
                      <Loader2Icon className="size-3 animate-spin" />
                    ) : (
                      <UserPlusIcon className="size-3" />
                    )}
                    Follow
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
