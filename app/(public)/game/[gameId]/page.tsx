import Image from "next/image";
import { getGameById } from "@/lib/bgg-api";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HourglassIcon, PersonStandingIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function GamePage(props: PageProps<"/game/[gameId]">) {
  const { gameId } = await props.params;
  const game = await getGameById(gameId);

  if (!game) {
    return <div>Game not found...</div>;
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex gap-8">
          {game.thumbnail && (
            <div className="w-48 shrink-0 aspect-3/4 rounded-xl overflow-hidden border border-accent/70 shadow-lg">
              <Image
                src={game.thumbnail}
                alt={game.name}
                unoptimized
                width={200}
                height={267}
                className="aspect-3/4 object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-3">
            <CardTitle className="font-serif text-4xl font-semibold tracking-tight">
              {game.name}
              <span className="text-muted-foreground text-2xl ml-2">
                {` (${game.yearPublished})`}
              </span>
            </CardTitle>

            <CardDescription className="flex flex-col gap-4">
              <div className="flex gap-4 text-muted-foreground font-semibold">
                <span>Rank #{game.rank}</span>
                <span>
                  Rating{" "}
                  <span
                    className={cn(
                      game.rating >= 6
                        ? "text-emerald-500"
                        : game.rating >= 4
                          ? "text-yellow-500"
                          : "text-red-500",
                    )}
                  >
                    {game.rating}
                  </span>
                  {` / 10 `}
                </span>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <PersonStandingIcon
                    className="size-5! text-muted-foreground"
                    strokeWidth={3}
                  />
                  <span>
                    {game.minPlayers === game.maxPlayers
                      ? `${game.minPlayers} players`
                      : `${game.minPlayers} – ${game.maxPlayers} players`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <HourglassIcon
                    className="size-5! text-muted-foreground font-semibold"
                    strokeWidth={2}
                  />
                  {(game.minPlaytime > 0 || game.maxPlaytime > 0) && (
                    <span>
                      {game.minPlaytime === game.maxPlaytime
                        ? `${game.minPlaytime} min`
                        : `${game.minPlaytime}–${game.maxPlaytime} min`}
                    </span>
                  )}
                </div>
              </div>

              {game.genres.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {game.genres.map((genre) => (
                    <li key={genre}>
                      <Badge variant="outline" className="p-2">
                        {genre}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}

              {game.description && (
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {game.description.slice(0, 1).toUpperCase() +
                    game.description.slice(1)}
                </p>
              )}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
