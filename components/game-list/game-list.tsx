import type { Prisma } from "@/lib/generated/prisma/client";
import { GameCard } from "./game-card";
import { GameCardSkeleton } from "./game-card-skeleton";

export type GameWithGenres = Prisma.GameGetPayload<{
  select: {
    id: true;
    name: true;
    imageUrl: true;
    metaScore: true;
    genres: {
      select: {
        genre: { select: { name: true } };
      };
    };
  };
}>;

interface GameListProps {
  games: GameWithGenres[];
  isLoading: boolean;
}

const gridClass = "grid grid-cols-4 gap-5 py-12";

export function GameList({ games, isLoading }: GameListProps) {
  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 8 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!games.length) {
    return <div className="text-center text-white/80 mt-12">No games found.</div>;
  }

  return (
    <div className={gridClass}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
