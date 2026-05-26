"use client";

import { useQuery } from "@tanstack/react-query";
import { BGGGame } from "@/src/shared/types/game.types";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";

export type HotGame = BGGGame & {
  userScore?: number | null;
  userStatus?: UserGameStatus | null;
};

async function fetchHotGames({ signal }: { signal: AbortSignal }): Promise<HotGame[]> {
  const res = await fetch(`/api/games/hot`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useMostPopularGamesQuery() {
  const { data, isPending, error } = useQuery({
    queryKey: ["hot-games"],
    queryFn: ({ signal }) => fetchHotGames({ signal }),
  });

  return {
    games: data ?? [],
    isLoading: isPending,
    error: error?.message ?? null,
  };
}
