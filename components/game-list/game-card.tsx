import type { GameWithGenres } from "./game-list";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GameCardProps {
  game: GameWithGenres;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <div className="group relative aspect-3/4 rounded-xl overflow-hidden border border-accent/50">
      <Image
        src={game.imageUrl || "/images/placeholder.jpg"}
        alt={game.name}
        unoptimized
        width={200}
        height={267}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent" />

      {game.metaScore && (
        <div
          className="absolute top-3 right-3 bg-dark/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-accent/30"
          title={`MetaScore: ${game.metaScore} of 100`}
        >
          <span
            className={cn(
              "font-bold font-serif",
              game.metaScore >= 61
                ? "text-emerald-500"
                : game.metaScore >= 40
                  ? "text-yellow-500"
                  : "text-red-500",
            )}
          >
            {game.metaScore}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-accent/80 text-xs uppercase tracking-wider">
          {game.genres[0]?.genre?.name}
        </span>
        <h3 className="font-serif text-xl font-semibold mt-1">{game.name}</h3>
      </div>
    </div>
  );
}
