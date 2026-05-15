import Image from "next/image";
import type { BggHotGame } from "@/lib/bgg";

interface BggGameCardProps {
  game: BggHotGame;
}

export function BggGameCard({ game }: BggGameCardProps) {
  return (
    <div className="group relative aspect-3/4 rounded-xl overflow-hidden border border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:shadow-xl hover:border-white/20">
      <Image
        src={game.thumbnail || "/images/placeholder.jpg"}
        alt={game.name}
        width={200}
        height={267}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/15">
        <span className="font-bold font-serif text-white text-sm">
          #{game.rank}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        {game.yearPublished && (
          <span className="text-white/50 text-xs uppercase tracking-wider font-semibold">
            {game.yearPublished}
          </span>
        )}
        <h3 className="font-serif text-sm font-semibold mt-0.5 text-white leading-snug">
          {game.name}
        </h3>
      </div>
    </div>
  );
}
