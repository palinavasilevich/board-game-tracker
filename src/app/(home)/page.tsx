import { SearchInput } from "@/src/components/filters/search-input";
import { Suspense } from "react";
import { GameCarousel } from "@/src/features/games/most-popular-games/ui/game-carousel";
import { FilteredGameList } from "@/src/components/game-list/filtered-game-list";

export default function Home() {
  return (
    <div className="w-full mt-6 flex flex-col gap-6">
      <div className="flex flex-col gap-6 text-center">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight">
            Most Popular on BoardGameGeek
          </h1>
          <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
            Top rated games by the BGG community
          </p>
        </div>

        <GameCarousel />
      </div>

      <div className="flex flex-col gap-6 text-center">
        <div>
          <h2 className="font-serif text-4xl font-bold tracking-tight">
            Browse Collection
          </h2>
          <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
            Filter and explore my games
          </p>
        </div>

        <SearchInput />

        <Suspense>
          <FilteredGameList />
        </Suspense>
      </div>
    </div>
  );
}
