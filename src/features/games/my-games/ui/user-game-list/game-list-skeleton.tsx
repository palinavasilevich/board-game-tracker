import { Skeleton } from "@/src/components/ui/skeleton";

export function GameListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-lg border border-border/50 px-4 py-3"
        >
          <Skeleton className="size-14 rounded-md shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="size-8 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
