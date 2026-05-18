"use client";

import { useSearchParams } from "next/navigation";
import { useGames } from "@/hooks/use-games";
import { GameList } from "./game-list";

export function FilteredGameList() {
  const searchParams = useSearchParams();
  const { games, isLoading, error } = useGames(searchParams.toString());

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
