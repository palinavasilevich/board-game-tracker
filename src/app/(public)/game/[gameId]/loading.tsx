import { Card, CardHeader } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full items-center justify-center py-12">
      <Card className="w-full max-w-4xl mx-auto pt-6 shadow-sm border">
        <CardHeader className="flex gap-8">
          <Skeleton className="w-48 shrink-0 aspect-3/4 rounded-xl" />

          <div className="flex flex-col gap-3 flex-1">
            <Skeleton className="h-10 w-3/4" />

            <div className="flex gap-4">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>

            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />

            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
