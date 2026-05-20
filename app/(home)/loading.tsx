import { GameCardSkeleton } from "@/components/game-list/game-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full">
      <div className="text-center mt-8 space-y-2">
        <Skeleton className="h-9 w-72 mx-auto" />
        <Skeleton className="h-5 w-56 mx-auto" />
      </div>
      <div className="grid grid-cols-4 gap-5 py-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <GameCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
