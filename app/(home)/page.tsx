import { FilteredGameList } from "@/components/game-list/filtered-game-list";
import { SearchInput } from "@/components/filters/search-input";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          Board Games
        </h1>
        <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
          Browse and filter your collection
        </p>
      </div>

      <SearchInput />

      <Suspense>
        <FilteredGameList />
      </Suspense>
    </div>
  );
}
