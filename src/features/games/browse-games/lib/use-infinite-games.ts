"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import type { AppGame } from "@/src/entities/game";

const PAGE_SIZE = 20;

type GamesPage = { games: AppGame[]; total: number };

async function fetchGamesPage(
  searchParamsStr: string,
  offset: number,
  signal: AbortSignal,
): Promise<GamesPage> {
  const base = new URLSearchParams(searchParamsStr);
  base.set("limit", String(PAGE_SIZE));
  base.set("offset", String(offset));
  const res = await fetch(`/api/games?${base.toString()}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useInfiniteGames(searchParamsStr: string) {
  const { data, isPending, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["games", searchParamsStr],
      queryFn: ({ pageParam, signal }) =>
        fetchGamesPage(searchParamsStr, pageParam, signal),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const fetched = allPages.reduce((sum, p) => sum + p.games.length, 0);
        return fetched < lastPage.total ? fetched : undefined;
      },
    });

  return {
    games: data?.pages.flatMap((p) => p.games) ?? [],
    total: data?.pages[0]?.total ?? 0,
    isLoading: isPending,
    error: error?.message ?? null,
    loadMore: fetchNextPage,
    hasMore: hasNextPage,
    isLoadingMore: isFetchingNextPage,
  };
}
