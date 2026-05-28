"use client";

import { useState } from "react";

import { Badge } from "@/src/components/ui/badge";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { useUserGames } from "../../lib/use-user-games";
import { GameListContent } from "./game-list-content";

const TABS = [
  { value: "all", label: "All" },
  { value: UserGameStatus.OWNED, label: "Owned" },
  { value: UserGameStatus.WISHLIST, label: "Wishlist" },
] as const;

export function UserGameList() {
  const [tab, setTab] = useState<string>("all");
  const { userGames: allGames } = useUserGames();

  const counts = {
    all: allGames.length,
    OWNED: allGames.filter((g) => g.status === UserGameStatus.OWNED).length,
    WISHLIST: allGames.filter((g) => g.status === UserGameStatus.WISHLIST)
      .length,
  };

  if (allGames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-muted-foreground">No games here yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Use the &ldquo;Add Game&rdquo; button to start your collection.
        </p>
      </div>
    );
  }

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-6">
        {TABS.map(({ value, label }) => (
          <TabsTrigger key={value} value={value} className="gap-2">
            {label}
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {counts[value as keyof typeof counts]}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all">
        <GameListContent />
      </TabsContent>
      {Object.values(UserGameStatus).map((s) => (
        <TabsContent key={s} value={s}>
          <GameListContent status={s} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
