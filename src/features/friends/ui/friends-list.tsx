"use client";

import { useState } from "react";
import { UserRoundCheckIcon, UsersIcon } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { useFriends } from "../lib/use-friends";
import { FriendsListContent } from "./friends-list-content";
import { FollowersListContent } from "./followers-list-content";
import { UserSearch } from "./user-search";

const ConnectionsStatus = {
  FOLLOWERS: "FOLLOWERS",
  FOLLOWING: "FOLLOWING",
} as const;

export function FriendsList() {
  const [tab, setTab] = useState<string>(ConnectionsStatus.FOLLOWING);
  const { friendships, followers, isLoading, isError } = useFriends();

  return (
    <div className="flex flex-col gap-6 w-full">
      <UserSearch />
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6 w-fit mx-auto">
        <TabsTrigger value={ConnectionsStatus.FOLLOWING} className="gap-2">
          Following
          <UserRoundCheckIcon className="size-4" />
          {friendships.length > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {friendships.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value={ConnectionsStatus.FOLLOWERS} className="gap-2">
          Followers
          <UsersIcon className="size-4" />
          {followers.length > 0 && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {followers.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={ConnectionsStatus.FOLLOWING}>
        <FriendsListContent friendships={friendships} isLoading={isLoading} isError={isError} />
      </TabsContent>

      <TabsContent value={ConnectionsStatus.FOLLOWERS}>
        <FollowersListContent followers={followers} isLoading={isLoading} isError={isError} />
      </TabsContent>
    </Tabs>
    </div>
  );
}
