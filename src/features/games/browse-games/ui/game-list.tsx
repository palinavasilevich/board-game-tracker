import { GameCard, GameCardSkeleton } from "@/src/entities/game";
import type { GameCardData } from "@/src/entities/game";

interface GameListProps {
  games: GameCardData[];
  isLoading: boolean;
}

const SKELETON_COUNT = 8;

export function GameList({ games, isLoading }: GameListProps) {
  const gridClass =
    "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5";

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
      {games.map((game, i) => (
        <GameCard key={game.id} game={game} priority={i === 0} compact />
      ))}
    </div>
  );
}
