import Image from "next/image";
import { readGamesFromCsv } from "@/lib/games-csv";

export default async function GamePage(props: PageProps<"/game/[gameId]">) {
  const { gameId } = await props.params;
  const game = readGamesFromCsv().find((g) => g.id === gameId);

  if (!game) {
    return <div>Game not found...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex gap-8 items-start">
        {game.thumbnail && (
          <div className="relative w-48 shrink-0 aspect-3/4 rounded-xl overflow-hidden border border-accent/70 shadow-lg">
            <Image
              src={game.thumbnail}
              alt={game.name}
              unoptimized
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            {game.name}
            <span className="text-accent/80 text-2xl ml-2">
              ({game.yearPublished})
            </span>
          </h1>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Rank #{game.rank}</span>
            <span>Rating {game.rating}/10</span>
          </div>

          <div className="flex gap-4 text-sm">
            <span>
              {game.minPlayers === game.maxPlayers
                ? `${game.minPlayers} players`
                : `${game.minPlayers}–${game.maxPlayers} players`}
            </span>
            {(game.minPlaytime > 0 || game.maxPlaytime > 0) && (
              <span>
                {game.minPlaytime === game.maxPlaytime
                  ? `${game.minPlaytime} min`
                  : `${game.minPlaytime}–${game.maxPlaytime} min`}
              </span>
            )}
          </div>

          {game.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="text-xs px-2 py-1 rounded-full border border-accent/50 text-accent"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {game.description && (
        <p className="text-muted-foreground leading-relaxed">
          {game.description}
        </p>
      )}
    </div>
  );
}
