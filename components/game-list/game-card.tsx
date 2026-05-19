import Image from "next/image";
import Link from "next/link";
import { BGGGame } from "@/shared/types/game.types";
import { cn } from "@/lib/utils";

interface GameCardProps {
  game: BGGGame;
  priority?: boolean;
}

export function GameCard({ game, priority }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.id}`}
      className="group relative aspect-3/4 rounded-xl overflow-hidden border border-accent/70 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:border-white/20 block"
    >
      <Image
        src={game.thumbnail || "/images/placeholder.jpg"}
        alt={game.name}
        unoptimized
        priority={priority}
        width={200}
        height={267}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      <div
        className="absolute top-3 right-3 font-bold text-sm bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15"
        title={`Rating: ${game.rating} / 10`}
      >
        <span className="text-white">#{game.rank}</span>
        <span
          className={cn(
            game.rating >= 6
              ? "text-emerald-500"
              : game.rating >= 4
                ? "text-yellow-500"
                : "text-red-500",
          )}
        >
          {" "}
          ({game.rating})
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl text-white font-semibold">
          {game.name}
          <span className="text-accent/80 tracking-wider">
            {" "}
            ({game.yearPublished})
          </span>
        </h3>
      </div>
    </Link>
  );
}
