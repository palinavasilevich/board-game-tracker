"use client";

import { useQuery } from "@tanstack/react-query";
import { AppGame } from "@/src/shared/types/game.types";

type GamesResponse = { games: AppGame[]; total: number };

async function fetchGames(searchParamsStr: string): Promise<GamesResponse> {
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
    games: data?.games ?? [],
    total: data?.total ?? 0,
    isLoading: isPending,
    error: error?.message ?? null,
  };
}
