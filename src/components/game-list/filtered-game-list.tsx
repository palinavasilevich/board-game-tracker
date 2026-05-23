"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteGames } from "@/src/hooks/use-infinite-games";
import { GameList } from "./game-list";
import { GameCardSkeleton } from "./game-card-skeleton";
import { Button } from "@/src/components/ui/button";

export function FilteredGameList() {
  const searchParams = useSearchParams();
  const { games, isLoading, error, loadMore, hasMore, isLoadingMore } =
    useInfiniteGames(searchParams.toString());

  if (error) {
    return (
      <div className="text-center mt-12 space-y-2 px-4">
        <p className="text-red-400">{error}</p>
        <p className="text-white/50 text-sm">Could not reach the GAME API.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <GameList games={games} isLoading={isLoading} />

      {isLoadingMore && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <GameCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => loadMore()} disabled={isLoadingMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
