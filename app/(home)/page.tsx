import { BggHotList } from "@/components/game-list/bgg-hot-list";
import { SearchInput } from "@/components/search-input";

export default function Home() {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight">
          Hot on BoardGameGeek
        </h1>
        <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
          Top trending board games right now
        </p>
      </div>

      <SearchInput />
      <BggHotList />
    </div>
  );
}
