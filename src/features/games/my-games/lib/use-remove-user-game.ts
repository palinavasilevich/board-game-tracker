"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function removeUserGame(id: string) {
  const res = await fetch(`/api/user-games/${id}`, { method: "DELETE" });

  if (!res.ok && res.status !== 204) {
    throw new Error(`HTTP ${res.status}`);
  }
}

export function useRemoveUserGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeUserGame(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-games"] });
    },
  });
}
