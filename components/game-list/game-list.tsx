import { GameCard } from "./game-card";
import { GameCardSkeleton } from "./game-card-skeleton";
import { BGGGame } from "@/shared/types/game.types";

interface GameListProps {
  games: BGGGame[];
  isLoading: boolean;
}

const SKELETON_COUNT = 8;

export function GameList({ games, isLoading }: GameListProps) {
  const gridClass = "grid grid-cols-4 gap-5";

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="text-center text-white/80 mt-12">No games found.</div>
    );
  }

  return (
    <div className={gridClass}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
