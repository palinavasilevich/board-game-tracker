"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function followUser(followingId: string) {
  const res = await fetch("/api/friends", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followingId }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useFollow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (followingId: string) => followUser(followingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["user-search"] });
    },
  });
}
