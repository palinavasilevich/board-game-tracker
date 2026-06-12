import { Skeleton } from "@/src/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="w-full max-w-xl mx-auto mt-8 flex flex-col gap-10">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight uppercase">
          Profile
        </h1>
        <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
          Manage your account details
        </p>
      </div>

      {/* Personal Info skeleton */}
      <section className="rounded-lg border p-6 flex flex-col gap-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full shrink-0" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-28 rounded-md" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-9 w-28 rounded-md" />
      </section>

      {/* Change Password skeleton */}
      <section className="rounded-lg border p-6 flex flex-col gap-4">
        <Skeleton className="h-6 w-40" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
        <Skeleton className="h-9 w-36 rounded-md" />
      </section>
    </div>
  );
}