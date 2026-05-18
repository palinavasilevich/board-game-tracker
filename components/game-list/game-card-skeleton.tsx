import { Skeleton } from "@/components/ui/skeleton";

type GameCardSkeletonProps = {};

export function GameCardSkeleton() {
  return (
    <div className="relative aspect-3/4 rounded-xl overflow-hidden border border-white/10">
      <Skeleton className="absolute inset-0 rounded-none" />
      <Skeleton className="absolute top-3 right-3 w-8 h-7 rounded-lg" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  );
}
