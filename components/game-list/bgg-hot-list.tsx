"use client";

import { useEffect, useState } from "react";
import type { BggHotGame } from "@/lib/bgg";
import { BggGameCard } from "./bgg-game-card";
import { GameCardSkeleton } from "./game-card-skeleton";

const SKELETON_COUNT = 8;

export function BggHotList() {
  const [games, setGames] = useState<BggHotGame[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bgg/hot")
      .then(async (res) => {
        if (!res.ok) throw new Error(`BGG API error: ${res.status} ${res.statusText}`);
        setGames(await res.json());
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load games");
      });
  }, []);

  if (error) {
    return (
      <div className="text-center mt-12 space-y-2">
        <p className="text-red-400">{error}</p>
        <p className="text-white/50 text-sm">Could not reach the BGG API.</p>
      </div>
    );
  }

  const gridClass = "grid grid-cols-4 gap-5 py-12";

  if (!games) {
    return (
      <div className={gridClass}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {games.map((game) => (
        <BggGameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
