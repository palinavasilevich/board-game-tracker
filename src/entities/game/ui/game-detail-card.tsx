import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import {
  ExternalLinkIcon,
  HourglassIcon,
  PersonStandingIcon,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { BGGGame } from "@/src/shared/types/game.types";
import { ExpandableDescription } from "./expandable-description";
import { Button } from "@/src/components/ui/button";

type GameDetailCardProps = {
  game: BGGGame;
  userScore?: number;
};

export function GameDetailCard({ game, userScore }: GameDetailCardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto pt-6 shadow-sm border">
      <CardHeader className="flex gap-6">
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

        <div className="flex flex-col gap-2">
          <CardTitle className="font-serif text-4xl font-semibold tracking-tight">
            {game.name}
            <span className="text-muted-foreground text-2xl ml-2">
              {` (${game.yearPublished})`}
            </span>
          </CardTitle>

          <div className="flex gap-4 text-sm text-muted-foreground font-semibold">
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
              {` / 10`}
            </span>
          </div>

          {userScore != null && (
            <p className="text-sm text-muted-foreground font-semibold">
              <span>
                User Rating{" "}
                <span
                  className={cn(
                    userScore >= 6
                      ? "text-emerald-400"
                      : userScore >= 4
                        ? "text-yellow-400"
                        : "text-red-400",
                  )}
                  title={`User Rating: ${userScore} / 10`}
                >
                  {userScore}
                </span>
                {` / 10`}
              </span>
            </p>
          )}

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <PersonStandingIcon
                className="size-4 text-muted-foreground"
                strokeWidth={3}
              />
              <span>
                {game.minPlayers === game.maxPlayers
                  ? `${game.minPlayers} players`
                  : `${game.minPlayers} – ${game.maxPlayers} players`}
              </span>
            </div>

            {(game.minPlaytime > 0 || game.maxPlaytime > 0) && (
              <div className="flex items-center gap-2">
                <HourglassIcon
                  className="size-4 text-muted-foreground"
                  strokeWidth={2}
                />
                <span>
                  {game.minPlaytime === game.maxPlaytime
                    ? `${game.minPlaytime} min`
                    : `${game.minPlaytime}–${game.maxPlaytime} min`}
                </span>
              </div>
            )}
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

          <Button variant="outline" className="self-start mt-auto" asChild>
            <Link
              href={`https://boardgamegeek.com/boardgame/${game.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on BoardGameGeek
              <ExternalLinkIcon />
            </Link>
          </Button>
        </div>
      </CardHeader>

      {game.description && (
        <CardContent>
          <ExpandableDescription
            text={
              game.description.slice(0, 1).toUpperCase() +
              game.description.slice(1)
            }
          />
        </CardContent>
      )}
    </Card>
  );
}
