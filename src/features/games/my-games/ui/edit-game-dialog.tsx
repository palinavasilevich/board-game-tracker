"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { useEditUserGame } from "../lib/use-edit-user-game";
import { type UserGameItem } from "../lib/use-user-games";

const STATUS_LABELS: Record<UserGameStatus, string> = {
  OWNED: "Owned",
  WISHLIST: "Wishlist",
};

type Props = {
  item: UserGameItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditGameDialog({ item, open, onOpenChange }: Props) {
  const [status, setStatus] = useState<UserGameStatus>(item.status);
  const [userScore, setUserScore] = useState<number | undefined>(
    item.userScore ?? undefined,
  );

  const { mutate: edit, isPending } = useEditUserGame();

  function handleSave() {
    edit(
      { id: item.id, status, userScore: userScore ?? null },
      {
        onSuccess: () => {
          toast.success(`${item.game.name} updated`);
          onOpenChange(false);
        },
        onError: () => toast.error("Failed to update game"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Edit Game</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          <div className="truncate rounded-md border bg-accent/30 px-3 py-2 text-sm font-medium">
            {item.game.name}
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              min={0}
              max={10}
              step={1}
              placeholder="0 – 10"
              className="flex-1"
              value={userScore ?? ""}
              onChange={(e) =>
                setUserScore(
                  e.target.value
                    ? Math.min(10, Math.max(0, Number(e.target.value)))
                    : undefined,
                )
              }
            />

            <Select
              value={status}
              onValueChange={(v) => setStatus(v as UserGameStatus)}
            >
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(UserGameStatus).map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} disabled={isPending} className="w-full gap-2">
            {isPending ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <span className="size-4" />
            )}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
