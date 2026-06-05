"use client";

import { useQuery } from "@tanstack/react-query";

export type PlaySessionPlayerItem = {
  id: string;
  name: string;
  score: number | null;
  isWinner: boolean;
};

export type PlaySessionItem = {
  id: string;
  playedAt: string;
  durationMinutes: number | null;
  notes: string | null;
  players: PlaySessionPlayerItem[];
};

async function fetchPlaySessions(gameId: string): Promise<{ sessions: PlaySessionItem[] }> {
  const res = await fetch(`/api/play-sessions?gameId=${encodeURIComponent(gameId)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function usePlaySessions(gameId: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ["play-sessions", gameId],
    queryFn: () => fetchPlaySessions(gameId),
  });

  return {
    sessions: data?.sessions ?? [],
    isLoading: isPending,
    error: error?.message ?? null,
  };
}
