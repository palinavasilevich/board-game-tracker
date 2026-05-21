"use client";

import { useSearchParams } from "next/navigation";
import { MostPopularGames } from "@/src/features/games/most-popular-games/ui/most-popular-games";
import { FilteredGameList } from "./filtered-game-list";

export function GameSection() {
  const searchParams = useSearchParams();
  const hasFilters = searchParams.toString().length > 0;

  if (hasFilters) {
    return <FilteredGameList />;
  }

  return <MostPopularGames />;
}
