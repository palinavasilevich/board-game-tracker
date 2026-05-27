"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2Icon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { useRemoveUserGame } from "@/src/features/games/my-games/lib/use-remove-user-game";
import { type UserGameItem } from "@/src/features/games/my-games/lib/use-user-games";

const STATUS_COLORS: Record<UserGameStatus, string> = {
  OWNED: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  WISHLIST: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export function GameRow({ item }: { item: UserGameItem }) {
  const { mutate: remove, isPending } = useRemoveUserGame();

  function handleRemove() {
    remove(item.id, {
      onError: () => toast.error("Failed to remove game"),
    });
  }

  return (
    <div className="relative flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:border-border transition-colors">
      <Link
        href={`/game/${item.game.externalId || item.game.id}`}
        className="absolute inset-0 rounded-lg"
      />
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
        <p className="font-semibold truncate block">{item.game.name}</p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {item.game.yearPublished} · Rank #{item.game.rank}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[item.status]}`}
        >
          {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
        </span>

        <span
          className="text-sm font-medium text-muted-foreground min-w-7"
          title="BGG score"
        >
          {item.game.metaScore}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive z-10"
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
