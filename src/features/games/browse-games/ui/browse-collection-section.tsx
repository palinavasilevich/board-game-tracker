"use client";

import { Suspense, useState } from "react";
import { GameCardSkeleton } from "@/src/entities/game";
import { Button } from "@/src/components/ui/button";
import { AddGameDialog } from "@/src/features/games/my-games";
import { useUserGames } from "@/src/features/games/my-games/lib/use-user-games";
import { SearchInput } from "./search-input";
import { FilteredGameList } from "./filtered-game-list";

export function BrowseCollectionSection() {
  const { userGames, isLoading } = useUserGames();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) return null;

  if (userGames.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center gap-6 py-16 text-center">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-3xl font-semibold tracking-tight uppercase">
              Start Your Collection
            </h2>
            <p className="text-muted-foreground text-base tracking-wide max-w-md mx-auto">
              Add your board games and keep track of what you&apos;ve played,
              want to play, and love.
            </p>
          </div>
          <Button size="lg" onClick={() => setDialogOpen(true)}>
            Add Your First Game
          </Button>
        </div>
        <AddGameDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-center">
      <div>
        <h2 className="font-heading text-3xl font-semibold tracking-tight uppercase">
          Browse Collection
        </h2>
        <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
          Filter and explore your games
        </p>
      </div>

      <SearchInput />

      <Suspense
        fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <GameCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <FilteredGameList />
      </Suspense>
    </div>
  );
}
