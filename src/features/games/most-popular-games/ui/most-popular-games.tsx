"use client";

import { GameList } from "@/src/components/game-list/game-list";
import { useMostPopularGamesQuery } from "../lib/use-most-popular-games-query";

export function MostPopularGames() {
  const { games, isLoading, error } = useMostPopularGamesQuery();

  if (error) {
    return (
      <div className="text-center mt-12 space-y-2 px-4">
        <p className="text-red-400">{error}</p>
        <p className="text-white/50 text-sm">Could not reach the GAME API.</p>
      </div>
    );
  }

  return <GameList games={games} isLoading={isLoading} />;
}
