"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteGames } from "../api/use-infinite-games";
import { GameList } from "./game-list";
import { GameCardSkeleton } from "@/src/entities/game";
import { Button } from "@/src/components/ui/button";

export function FilteredGameList() {
  const searchParams = useSearchParams();
  const { games, isLoading, error, loadMore, hasMore, isLoadingMore } =
    useInfiniteGames(searchParams.toString());

  if (error) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Failed to fetch Games. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <GameList games={games} isLoading={isLoading} />

      {isLoadingMore && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => loadMore()}
            disabled={isLoadingMore}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
