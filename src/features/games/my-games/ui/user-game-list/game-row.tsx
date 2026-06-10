"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit2Icon, StarIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { useRemoveUserGame } from "@/src/features/games/my-games/lib/use-remove-user-game";
import { type UserGameItem } from "@/src/features/games/my-games/lib/use-user-games";
import { EditGameDialog } from "../../ui/edit-game-dialog";
import { DeletionConfirmationDialog } from "./deletion-confirmation-dialog";
import { STATUS_LABELS, STATUS_BADGE_COLORS } from "@/src/entities/game/model/status-config";

export function GameRow({ item }: { item: UserGameItem }) {
  const [editOpen, setEditOpen] = useState(false);
  const { mutate: remove, isPending: isRemovePending } = useRemoveUserGame();

  function handleRemove() {
    remove(item.id, {
      onError: () => toast.error("Failed to remove game"),
    });
  }

  return (
    <>
      <div className="relative flex items-center gap-4 rounded-lg border border-border/50 bg-card px-4 py-3 hover:shadow-sm transition duration-300">
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
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGE_COLORS[item.status]}`}
          >
            {STATUS_LABELS[item.status]}
          </span>

          <span
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground min-w-12"
            title="BGG score"
          >
            <StarIcon className="size-3" fill="currentColor" strokeWidth={0} />{" "}
            {item.game.metaScore}
          </span>

          <div className="z-10">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-destructive"
              onClick={() => setEditOpen(true)}
            >
              <Edit2Icon className="size-4 text-yellow-400" />
            </Button>

            <DeletionConfirmationDialog
              gameName={item.game.name}
              isRemovePending={isRemovePending}
              onRemove={handleRemove}
            />
          </div>
        </div>
      </div>

      <EditGameDialog item={item} open={editOpen} onOpenChange={setEditOpen} />
    </>
  );
}
