"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GameList, type GameWithGenres } from "./game-list";

export function FilteredGameList() {
  const searchParams = useSearchParams();
  const [games, setGames] = useState<GameWithGenres[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/games?${searchParams.toString()}`)
      .then((res) => res.json())
      .then((data: GameWithGenres[]) => {
        setGames(data);
        setIsLoading(false);
      });
  }, [searchParams]);

  return <GameList games={games} isLoading={isLoading} />;
}
