import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export type GameCardData = {
  id: string;
  name: string;
  imageUrl: string | null;
  yearPublished: string | null;
  rank: number;
  metaScore: number;
  userScore?: number;
};

interface GameCardProps {
  game: GameCardData;
  priority?: boolean;
  compact?: boolean;
}

export function GameCard({ game, priority, compact }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group relative aspect-3/4 rounded-xl overflow-hidden border border-accent/70 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:border-white/20 block"
    >
      <Image
        src={game.imageUrl || "/images/placeholder.jpg"}
        alt={game.name}
        fill
        unoptimized
        priority={priority}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      <div
        className={cn(
          "absolute top-2 right-2 font-bold bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15",
          compact ? "text-xs" : "text-sm",
        )}
        title={`Rating: ${game.metaScore} / 10`}
      >
        <span className="text-white">#{game.rank}</span>
        <span
          className={cn(
            game.metaScore >= 6
              ? "text-emerald-500"
              : game.metaScore >= 4
                ? "text-yellow-500"
                : "text-red-500",
          )}
        >
          {" "}
          ({game.metaScore})
        </span>
      </div>

      <div className="absolute bottom-0 right-0 left-0 p-4">
        <h3
          className={cn(
            "text-white font-semibold",
            compact ? "text-sm" : "text-xl",
          )}
        >
          {game.name}
          <span className="text-accent/80 tracking-wider">
            {" "}
            ({game.yearPublished})
          </span>
        </h3>
        {game.userScore && (
          <p
            className={cn(
              "font-medium mt-0.5",
              compact ? "text-xs" : "text-sm",
              game.userScore >= 6
                ? "text-emerald-400"
                : game.userScore >= 4
                  ? "text-yellow-400"
                  : "text-red-400",
            )}
            title={`User Rating: ${game.userScore} / 10`}
          >
            ★ {game.userScore}
          </p>
        )}
      </div>
    </Link>
  );
}
