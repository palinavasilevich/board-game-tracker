"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type PlayerInput = {
  name: string;
  score?: number | null;
  isWinner?: boolean;
};

type LogSessionInput = {
  gameId: string;
  playedAt: string;
  durationMinutes?: number | null;
  notes?: string | null;
  players: PlayerInput[];
};

async function logSession(input: LogSessionInput) {
  const res = await fetch("/api/play-sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useLogSession(gameId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: LogSessionInput) => logSession(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["play-sessions", gameId] });
    },
  });
}
