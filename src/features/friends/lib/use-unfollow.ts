"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function unfollowUser(friendshipId: string) {
  const res = await fetch(`/api/friends/${friendshipId}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error(`HTTP ${res.status}`);
}

export function useUnfollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (friendshipId: string) => unfollowUser(friendshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["user-search"] });
    },
  });
}
