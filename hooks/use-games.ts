"use client";

import { useState, useEffect } from "react";
import { BGGGame } from "@/shared/types/game.types";

type FetchState = {
  key: string;
  games: BGGGame[];
  error: string | null;
};

export function useGames(searchParamsStr: string) {
  const [fetchState, setFetchState] = useState<FetchState | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/games?${searchParamsStr}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((games) => {
        if (!controller.signal.aborted) {
          setFetchState({ key: searchParamsStr, games, error: null });
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          setFetchState({
            key: searchParamsStr,
            games: [],
            error: err instanceof Error ? err.message : "Failed to load games",
          });
        }
      });

    return () => controller.abort();
  }, [searchParamsStr]);

  return {
    games: fetchState?.games ?? [],
    isLoading: fetchState === null || fetchState.key !== searchParamsStr,
    error: fetchState?.error ?? null,
  };
}
