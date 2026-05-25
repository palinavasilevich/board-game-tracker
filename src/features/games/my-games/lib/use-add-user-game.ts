"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserGameStatus } from "@/src/lib/generated/prisma/enums";

async function addUserGame(
  externalId: string,
  status: UserGameStatus,
  userScore?: number,
) {
  const res = await fetch("/api/user-games/from-bgg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ externalId, status, userScore }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  return res.json();
}

export function useAddUserGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      externalId,
      status,
      userScore,
    }: {
      externalId: string;
      status: UserGameStatus;
      userScore?: number;
    }) => addUserGame(externalId, status, userScore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-games"] });
    },
  });
}
