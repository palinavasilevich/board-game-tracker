"use client";

import { useQuery } from "@tanstack/react-query";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import type { AppGame } from "@/src/entities/game";

export type UserGameItem = {
  id: string;
  status: UserGameStatus;
  gameId: string;
  createdAt: string;
  game: AppGame;
};

type UserGamesResponse = { userGames: UserGameItem[] };

async function fetchUserGames(
  status?: UserGameStatus,
): Promise<UserGamesResponse> {
  const params = status ? `?status=${status}` : "";
  const res = await fetch(`/api/user-games${params}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

export function useUserGames(status?: UserGameStatus) {
  const { data, isPending, error } = useQuery({
    queryKey: ["user-games", status ?? "all"],
    queryFn: () => fetchUserGames(status),
  });

  return {
    userGames: data?.userGames ?? [],
    isLoading: isPending,
    error: error?.message ?? null,
  };
}
