"use client";

import { useState } from "react";
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
  BuildingIcon,
  CrownIcon,
  ExternalLinkIcon,
  HourglassIcon,
  PenLineIcon,
  PersonStandingIcon,
  StarIcon,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { BGGGame } from "@/src/shared/types/game.types";
import { getScoreColor } from "../../../entities/game/model/utils";
import { ExpandableDescription } from "./expandable-description";
import { Button } from "@/src/components/ui/button";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { SelectGameStatus } from "@/src/entities/game/ui/select-game-status";
import { User as AuthUser } from "next-auth";

type GameDetailCardProps = {
  user?: AuthUser;
  game: BGGGame;
  userScore?: number | null;
  status?: UserGameStatus | null;
};

async function saveToLibrary(
  externalId: string,
  status: UserGameStatus,
  score?: number,
) {
  await fetch("/api/user-games/from-bgg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ externalId, status, userScore: score }),
  });
}

export function GameDetailCard({
  user,
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

  function handleStatusChange(newStatus: UserGameStatus) {
    setGameStatus(newStatus);
    saveToLibrary(game.id, newStatus, score);
  }

  function handleScoreClick(index: number) {
    const newScore =
      score !== undefined && index === score - 1 ? undefined : index + 1;
    setScore(newScore);
    if (gameStatus) {
      saveToLibrary(game.id, gameStatus, newScore);
    }
  }

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

        <div className={cn("flex flex-col gap-2", user && "pr-35")}>
          <CardTitle className="font-serif text-2xl font-semibold tracking-tight">
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

          {game.publishers.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
              <BuildingIcon className="size-4 shrink-0" />
              <Link
                href={`https://boardgamegeek.com/boardgamepublisher/${game.publishers[0].id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {game.publishers[0].name}
              </Link>
              {game.publishers.length > 1 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-xs text-muted-foreground/60 hover:text-muted-foreground cursor-default">
                      +{game.publishers.length - 1} more
                    </TooltipTrigger>
                    <TooltipContent>
                      {game.publishers
                        .slice(1)
                        .map((p) => p.name)
                        .join(", ")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}

          {game.designers.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-semibold">
              <PenLineIcon className="size-4 shrink-0" />
              <Link
                href={`https://boardgamegeek.com/boardgamedesigner/${game.designers[0].id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {game.designers[0].name}
              </Link>
              {game.designers.length > 1 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-xs text-muted-foreground/60 hover:text-muted-foreground cursor-default">
                      +{game.designers.length - 1} more
                    </TooltipTrigger>
                    <TooltipContent>
                      {game.designers
                        .slice(1)
                        .map((d) => d.name)
                        .join(", ")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          )}

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

          {user && (
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
                      onClick={() => handleScoreClick(index)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {user && (
          <div className="absolute top-2 right-2 w-40">
            <SelectGameStatus
              status={gameStatus}
              setStatus={handleStatusChange}
            />
          </div>
        )}
      </CardHeader>

      {game.description && (
        <CardContent>
          <ExpandableDescription
            text={(() => {
              const t = game.description.trim();
              return t.slice(0, 1).toUpperCase() + t.slice(1);
            })()}
          />
        </CardContent>
      )}

      <CardFooter className="pt-0 bg-background border-t-0">
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
