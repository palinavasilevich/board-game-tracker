import { Suspense } from "react";

import { GameCarousel } from "@/src/features/games/most-popular-games/ui/game-carousel";
import {
  FilteredGameList,
  SearchInput,
} from "@/src/features/games/browse-games";
import { GameCardSkeleton } from "@/src/entities/game";

export default async function Home() {
  return (
    <div className="w-full mt-6 flex flex-col gap-6 pb-6">
      <div className="flex flex-col gap-6 text-center">
        <div>
          <h2 className="font-cinzel text-3xl font-semibold tracking-tight uppercase">
            Most Popular on BoardGameGeek
          </h2>
          <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
            Top rated games by the BGG community
          </p>
        </div>

        <GameCarousel />
      </div>

      <div className="flex flex-col gap-6 text-center">
        <div>
          <h2 className="font-cinzel text-3xl font-semibold tracking-tight uppercase">
            Browse Collection
          </h2>
          <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
            Filter and explore your games
          </p>
        </div>

        <SearchInput />

        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <GameCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <FilteredGameList />
        </Suspense>
      </div>
    </div>
  );
}
