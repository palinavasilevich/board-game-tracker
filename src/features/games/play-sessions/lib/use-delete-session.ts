"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteSession(id: string) {
  const res = await fetch(`/api/play-sessions/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
}

export function useDeleteSession(gameId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["play-sessions", gameId] });
    },
  });
}
