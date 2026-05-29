import { Skeleton } from "@/src/components/ui/skeleton";
import { GameListSkeleton } from "@/src/features/games/my-games/ui/user-game-list/game-list-skeleton";

export default function MyGamesLoading() {
  return (
    <div className="w-full flex flex-col mt-8">
      <div className="flex flex-col items-center text-center gap-3">
        <div>
          <h1 className="font-cinzel text-3xl font-semibold tracking-tight uppercase">
            My Games
          </h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
            Your personal board game collection
          </p>
        </div>
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      <div className="w-full mt-8">
        <div className="flex gap-1 mb-6">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
        <GameListSkeleton />
      </div>
    </div>
  );
}