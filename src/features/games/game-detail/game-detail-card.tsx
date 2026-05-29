"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import {
  CrownIcon,
  ExternalLinkIcon,
  HourglassIcon,
  PersonStandingIcon,
  StarIcon,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { BGGGame } from "@/src/shared/types/game.types";
import { getScoreColor } from "../../../entities/game/model/utils";
import { ExpandableDescription } from "./expandable-description";
import { Button } from "@/src/components/ui/button";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { SelectGameStatus } from "@/src/entities/game/ui/select-game-status";
import { useState } from "react";

type GameDetailCardProps = {
  game: BGGGame;
  userScore?: number | null;
  status?: UserGameStatus | null;
};

export function GameDetailCard({
  game,
  userScore,
  status,
}: GameDetailCardProps) {
  const [gameStatus, setGameStatus] = useState<UserGameStatus | undefined>(
    status ?? undefined,
  );
  const [score, setScore] = useState<number | undefined>(
    userScore ?? undefined,
  );
  const [hoveredStar, setHoveredStar] = useState<number | undefined>(undefined);

  return (
    <Card className="relative w-full max-w-4xl mx-auto pt-6 shadow-sm border">
      <CardHeader className="flex flex-row items-start gap-6">
        {game.thumbnail && (
          <div className="relative w-48 shrink-0 aspect-3/4 rounded-xl overflow-hidden border border-accent/70 shadow-lg">
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

        <div className="flex flex-col gap-2 pr-44">
          <CardTitle className="font-serif text-4xl font-semibold tracking-tight">
            {game.name}
            <span className="text-muted-foreground text-2xl ml-2">
              {` (${game.yearPublished})`}
            </span>
          </CardTitle>

          <div className="flex gap-4 text-sm text-muted-foreground font-semibold">
            <span className="flex items-center gap-2">
              <CrownIcon className="size-4" />
              Rank #{game.rank}
            </span>
            <span>
              Rating{" "}
              <span className={cn(getScoreColor(game.rating, "500"))}>
                {game.rating}
              </span>
              {` / 10`}
            </span>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground font-semibold">
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
                  <Badge
                    variant="outline"
                    className="px-2.5 py-1 font-semibold"
                  >
                    {genre}
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground font-medium">
              Your rating
            </span>
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, index) => {
                const active =
                  hoveredStar !== undefined
                    ? hoveredStar - 1 >= index
                    : score !== undefined && score - 1 >= index;
                return (
                  <StarIcon
                    key={index}
                    fill="currentColor"
                    strokeWidth={0}
                    className={cn(
                      "size-5 cursor-pointer transition-colors",
                      active ? "text-amber-400" : "text-muted-foreground/30",
                    )}
                    onMouseEnter={() => setHoveredStar(index + 1)}
                    onMouseLeave={() => setHoveredStar(undefined)}
                    onClick={() =>
                      setScore(
                        score !== undefined && index === score - 1
                          ? undefined
                          : index + 1,
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute top-2 right-2 w-40">
          <SelectGameStatus status={gameStatus} setStatus={setGameStatus} />
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

      <CardFooter className="pt-0">
        <Button variant="outline" className="max-w-2xs" asChild>
          <Link
            href={`https://boardgamegeek.com/boardgame/${game.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on BoardGameGeek
            <ExternalLinkIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
