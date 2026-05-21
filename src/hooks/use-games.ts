"use client";

import { useQuery } from "@tanstack/react-query";
import { BGGGame } from "@/src/shared/types/game.types";

async function fetchGames(searchParamsStr: string): Promise<BGGGame[]> {
  const res = await fetch(`/api/games?${searchParamsStr}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useGames(searchParamsStr: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ["games", searchParamsStr],
    queryFn: () => fetchGames(searchParamsStr),
  });

  return {
    games: data ?? [],
    isLoading: isPending,
    error: error?.message ?? null,
  };
}
