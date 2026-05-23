"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Skeleton } from "@/src/components/ui/skeleton";
import { GameCard } from "@/src/components/game-list/game-card";
import { useMostPopularGamesQuery } from "@/src/features/games/most-popular-games/lib/use-most-popular-games-query";

export function GameCarousel() {
  const { games, isLoading, error } = useMostPopularGamesQuery();

  if (error) {
    return (
      <div className="text-center mt-12 space-y-2 px-4">
        <p className="text-red-400">{error}</p>
        <p className="text-white/50 text-sm">Could not load games.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full px-12">
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-3/4 basis-1/2 shrink-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Carousel opts={{ align: "start" }} className="w-full bg-background">
      <CarouselContent>
        {games.map((game, index) => (
          <CarouselItem
            key={game.id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
          >
            <div className="px-1">
              <GameCard
                game={{
                  id: game.id,
                  name: game.name,
                  imageUrl: game.thumbnail,
                  yearPublished: game.yearPublished,
                  rank: game.rank,
                  metaScore: game.rating,
                }}
                priority={index < 3}
                compact
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
