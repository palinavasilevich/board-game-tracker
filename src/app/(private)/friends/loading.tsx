import { Skeleton } from "@/src/components/ui/skeleton";

export default function FriendsLoading() {
  return (
    <div className="w-full flex flex-col mt-8 gap-10">
      <div className="flex flex-col items-center text-center gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight uppercase">
            Friends
          </h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
            Follow others and browse their collections
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <Skeleton className="h-10 w-full rounded-full" />
        <div className="flex gap-2 mx-auto">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}