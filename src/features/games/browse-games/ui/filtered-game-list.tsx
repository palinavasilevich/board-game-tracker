"use client";

import { useSearchParams } from "next/navigation";
import { useUserGames } from "@/src/features/games/my-games/lib/use-user-games";
import { GameList } from "./game-list";

export function FilteredGameList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() ?? "";

  const { userGames, isLoading, error } = useUserGames();

  if (error) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Failed to fetch Games. Please try again later.
        </p>
      </div>
    );
  }

  const games = userGames
    .map((ug) => ({ ...ug.game, userStatus: ug.status, userScore: ug.userScore }))
    .filter((g) => !search || g.name.toLowerCase().includes(search));

  return <GameList games={games} isLoading={isLoading} />;
}
