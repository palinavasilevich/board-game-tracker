import { UserGameStatus } from "@/src/lib/generated/prisma/client";
import { useUserGames } from "@/src/features/games/my-games/lib/use-user-games";
import { GameListSkeleton } from "./game-list-skeleton";
import { GameRow } from "./game-row";

export function GameListContent({ status }: { status?: UserGameStatus }) {
  const { userGames, isLoading } = useUserGames(status);

  if (isLoading) return <GameListSkeleton />;

  if (userGames.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground">No games here yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Use the &ldquo;Add Game&rdquo; button to start your collection.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {userGames.map((item) => (
        <GameRow key={item.id} item={item} />
      ))}
    </div>
  );
}
