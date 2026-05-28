import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import type { GameCardData } from "../model/types";
import { getScoreColor } from "../model/utils";
import { StarIcon } from "lucide-react";

interface GameCardProps {
  game: GameCardData;
  priority?: boolean;
  compact?: boolean;
}

export function GameCard({ game, priority, compact }: GameCardProps) {
  return (
    <Link
      href={`/game/${game.externalId || game.id}`}
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
          "absolute top-2 right-2 font-bold bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15",
          compact ? "text-xs" : "text-sm",
        )}
        title={`Rating: ${game.metaScore} / 10`}
      >
        <span className="text-white">#{game.rank}</span>
        <span className={cn(getScoreColor(game.metaScore, "500"))}>
          {" "}
          ({game.metaScore})
        </span>
      </div>

      {game.userStatus && (
        <div
          className={cn(
            "absolute top-2 left-2 font-bold bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15",
            compact ? "text-xs" : "text-sm",
          )}
          title={`Rating: ${game.metaScore} / 10`}
        >
          <span
            className={cn(
              game.userStatus === "OWNED"
                ? "text-emerald-400"
                : "text-amber-400",
            )}
          >
            {game.userStatus === "OWNED" ? "Owned" : "Wishlist"}
          </span>
        </div>
      )}

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
        {game.userScore != null && (
          <p
            className={cn(
              "flex items-center justify-center gap-1 font-medium mt-0.5",
              compact ? "text-xs" : "text-sm",
              getScoreColor(game.userScore),
            )}
            title={`Your rating: ${game.userScore} / 10`}
          >
            <StarIcon className="size-3" fill="currentColor" strokeWidth={0} />
            {game.userScore}
          </p>
        )}
      </div>
    </Link>
  );
}
