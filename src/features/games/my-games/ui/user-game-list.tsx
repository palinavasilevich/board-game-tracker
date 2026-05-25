"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2Icon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { useUserGames, type UserGameItem } from "../lib/use-user-games";
import { useRemoveUserGame } from "../lib/use-remove-user-game";

const TABS = [
  { value: "all", label: "All" },
  { value: UserGameStatus.OWNED, label: "Owned" },
  { value: UserGameStatus.WISHLIST, label: "Wishlist" },
] as const;

const STATUS_COLORS: Record<UserGameStatus, string> = {
  OWNED: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  WISHLIST: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

function GameRow({ item }: { item: UserGameItem }) {
  const { mutate: remove, isPending } = useRemoveUserGame();

  function handleRemove() {
    remove(item.id, {
      onError: () => toast.error("Failed to remove game"),
    });
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:border-border transition-colors">
      <div className="relative size-14 shrink-0 rounded-md overflow-hidden border border-border/50">
        <Image
          src={item.game.imageUrl || "/images/placeholder.jpg"}
          alt={item.game.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/game/${item.game.externalId || item.game.id}`}
          className="font-medium hover:text-primary transition-colors truncate block"
        >
          {item.game.name}
        </Link>
        <p className="text-sm text-muted-foreground mt-0.5">
          {item.game.yearPublished} · Rank #{item.game.rank}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[item.status]}`}
        >
          {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
        </span>
        <span className="text-sm font-medium text-muted-foreground min-w-12">
          ★ {item.game.metaScore}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Trash2Icon className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function GameListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3"
        >
          <Skeleton className="size-14 rounded-md shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

function GameListContent({ status }: { status?: UserGameStatus }) {
  const { userGames, isLoading } = useUserGames(status);

  if (isLoading) return <GameListSkeleton />;

  if (userGames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">No games here yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Use the &ldquo;Add Game&rdquo; button to start your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {userGames.map((item) => (
        <GameRow key={item.id} item={item} />
      ))}
    </div>
  );
}

export function UserGameList() {
  const [tab, setTab] = useState<string>("all");
  const { userGames: allGames } = useUserGames();

  const counts = {
    all: allGames.length,
    OWNED: allGames.filter((g) => g.status === UserGameStatus.OWNED).length,
    WISHLIST: allGames.filter((g) => g.status === UserGameStatus.WISHLIST)
      .length,
  };

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
