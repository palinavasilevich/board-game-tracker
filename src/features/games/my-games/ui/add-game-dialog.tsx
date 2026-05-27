"use client";

import { useState } from "react";
import { PlusIcon, SearchIcon, Loader2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { useDebounce } from "@/src/shared/lib/use-debounce";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import type { BGGGame } from "@/src/shared/types/game.types";
import { useAddUserGame } from "../lib/use-add-user-game";

const STATUS_LABELS: Record<UserGameStatus, string> = {
  OWNED: "Owned",
  WISHLIST: "Wishlist",
};

export function AddGameDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<BGGGame | null>(null);
  const [status, setStatus] = useState<UserGameStatus>(UserGameStatus.OWNED);
  const [userScore, setUserScore] = useState<number>();

  const debouncedSearch = useDebounce(search, 400);

  const { data, isFetching } = useQuery<{ games: BGGGame[] }>({
    queryKey: ["dialog-bgg-search", debouncedSearch],
    queryFn: async () => {
      if (!debouncedSearch) {
        return { games: [] };
      }

      const res = await fetch(
        `/api/bgg/search?q=${encodeURIComponent(debouncedSearch)}`,
      );

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      return res.json();
    },
    enabled: open && debouncedSearch.length > 0,
    placeholderData: (prev) => prev,
  });

  const { mutate: addFromBgg, isPending } = useAddUserGame();

  function reset() {
    setOpen(false);
    setSearch("");
    setSelected(null);
    setStatus(UserGameStatus.OWNED);
    setUserScore(undefined);
  }

  function handleAdd() {
    if (!selected) return;
    addFromBgg(
      { externalId: selected.id, status, userScore },
      {
        onSuccess: () => {
          toast.success(`${selected.name} added to ${STATUS_LABELS[status]}`);
          reset();
        },
        onError: () => toast.error("Failed to add game"),
      },
    );
  }

  function handleOpenChange(val: boolean) {
    if (!val) reset();
    else setOpen(true);
  }

  const games = data?.games ?? [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusIcon className="size-4" />
          Add Game
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Game to Collection</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search BoardGameGeek…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected(null);
              }}
              className="pl-9"
              autoFocus
            />
          </div>

          <div className={`flex max-h-56 flex-col overflow-y-auto rounded-md bg-popover ${games.length > 0 ? "border" : ""}`}>
            {debouncedSearch.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Type to search BoardGameGeek
              </p>
            ) : isFetching && games.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : games.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No games found
              </p>
            ) : (
              games.map((game) => (
                <button
                  key={game.id}
                  type="button"
                  onClick={() => setSelected(game)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                    selected?.id === game.id
                      ? "bg-accent font-semibold ring-1 ring-inset ring-ring"
                      : ""
                  }`}
                >
                  {game.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={game.thumbnail}
                      alt=""
                      className="size-8 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="size-8 shrink-0 rounded bg-muted" />
                  )}
                  <span className="flex-1 truncate font-medium">
                    {game.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {game.yearPublished}
                  </span>
                </button>
              ))
            )}
          </div>

          {selected && (
            <div className="truncate rounded-md border bg-accent/30 px-3 py-2 text-sm font-medium">
              Selected: {selected.name}
            </div>
          )}

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
                <SelectValue placeholder="Select status" />
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

          <Button
            onClick={handleAdd}
            disabled={!selected || isPending}
            className="w-full gap-2"
          >
            {isPending
              ? <Loader2Icon className="size-4 animate-spin" />
              : <span className="size-4" />}
            Add to Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
