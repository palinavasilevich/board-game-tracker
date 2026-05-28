"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";

async function editUserGame(
  id: string,
  status: UserGameStatus,
  userScore?: number | null,
) {
  const res = await fetch(`/api/user-games/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, userScore }),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

export function useEditUserGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      userScore,
    }: {
      id: string;
      status: UserGameStatus;
      userScore?: number | null;
    }) => editUserGame(id, status, userScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-games"] });
    },
  });
}
